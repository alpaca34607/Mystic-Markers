import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.scss";

// ArticleList 組件
const ArticleList = ({ articles, onFavorite, onDelete }) => {
  const [interactions, setInteractions] = useState([]);
  const storedArticles = JSON.parse(localStorage.getItem("articlesData")) || []; //獲取文章資料
  const allArticles = [...articles, ...storedArticles]; // 合併靜態與動態文章資料

  useEffect(() => {
    // 初始化文章的留言數據和內容
    articles.forEach((article) => {
      const storedComments = JSON.parse(
        localStorage.getItem(`comments-${article.id}`)
      );
      if (storedComments) {
        article.commentCount = storedComments.length; // 同步留言數
        article.comments = storedComments; // 同步留言內容
      }
    });
  }, [articles]);

  // 追蹤每個 interaction 的狀態
  // 當 articles 改變時重新初始化 interactions
  useEffect(() => {
    setInteractions(
      articles.map(
        (article) =>
          (article.interactions || [])
            .map((interaction) => ({
              ...interaction,
              count:
                interaction.altText === "message"
                  ? article.commentCount // 更新為最新的留言數
                  : interaction.count, // 更新留言數
              isLiked: false, // 初始按讚狀態
            }))
            .filter((interaction) => interaction.altText !== "label") // 過濾掉收藏項目
      )
    );
  }, [articles]);


  const handleInteractionClick = (articleIndex, interactionIndex) => {
    setInteractions((prevInteractions) =>
      prevInteractions.map((articleInteractions, idx) =>
        idx === articleIndex
          ? articleInteractions.map((interaction, i) =>
              i === interactionIndex
                ? {
                    ...interaction,
                    isLiked: !interaction.isLiked, // 切換按讚狀態
                    count: interaction.isLiked
                      ? interaction.count - 1 // 若已按讚，數字減 1
                      : interaction.count + 1, // 若未按讚，數字加 1
                  }
                : interaction
            )
          : articleInteractions
      )
    );
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
        <article className="article-card" key={article.id}>
          <div className="article-content">
            {/* 作者區塊 + 更多選項 */}
            <div className="article-header">
              <div className="author-info">
                <img
                  src={article.authorAvatar || "images/Forum/default-avatar.svg"}
                  alt="Author Avatar"
                  className="author-avatar"
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
              <Link
                to={`article/${article.id}`}
                className="styled-article-link"
              >
                <div className="left">
                  {/* 顯示文章標題和摘要 */}
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-preview">{article.preview}</p>
                  {/* Icon 列表 */}
                  <div className="interaction-bar">
                    {interactions[index]?.map((interaction, idx) => (
                      <div
                        className="interaction-item"
                        key={`${interaction.altText}`}
                      >
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault(); // 防止頁面跳轉
                            if (interaction.altText === "like") {
                              handleInteractionClick(index, idx); // 按讚功能
                            }
                          }}
                        >
                          <img
                            src={
                              interaction.isLiked
                                ? interaction.filledIcon // 按讚後的圖案
                                : interaction.icon // 初始未按讚的圖案
                            }
                            alt={interaction.altText}
                          />
                        </Link>
                        <span>{interaction.count}</span>
                      </div>
                    ))}
                    {/* 收藏按鈕 */}
                    <div className="interaction-item">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); // 防止頁面跳轉
                          onFavorite(article.id); // 切換收藏狀態
                        }}
                      >
                        <img
                          src={
                            article.isFavorite
                              ? article.interactions[2].filledIcon // 使用 interactions[2] 的已收藏圖案
                              : article.interactions[2].icon // 使用 interactions[2] 的未收藏圖案
                          }
                          alt={article.isFavorite ? "已收藏" : "收藏"}
                        />
                      </a>
                      <span>{article.isFavorite ? "已收藏" : "收藏"}</span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="right">
                <img
                  src={article.articleImage}
                  alt="Article"
                  className="article-image"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
