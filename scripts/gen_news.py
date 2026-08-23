code = """import React, { useState, useEffect } from "react";
import { AuthService } from "@/services/authService";
import { NewsService, NewsArticle, NewsComment } from "@/services/newsService";
import { Button } from "@/components/ui/button";
import { Newspaper, Heart, MessageSquare, Send, X, Calendar, User, ArrowRight } from "lucide-react";

interface NewsSectionProps {
  onOpenAuthModal?: () => void;
}

export default function NewsSection({ onOpenAuthModal }: NewsSectionProps) {
  const currentUser = AuthService.getCurrentUser();
  const [newsList, setNewsList] = useState<NewsArticle[]>(NewsService.getAllNews());
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Article comments
  const [articleComments, setArticleComments] = useState<NewsComment[]>([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setNewsList(NewsService.getAllNews());
  }, []);

  useEffect(() => {
    const handleNewsUpdate = () => {
      setNewsList(NewsService.getAllNews());
      if (selectedArticle) {
        const fresh = NewsService.getNewsById(selectedArticle.id);
        if (fresh) {
          setSelectedArticle(fresh);
          setArticleComments(NewsService.getNewsComments(fresh.id));
        }
      }
    };
    window.addEventListener("news-updated", handleNewsUpdate);
    return () => window.removeEventListener("news-updated", handleNewsUpdate);
  }, [selectedArticle]);

  const openArticleDetail = (article: NewsArticle) => {
    setSelectedArticle(article);
    setArticleComments(NewsService.getNewsComments(article.id));
  };

  const handleToggleLike = (articleId: string) => {
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    NewsService.toggleLikeNews(articleId, currentUser.id);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    if (!commentText.trim() || !selectedArticle) return;

    NewsService.addNewsComment({
      newsId: selectedArticle.id,
      userId: currentUser.id,
      username: currentUser.username,
      userDisplayName: currentUser.displayName,
      userAvatar: currentUser.avatar,
      text: commentText.trim()
    });

    setCommentText("");
  };

  return (
    <section id="news-section" className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10 font-mono">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-red-600 animate-pulse" />
            <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
              OFFICIAL ALLIANCE NEWS & FEED
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            RESMİ HABERLER & DUYURULAR
          </h2>
        </div>
        <p className="text-xs text-neutral-400 max-w-md font-sans">
          ERAY067 × MANSUR ve Alliance Records stüdyosundan en son turne, klip ve albüm gelişmeleri.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsList.map((article) => {
          const isLiked = NewsService.isNewsLikedBy(article.id, currentUser?.id);
          return (
            <div
              key={article.id}
              className="border border-white/10 bg-black/60 group hover:border-red-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md border border-red-500/40 text-[10px] font-bold text-red-400 uppercase">
                    {article.tag}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.publishedAt).toLocaleDateString("tr-TR")}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.authorName}
                    </span>
                  </div>

                  <h3
                    onClick={() => openArticleDetail(article)}
                    className="text-sm font-black text-white group-hover:text-red-400 cursor-pointer transition-colors line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-sans line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 border-t border-white/5 bg-black/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleToggleLike(article.id)}
                    className={`flex items-center gap-1.5 font-bold ${
                      isLiked ? "text-red-500" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
                    <span>{article.likesCount}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openArticleDetail(article)}
                    className="flex items-center gap-1.5 text-neutral-400 hover:text-white font-bold"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{article.commentsCount}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => openArticleDetail(article)}
                  className="text-[11px] text-red-400 hover:text-white font-bold flex items-center gap-1 uppercase"
                >
                  Oku <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto font-mono">
            
            <button
              type="button"
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 hover:bg-white/10"
              onClick={() => setSelectedArticle(null)}
            >
              <X className="h-5 w-5" />
            </button>

            <span className="px-2.5 py-1 bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-black uppercase">
              {selectedArticle.tag}
            </span>

            <h2 className="text-lg sm:text-2xl font-black text-white uppercase mt-3 mb-4 leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-neutral-400 border-b border-white/10 pb-4 mb-5">
              <span>Yazar: <strong className="text-white">{selectedArticle.authorName}</strong> ({selectedArticle.authorRole})</span>
              <span>•</span>
              <span>{new Date(selectedArticle.publishedAt).toLocaleDateString("tr-TR")}</span>
            </div>

            <div className="h-64 sm:h-80 w-full mb-6 border border-white/15 overflow-hidden">
              <img src={selectedArticle.coverImage} alt={selectedArticle.title} className="h-full w-full object-cover" />
            </div>

            <div className="text-neutral-300 text-sm font-sans leading-relaxed space-y-4 border-b border-white/10 pb-6 mb-6">
              <p className="font-semibold text-white text-base leading-relaxed">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content}</p>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                HABER YORUMLARI ({articleComments.length})
              </h3>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {articleComments.length === 0 ? (
                  <p className="text-xs text-neutral-500 font-sans py-4">Bu haber hakkında henüz yorum yapılmamış.</p>
                ) : (
                  articleComments.map((c) => (
                    <div key={c.id} className="p-3 border border-white/10 bg-black/60 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{c.userDisplayName}</span>
                        <span className="text-[9px] text-neutral-500">{new Date(c.createdAt).toLocaleDateString("tr-TR")}</span>
                      </div>
                      <p className="text-xs text-neutral-300 font-sans">{c.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="flex gap-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  placeholder={currentUser ? "Habere yorum yaz..." : "Yorum yapmak için giriş yapın..."}
                  disabled={!currentUser}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={!currentUser}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none px-4 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
"""

with open("src/components/NewsSection.tsx", "w", encoding="utf-8") as f:
    f.write(code)
print("NewsSection.tsx written successfully")
