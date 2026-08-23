import { TourDate } from "@/data/artists";

export interface BubiletConcertResponse {
  success: boolean;
  totalEvents: number;
  data: TourDate[];
}

export async function fetchLiveConcerts(fallbackData: TourDate[]): Promise<BubiletConcertResponse> {
  try {
    const res = await fetch("/api/bubilet/concerts");
    if (res.ok) {
      const json = await res.json();
      if (json.concerts && json.concerts.length > 0) {
        return {
          success: true,
          totalEvents: json.concerts.length,
          data: json.concerts
        };
      }
    }
  } catch (err) {
    // Graceful fallback to static data
  }

  return {
    success: true,
    totalEvents: fallbackData.length,
    data: fallbackData
  };
}

export const fetchLiveBubiletConcerts = fetchLiveConcerts;

