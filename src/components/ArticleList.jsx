import React, { useEffect,useState } from "react";
import "../style.scss";

// ArticleList 組件
const ArticleList = ({ articles, onFavorite }) => {

  const [interactions, setInteractions] = useState([]);
  
  // 追蹤每個 interaction 的狀態
 // 當 articles 改變時重新初始化 interactions
  useEffect(() => {
    setInteractions(
      articles.map((article) =>
        (article.interactions || []).map((interaction) => ({
          ...interaction,
          isLiked: false, // 初始按讚狀態
        }))
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

  

  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <article className="article-card" key={article.id}>
          <div className="article-content">
            {/* 作者區塊 + 更多選項 */}
            <div className="article-header">
              <div className="author-info">
                <img
                  src={article.authorAvatar}
                  alt="Author Avatar"
                  className="author-avatar"
                />
                <span className="author-name">{article.authorName}</span>
              </div>
              <button type="button" aria-label="更多選項">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="$primary-purple"
                >
                  <path d="M6 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm12 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm12 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                </svg>
              </button>
            </div>
            {/* 文章內容 */}
            <div className="article-Graphics-text">
              <a href={`/article/${article.id}`} className="styled-article-link">
                <div className="left">
                  {/* 顯示文章標題和摘要 */}
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-preview">{article.preview}</p>
                  {/* Icon 列表 */}
                  <div className="interaction-bar">
                     {interactions[index]?.map((interaction, idx) => (
                  
                      <div className="interaction-item" key={`${article.id}-${interaction.altText}`}>
                        <a
                          href="#"
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
                        </a>
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
              </a>

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
