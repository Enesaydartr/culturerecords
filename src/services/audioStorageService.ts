/**
 * Alliance Records - IndexedDB Audio Storage Service
 * Stores full MP3 / Audio blobs persistently in browser IndexedDB
 * Allows uploaded mix audio to persist across page reloads and browser sessions.
 */

const DB_NAME = "alliance_audio_db_v1";
const STORE_NAME = "mix_audio";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported in this environment"));
      return;
    }

    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// In-memory cache for ObjectURLs to prevent multiple URL leaks
const activeBlobUrlCache = new Map<string, string>();

export const AudioStorageService = {
  /**
   * Save audio blob/file for a given mix ID
   */
  async saveMixAudio(mixId: string, audioBlob: Blob | File): Promise<boolean> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(audioBlob, mixId);

        req.onsuccess = () => {
          if (activeBlobUrlCache.has(mixId)) {
            try {
              URL.revokeObjectURL(activeBlobUrlCache.get(mixId)!);
            } catch {}
          }
          const blobUrl = URL.createObjectURL(audioBlob);
          activeBlobUrlCache.set(mixId, blobUrl);
          resolve(true);
        };

        req.onerror = () => {
          console.error("[AudioStorage] Failed to store audio in IndexedDB:", req.error);
          reject(req.error);
        };
      });
    } catch (e) {
      console.error("[AudioStorage] Error saving audio:", e);
      return false;
    }
  },

  /**
   * Get playable audio URL (Blob URL) for a mix ID from IndexedDB
   */
  async getMixAudioUrl(mixId: string): Promise<string | null> {
    if (activeBlobUrlCache.has(mixId)) {
      return activeBlobUrlCache.get(mixId)!;
    }

    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(mixId);

        req.onsuccess = () => {
          const blob = req.result as Blob | undefined;
          if (blob && blob.size > 0) {
            const url = URL.createObjectURL(blob);
            activeBlobUrlCache.set(mixId, url);
            resolve(url);
          } else {
            resolve(null);
          }
        };

        req.onerror = () => {
          resolve(null);
        };
      });
    } catch (e) {
      console.warn("[AudioStorage] Error fetching audio from IndexedDB:", e);
      return null;
    }
  },

  /**
   * Delete audio from IndexedDB
   */
  async deleteMixAudio(mixId: string): Promise<boolean> {
    if (activeBlobUrlCache.has(mixId)) {
      try {
        URL.revokeObjectURL(activeBlobUrlCache.get(mixId)!);
      } catch {}
      activeBlobUrlCache.delete(mixId);
    }

    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(mixId);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      });
    } catch {
      return false;
    }
  }
};
