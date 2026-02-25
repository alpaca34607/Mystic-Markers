import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredLikeCount, saveLikeCount } from "../utils/articleLikeStorage";
import InteractionBar from "./InteractionBar";
import "../style.scss";

// ArticleList 組件
const ArticleList = ({ articles, onFavorite, onDelete }) => {
  // 追蹤每篇文章的按讚狀態 { articleIndex: boolean }
  const [likedMap, setLikedMap] = useState({});
  // 追蹤每篇文章的留言數 { articleId: number }，從 localStorage 讀入
  const [messageCountMap, setMessageCountMap] = useState(() => {
    const map = {};
    articles.forEach((article) => {
      const stored = JSON.parse(localStorage.getItem(`comments-${article.id}`));
      if (stored) map[article.id] = stored.length;
    });
    return map;
  });

  const handleLikeClick = (article, articleIndex) => {
    const isLiked = likedMap[articleIndex];
    const baseCount =
      getStoredLikeCount(article.id) ??
      article.likeCount ??
      article.interactions?.[0]?.count ??
      0;
    const newCount = isLiked ? baseCount - 1 : baseCount + 1;

    saveLikeCount(article.id, newCount);
    article.likeCount = newCount; // 同步更新記憶體中的物件

    // 用戶自建文章需同步更新 localStorage 的 articlesData
    if (article.isUserCreated) {
      const stored = JSON.parse(localStorage.getItem("articlesData")) || [];
      const updated = stored.map((a) =>
        a.id === article.id ? { ...a, likeCount: newCount } : a
      );
      localStorage.setItem("articlesData", JSON.stringify(updated));
    }

    setLikedMap((prev) => ({
      ...prev,
      [articleIndex]: !isLiked,
    }));
  };
  // 時間處理邏輯
  const getRelativeTime = (createdAt) => {
    const today = new Date();
    const createdDate = new Date(createdAt);

    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "今天";
    if (diffDays === 1) return "昨天";
    if (diffDays === 2) return "前天";

    // 顯示簡短日期，月份和日期補零
    const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
    const day = createdDate.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <article className="article-card" key={`${article.id}-${index}`}>
          <div className="article-content">
            {/* 作者區塊 + 更多選項 */}
            <div className="article-header">
              <div className="author-info">
                <img
                  src={article.authorAvatar || "images/Forum/default-avatar.svg"}
                  alt="Author Avatar"
                  className="author-avatar"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.target.src = "images/Forum/default-avatar.svg"; }}
                />
                <span className="author-name">{article.authorName}</span>
              </div>
              <div className="delete-date-wrapper">
                {/* 僅顯示用戶新增文章的刪除按鈕 */}
                {article.isUserCreated && (
                  <button
                    className="delete-button"
                    onClick={() => onDelete(article.id)}
                  >
                    刪除
                  </button>
                )}
                {/* 簡短 PO 文時間 */}
                <p className="article-date">
                  {getRelativeTime(article.createdAt)}
                </p>

              </div>
            </div>
            {/* 文章內容 */}
            <div className="article-Graphics-text">
              <div className="left">
                {/* 顯示文章標題和摘要 */}
                <Link
                  to={`article/${article.id}`}
                  className="article-link"
                >
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-preview">{article.preview}</p>
                </Link>
                  <InteractionBar
                    likeCount={
                      getStoredLikeCount(article.id) ??
                      article.likeCount ??
                      0
                    }
                    isLiked={likedMap[index]}
                    onLikeClick={() => handleLikeClick(article, index)}
                    messageCount={
                      messageCountMap[article.id] ??
                      article.messageCount ??
                      article.commentCount ??
                      0
                    }
                    isFavorite={article.isFavorite}
                    onFavoriteClick={() => onFavorite(article.id)}
                    showShare={false}
                  />
              </div>

            <div className="right">
              {article.articleImage &&
                article.articleImage !== "" && (
                  <img
                    src={article.articleImage}
                    alt="Article"
                    className="article-image"
                  />
                )}
            </div>
          </div>
        </div>
        </article>
  ))
}
    </div >
  );
};

export default ArticleList;
