code = """export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tag: string;
  authorName: string;
  authorRole: string;
  likesCount: number;
  commentsCount: number;
  publishedAt: string;
}

export interface NewsComment {
  id: string;
  newsId: string;
  userId: string;
  username: string;
  userDisplayName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

const NEWS_STORAGE_KEY = "eray_mansur_news_v3";
const NEWS_COMMENTS_KEY = "eray_mansur_news_comments_v3";

const OFFICIAL_EDITORIAL_NEWS: NewsArticle[] = [
  {
    id: "news_1",
    title: "ALLIANCE 2026 TÜRKİYE TURNESİ RESMEN BAŞLIYOR: 14 ŞEHİRDE TARİH YAZIYORUZ!",
    excerpt: "Balıkesir, İzmir, Ankara, İstanbul ve Bursa başta olmak üzere 14 dev şehirde ERAY067 × MANSUR canlı performanslarıyla sahneyi ateşe veriyor.",
    content: "Alliance Records gururla sunar: Türk rap sahnesinin en sert ve özgün ikilisi ERAY067 ve MANSUR, 2026 sonbaharında 14 şehirde binlerce dinleyicisiyle buluşuyor. Biletler Bubilet üzerinden hızla tükenirken, sahne şovlarında özel ışık ve ses prodüksiyonları dinleyicileri bekliyor.",
    coverImage: "/assets/images/alliance_cover.jpg",
    tag: "TURNELER & KONSERLER",
    authorName: "Enes",
    authorRole: "Alliance Baş Yönetici",
    likesCount: 0,
    commentsCount: 0,
    publishedAt: "2026-02-15T12:00:00.000Z"
  },
  {
    id: "news_2",
    title: "YENİ KLİP: 'NAFİLE' YAYINDA — TÜM DİJİTAL PLATFORMLARDA!",
    excerpt: "Frankfurt sokaklarında çekilen 'NAFİLE' resmi klibi YouTube ve müzik platformlarında yayında.",
    content: "ERAY067'nin sert flowları ve MANSUR'un akılda kalıcı nakaratıyla şekillenen NAFİLE klibi dijital platformlarda yayında. Avrupa sokak estetiğini ve yüksek tempolu kurgusunu izlemek için resmi video sekmemizi ziyaret edin.",
    coverImage: "/assets/images/eray_mansur_alliance.jpg",
    tag: "YENİ VİDEO KLİP",
    authorName: "ERAY067",
    authorRole: "Sanatçı & Kurucu",
    likesCount: 0,
    commentsCount: 0,
    publishedAt: "2026-02-18T16:00:00.000Z"
  },
  {
    id: "news_3",
    title: "STÜDYO GÜNCELLEMESİ: YENİ ALLIANCE 2 ALBÜMÜ İÇİN KAYITLAR BAŞLADI",
    excerpt: "Mansur'un prodüktörlüğünde Frankfurt ve İstanbul stüdyolarında yeni parçalar hazırlanıyor.",
    content: "İlk albüm ALLIANCE ile listeleri altüst eden ikili, serinin ikinci bölümü için stüdyoya kapandı. Sürpriz düetler ve Almanya-Türkiye ortak yapımı beatlerin yer alacağı albümün ilk teklisi yakında duyurulacak.",
    coverImage: "/assets/images/mansur_portrait.jpg",
    tag: "ALBÜM & STÜDYO",
    authorName: "MANSUR",
    authorRole: "Prodüktör & Sanatçı",
    likesCount: 0,
    commentsCount: 0,
    publishedAt: "2026-02-21T19:30:00.000Z"
  }
];

export const NewsService = {
  init(): void {
    try {
      if (!localStorage.getItem(NEWS_STORAGE_KEY)) {
        localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(OFFICIAL_EDITORIAL_NEWS));
      }
    } catch {
      // ignore
    }
  },

  getAllNews(): NewsArticle[] {
    this.init();
    try {
      const data: NewsArticle[] = JSON.parse(localStorage.getItem(NEWS_STORAGE_KEY) || "[]");
      return data.length > 0 ? data : OFFICIAL_EDITORIAL_NEWS;
    } catch {
      return OFFICIAL_EDITORIAL_NEWS;
    }
  },

  getNewsById(id: string): NewsArticle | null {
    const list = this.getAllNews();
    return list.find((n) => n.id === id) || null;
  },

  createNews(data: {
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    tag: string;
    authorName: string;
    authorRole: string;
  }): NewsArticle {
    this.init();
    const newArticle: NewsArticle = {
      id: "news_" + Date.now(),
      title: data.title.trim(),
      excerpt: data.excerpt.trim(),
      content: data.content.trim(),
      coverImage: data.coverImage || "/assets/images/alliance_cover.jpg",
      tag: data.tag.trim() || "DUYURU",
      authorName: data.authorName,
      authorRole: data.authorRole,
      likesCount: 0,
      commentsCount: 0,
      publishedAt: new Date().toISOString()
    };

    const all = this.getAllNews();
    all.unshift(newArticle);
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("news-updated"));
    return newArticle;
  },

  deleteNews(id: string): boolean {
    const all = this.getAllNews();
    const filtered = all.filter((n) => n.id !== id);
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent("news-updated"));
    return true;
  },

  toggleLikeNews(newsId: string, userId: string): { isLiked: boolean; newCount: number } {
    const likedKey = "eray_news_like_" + newsId;
    let users: string[] = JSON.parse(localStorage.getItem(likedKey) || "[]");
    const isLiked = users.includes(userId);

    const all = this.getAllNews();
    const idx = all.findIndex((n) => n.id === newsId);
    if (idx === -1) return { isLiked: false, newCount: 0 };

    if (isLiked) {
      users = users.filter((u) => u !== userId);
      all[idx].likesCount = Math.max(0, all[idx].likesCount - 1);
    } else {
      users.push(userId);
      all[idx].likesCount += 1;
    }

    localStorage.setItem(likedKey, JSON.stringify(users));
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("news-updated"));
    return { isLiked: !isLiked, newCount: all[idx].likesCount };
  },

  isNewsLikedBy(newsId: string, userId?: string): boolean {
    if (!userId) return false;
    const users: string[] = JSON.parse(localStorage.getItem("eray_news_like_" + newsId) || "[]");
    return users.includes(userId);
  },

  getNewsComments(newsId: string): NewsComment[] {
    try {
      const all: NewsComment[] = JSON.parse(localStorage.getItem(NEWS_COMMENTS_KEY) || "[]");
      return all.filter((c) => c.newsId === newsId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch {
      return [];
    }
  },

  addNewsComment(data: {
    newsId: string;
    userId: string;
    username: string;
    userDisplayName: string;
    userAvatar: string;
    text: string;
  }): NewsComment {
    const newComment: NewsComment = {
      id: "nc_" + Date.now(),
      newsId: data.newsId,
      userId: data.userId,
      username: data.username,
      userDisplayName: data.userDisplayName,
      userAvatar: data.userAvatar,
      text: data.text.trim(),
      createdAt: new Date().toISOString()
    };

    const all: NewsComment[] = JSON.parse(localStorage.getItem(NEWS_COMMENTS_KEY) || "[]");
    all.unshift(newComment);
    localStorage.setItem(NEWS_COMMENTS_KEY, JSON.stringify(all));

    const newsList = this.getAllNews();
    const idx = newsList.findIndex((n) => n.id === data.newsId);
    if (idx !== -1) {
      newsList[idx].commentsCount += 1;
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(newsList));
    }

    window.dispatchEvent(new CustomEvent("news-updated"));
    return newComment;
  }
};
"""

with open("src/services/newsService.ts", "w", encoding="utf-8") as f:
    f.write(code)
print("newsService.ts cleaned")
