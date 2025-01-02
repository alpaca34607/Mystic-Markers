import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import articlesData from "../js/articlesData";
import "../style.scss";

const ArticleView = () => {
  const { articleId } = useParams();
  const article = articlesData.find((item) => item.id === parseInt(articleId));
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const randomNames = [
    "神秘訪客",
    "都市探險家",
    "夜遊者",
    "好奇寶寶",
    "探險家",
  ];
  const defaultAvatar = "/images/Forum/Message-avatar.jpg"; // 預設頭像
  const [isFavorite, setIsFavorite] = useState(false); // 初始化 isFavorite

  useEffect(() => {
    if (article) {
      setInteractions(
        (article.interactions || [])
          .filter((interaction) => interaction.altText !== "label") // 預設過濾
          .map((interaction) => ({
            ...interaction,
            isLiked: false, // 初始按讚狀態
          }))
      );
      setIsFavorite(article.isFavorite || false); // 確保 isFavorite 初始化
    }
  }, [article]);

  if (!article) {
    return <p>文章不存在！</p>;
  }
  // 文章按讚功能
  const handleInteractionClick = (interactionIndex) => {
    setInteractions((prevInteractions) =>
      prevInteractions.map((interaction, idx) =>
        idx === interactionIndex
          ? {
            ...interaction,
            isLiked: !interaction.isLiked,
            count: interaction.isLiked
              ? interaction.count - 1 // 若已按讚，數字減 1
              : interaction.count + 1, // 若未按讚，數字加 1
          }
          : interaction
      )
    );
  };

  // 收藏功能
  const handleFavoriteClick = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);

    // 更新全域文章資料中的收藏狀態
    articlesData.forEach((item) => {
      if (item.id === article.id) {
        item.isFavorite = !item.isFavorite;
      }
    });
  };

  // 新增留言
  const handleAddComment = () => {
    if (newComment.trim()) {
      // 隨機匿名訪客
      const randomName =
        randomNames[Math.floor(Math.random() * randomNames.length)];
      setComments((prevComments) => [
        ...prevComments,
        {
          text: newComment,
          likes: 0,
          floor: `B${prevComments.length + 1}`,
          avatar: defaultAvatar, // 使用預設頭像
          userName: randomName,
          time: new Date().toLocaleString(),
          isLiked: false,
        },
      ]);
      setNewComment("");

      // 更新 articlesData 的 commentCount
      articlesData.forEach((item) => {
        if (item.id === article.id) {
          item.commentCount += 1; // 增加留言數
          item.interactions.forEach((interaction) => {
            if (interaction.altText === "message") {
              interaction.count += 1; // 更新 interactions 中的留言數
            }
          });
        }
      });
    }
  };
  //留言區的按讚標籤
  const handleLikeComment = (index) => {
    setComments((prevComments) =>
      prevComments.map((comment, idx) =>
        idx === index
          ? {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
          : comment
      )
    );
  };

  // 新增留言數
  const handleNewComment = (newComment) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      comments: [...prevArticle.comments, newComment],
      commentCount: prevArticle.commentCount + 1, // 更新本地留言數
    }));

    // 同步更新 articlesData.js
    const updatedArticles = articles.map((a) =>
      a.id === article.id ? { ...a, commentCount: a.commentCount + 1 } : a
    );
    setArticles(updatedArticles);
  };

  return (
    <div className="article-view">
      {/* 文章標題 */}
      <div className="article-header">
        <div className="category-nav">
          <span className="category">{article.category}</span>
          <Link to="/Forum" className="back-link">
            回到文章列表
          </Link>
        </div>

        <div className="author-info">
          <div className="author-details">
            <h1 className="article-title">{article.title}</h1>
            <div className="meta-info">
              <img
                src={`/${article.authorAvatar}`}
                alt="作者頭像"
                className="author-avatar"
              />
              <span className="author-name">{article.authorName}</span>
              <span className="post-date">昨天 18:28</span>
            </div>
          </div>
        </div>
      </div>
      {/* 文章內文 */}
      <div className="article-content">
        <p className="article-text">{article.preview}</p>
        <img
          src={`/${article.articleImage}`}
          alt="文章圖片"
          className="article-image"
        />
      </div>
      {/* Tag */}
      <div className="tags">
        {["親身經歷", "廢棄工廠", "靈異事件", "神秘符號", "禁忌"].map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      {/* icon */}
      <div className="interaction-bar">
        <div className="interaction-items">
          {interactions.map((interaction, idx) => (
            <div key={`${interaction.altText}`} className="interaction-item">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (interaction.altText === "like") {
                    handleInteractionClick(idx);
                  }
                }}
              >
                <img
                  src={`/${interaction.isLiked
                    ? interaction.filledIcon
                    : interaction.icon
                    }`}
                  alt={interaction.altText}
                />
                <span>{interaction.count}</span>
              </a>
            </div>
          ))}
          {/* 收藏按鈕 */}
          <div className="interaction-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleFavoriteClick();
              }}
            >
              <img
                src={`/${isFavorite
                  ? article.interactions[2].filledIcon // 使用 interactions[2] 的已收藏圖案
                  : article.interactions[2].icon // 使用 interactions[2] 的未收藏圖案
                  }`}

                alt={isFavorite ? "已收藏" : "收藏"}
              />
            </a>
            {/* <span>{article.interactions[2]?.count}</span>  這是顯示收藏數 */}
            <span>{article.isFavorite ? "已收藏" : "收藏"}</span>
          </div>
        </div>
        {/* 分享 */}
        <div
          className="share-button"
          onClick={() => {
            navigator.clipboard
              .writeText(window.location.href) // 複製網址到剪貼板
              .then(() => alert("文章連結已複製"))
              .catch((error) => console.error("無法複製連結", error));
          }}
          role="button" // 提供可訪問性
          tabIndex="0" // 讓 div 可被聚焦
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigator.clipboard
                .writeText(window.location.href)
                .then(() => alert("文章連結已複製"))
                .catch((error) => console.error("無法複製連結", error));
            }
          }}
        >
          <img
            src={`/${"images/Forum/ic_outline-share.png"}`}
            alt="分享"
            className="share-icon"
          />
        </div>
      </div>
      {/* 留言列表 */}
      <div className="comments-section">
        <h2>留言區</h2>
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <img
              src={comment.avatar}
              alt="使用者頭像"
              className="comment-avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-user">{comment.userName}</span>
                <span className="comment-floor">{comment.floor}</span>
                <span className="comment-time">{comment.time}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
              <div className="comment-actions">
                <button
                  className={`like-button ${comment.isLiked ? "liked" : ""}`}
                  onClick={() => handleLikeComment(index)}
                >
                  <img
                    src={`/${comment.isLiked
                        ? "images/Forum/solar_ghost-outline.svg"
                        : "images/Forum/Forum_ghost.svg"
                      }`}
                    alt="like"
                  />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 留言區塊 */}
      <div className={`comment-input ${isCommentExpanded ? "expanded" : ""}`}>
        <div className="input-container">
          <input
            type="text"
            placeholder="輸入留言..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setIsCommentExpanded(true)}
          />
          <button onClick={handleAddComment}>送出</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
