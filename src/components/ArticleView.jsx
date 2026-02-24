import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import articlesData from "../js/articlesData";

import { swalSuccess } from "../utils/swal";

import { useCurrentUserProfile } from "./getCurrentUserProfile";

import { useAnonymousIdentity } from "../hooks/useAnonymousIdentity";
import "../style.scss";

const ArticleView = () => {
  const { articleId } = useParams(); // 從路由參數獲取 articleId
  const storedArticles = JSON.parse(localStorage.getItem("articlesData")) || [];
  const allArticles = [...articlesData, ...storedArticles];
  const article = allArticles.find(
    (item) =>
      item.id === parseInt(articleId) || String(item.id) === String(articleId),
  );
  const [comments, setComments] = useState([]); // 儲存留言內容
  const [newComment, setNewComment] = useState(""); // 新留言
  const [commentCount, setCommentCount] = useState(article?.commentCount || 0); // 留言數
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const userProfile = useCurrentUserProfile();

  const { userName, userAvatar } = userProfile;

  const { isAnonymous, setIsAnonymous, anonymousAvatar, anonymousName } =
    useAnonymousIdentity();

  // 初始化留言內容與留言數（使用 articleId 避免 article 物件引用每次渲染都變動導致無限循環）
  useEffect(() => {
    if (!articleId || !article) return;

    const storedComments = JSON.parse(
      localStorage.getItem(`comments-${article.id}

          `),
    );

    if (storedComments) {
      setComments(storedComments); // 加載本地留言內容
      setCommentCount(storedComments.length); // 更新留言數
    }
  }, [articleId]);

  // 將留言內容與數據保存到 localStorage
  useEffect(() => {
    if (!articleId || !article) return;

    localStorage.setItem(
      `comments-${article.id}

        `,
      JSON.stringify(comments),
    );
  }, [comments, articleId]);

  // 更新留言數
  const updateCommentCount = () => {
    articlesData.forEach((item) => {
      if (item.id === article.id) {
        item.commentCount += 1;

        item.interactions.forEach((interaction) => {
          if (interaction.altText === "message") {
            interaction.count = comments.length + 1; // 更新留言數
          }
        });
      }
    });
  };

  // 時間計算格式
  const formatRelativeDate = (dateString) => {
    const now = new Date();
    const commentDate = new Date(dateString);

    // 去掉時間的細節，只保留年月日部分進行比較
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const commentDateOnly = new Date(
      commentDate.getFullYear(),
      commentDate.getMonth(),
      commentDate.getDate(),
    );

    const diffDays = (nowDate - commentDateOnly) / (1000 * 60 * 60 * 24);

    // 判斷日期差，返回對應的格式
    if (diffDays === 0) {
      return `今天 ${commentDate.getHours().toString().padStart(2, "0")}

      :${commentDate.getMinutes().toString().padStart(2, "0")}

      `;
    } else if (diffDays === 1) {
      return `昨天 ${commentDate.getHours().toString().padStart(2, "0")}

      :${commentDate.getMinutes().toString().padStart(2, "0")}

      `;
    } else if (diffDays === 2) {
      return `前天 ${commentDate.getHours().toString().padStart(2, "0")}

      :${commentDate.getMinutes().toString().padStart(2, "0")}

      `;
    } else {
      return `${(commentDate.getMonth() + 1).toString().padStart(2, "0")}

      /${commentDate.getDate().toString().padStart(2, "0")}

      ${commentDate.getHours().toString().padStart(2, "0")}

      :${commentDate.getMinutes().toString().padStart(2, "0")}

      `;
    }
  };

  // 新增留言並保存
  const handleAddComment = () => {
    if (newComment.trim()) {
      // 匿名留言：使用已儲存的匿名頭像與名稱；非匿名：使用登入者資訊
      const displayAvatar = isAnonymous
        ? anonymousAvatar || "images/Forum/default-avatar.svg"
        : userAvatar || "images/Forum/default-avatar.svg";
      const displayName = isAnonymous
        ? anonymousName || "匿名訪客"
        : userName || "訪客";

      const newCommentData = {
        text: newComment,
        likes: 0,
        floor: `B${comments.length + 1}

        `,
        avatar: displayAvatar,
        userName: displayName,
        time: new Date().toISOString(),
        // 時間格式
        isLiked: false,
      };

      // 更新本地留言數據
      setComments((prevComments) => {
        const updatedComments = [...prevComments, newCommentData];

        // 保存到 localStorage
        localStorage.setItem(
          `comments-${article.id}

            `,
          JSON.stringify(updatedComments),
        );
        return updatedComments;
      });

      setNewComment("");

      // 更新留言數到全域文章數據
      articlesData.forEach((item) => {
        if (item.id === article.id) {
          item.commentCount += 1; // 更新留言數

          item.interactions.forEach((interaction) => {
            if (interaction.altText === "message") {
              interaction.count += 1; // 同步更新留言數
            }
          });

          item.comments = JSON.parse(
            localStorage.getItem(`comments-${article.id}

                `),
          ); // 同步留言內容
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
          : comment,
      ),
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
      a.id === article.id
        ? {
            ...a,
            commentCount: a.commentCount + 1,
          }
        : a,
    );
    setArticles(updatedArticles);
  };

  const [isFavorite, setIsFavorite] = useState(false); // 初始化 isFavorite

  useEffect(() => {
    if (article) {
      setInteractions(
        (article.interactions || [])
          .filter((interaction) => interaction.altText !== "label") // 預設過濾

          .map((interaction) => ({
            ...interaction,
            isLiked: false, // 初始按讚狀態
          })),
      );
      setIsFavorite(article.isFavorite || false); // 確保 isFavorite 初始化
    }
  }, [articleId]);

  // 防呆
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
          : interaction,
      ),
    );
  };

  // 收藏功能
  const handleFavoriteClick = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);

    // 更新靜態文章資料
    articlesData.forEach((item) => {
      if (item.id === article.id) {
        item.isFavorite = !item.isFavorite;
      }
    });

    // 用戶新增的文章需同步更新 localStorage
    if (article.isUserCreated) {
      const updated = storedArticles.map((item) =>
        item.id === article.id
          ? {
              ...item,
              isFavorite: !item.isFavorite,
            }
          : item,
      );
      localStorage.setItem("articlesData", JSON.stringify(updated));
    }
  };

  const categoryIcons = {
    所有看板: "images/Forum/Forum_list-box.svg",
    都市傳說: "images/Forum/Forum-symbols-book-5.svg",
    廢墟探險: "images/Forum/Forum_building.svg",
    恐怖獵奇: "images/Forum/Forum_movie.svg",
    恐怖作品: "images/Forum/Forum_ghost-2.svg",
    驅邪收驚: "images/Forum/Forum_temple.svg",
    我的收藏: "images/Forum/label-filled_grey.svg",
  };

  return (
    <div className="article-view">
      <div className="article-container">
        {/* 文章標題 */}
        <div className="article-header">
          <div className="category-nav">
            <div className="category-c">
              {/* 動態顯示分類圖片 */}
              <img
                src={
                  categoryIcons[article.category] || "images/default-icon.svg"
                }
                alt={article.category}
                className="category-icon"
              />
              <span className="category"> {article.category}</span>
            </div>
            <Link to="/Forum" className="back-link" replace>
              <img src="images/Forum/pajamas_go-back.svg" alt="回到文章符號" />
              回到文章列表
            </Link>
          </div>
          <div className="author-info">
            <div className="author-details">
              <h1 className="article-title"> {article.title}</h1>
              <div className="meta-info">
                <img
                  src={
                    article.authorAvatar || "images/Forum/default-avatar.svg"
                  }
                  alt="作者頭像"
                  className="author-avatar"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.src = "images/Forum/default-avatar.svg";
                  }}
                />
                <span className="author-name">
                  {article.authorName || article.userName}
                </span>
                <span className="post-date">昨天 18:28</span>
              </div>
            </div>
          </div>
        </div>
        {/* 文章內文 */}
        <div className="article-content">
          {(article.preview || "")
            .split(/(。|！|？)/g)
            .filter(Boolean)
            .map((segment, index) => (
              <span key={index}>
                {segment}
                {segment.match(/。|！|？/) && <br />}
                {/* 標點符號後插入換行 */}
              </span>
            ))}
          {article.articleImage && (
            <img
              src={`${article.articleImage}

          `}
              alt="文章圖片"
              className="article-image"
            />
          )}
        </div>
        {/* Tag */}
        <div className="tags">
          {["親身經歷", "廢棄工廠", "靈異事件", "神秘符號", "禁忌"].map(
            (tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ),
          )}
        </div>
        {/* icon */}
        <div className="interaction-bar">
          <div className="interaction-items">
            {interactions.map((interaction, idx) => (
              <div
                key={`${interaction.altText}

            `}
                className="interaction-item"
              >
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
                    src={`${
                      interaction.isLiked
                        ? interaction.filledIcon
                        : interaction.icon
                    }

            `}
                    alt={interaction.altText}
                  />
                  <span> {interaction.count}</span>
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
                  src={`${
                    isFavorite
                      ? (article.interactions?.[2]?.filledIcon ??
                        "images/Forum/MapCollect.png")
                      : (article.interactions?.[2]?.icon ??
                        "images/Forum/Forum_label.svg")
                  }

      `}
                  alt={isFavorite ? "已收藏" : "收藏"}
                />
              </a>
              {/* <span>{article.interactions[2]?.count}</span>  這是顯示收藏數 */}
              <span> {article.isFavorite ? "已收藏" : "收藏"}</span>
            </div>
          </div>
          {/* 分享 */}
          <div
            className="share-button"
            onClick={() => {
              navigator.clipboard
                .writeText(window.location.href) // 複製網址到剪貼板
                .then(() => swalSuccess("文章連結已複製"))
                .catch((error) => console.error("無法複製連結", error));
            }}
            role="button" // 提供可訪問性
            tabIndex="0" // 讓 div 可被聚焦
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigator.clipboard
                  .writeText(window.location.href)
                  .then(() => swalSuccess("文章連結已複製"))
                  .catch((error) => console.error("無法複製連結", error));
              }
            }}
          >
            <img
              src={`${"images/Forum/ic_outline-share.png"}

      `}
              alt="分享"
              className="share-icon"
            />
          </div>
        </div>
        {/* 留言列表 */}
        <div className="comments-section">
          <h2>留言區</h2>
          {comments.length > 0 ? comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <img
                src={comment.avatar}
                alt="使用者頭像"
                className="comment-avatar"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.src = "images/Forum/default-avatar.svg";
                }}
              />
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-user"> {comment.userName}</span>
                  <span className="comment-floor"> {comment.floor}</span>
                  <span className="comment-time">
                    {formatRelativeDate(comment.time)}
                  </span>
                  <div className="comment-actions">
                    <button
                      className={`like-button ${comment.isLiked ? "liked" : ""}

            `}
                      onClick={() => handleLikeComment(index)}
                    >
                      <img
                        src={`${
                          comment.isLiked
                            ? "images/Forum/solar_ghost-outline.svg"
                            : "images/Forum/Forum_ghost.svg"
                        }

            `}
                        alt="like"
                      />
                      <span> {comment.likes}</span>
                    </button>
                  </div>
                </div>
                <p className="comment-text"> {comment.text}</p>
              </div>
            </div>
          )):( <div className="comment-item"><p className="comment-text">還沒有人留下留言，來搶頭香吧！</p></div>)}
        </div>
      </div>

      {/* 留言區塊 */}
      <div
        className={`comment-input ${isCommentExpanded ? "expanded" : ""}

      `}
      >
        <div className="input-container">
          {/* 頭像與名稱 */}
          <div
            className="user-info"
            style={{
              backgroundColor: "#acff6c",
            }}
          >
            <img
              src={
                isAnonymous
                  ? anonymousAvatar || "images/Forum/default-avatar.svg"
                  : userAvatar || "images/Forum/default-avatar.svg"
              }
              alt="使用者頭像"
              className="user-avatar"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.src = "images/Forum/default-avatar.svg";
              }}
            />
            <span className="user-name">
              {isAnonymous ? anonymousName || "匿名訪客" : userName || "訪客"}
            </span>
          </div>
          {/* 輸入框 */}
          <input
            type="text"
            placeholder="輸入留言..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setIsCommentExpanded(true)}
          />
          {/* 送出按鈕 */}
          <button
            onClick={handleAddComment}
            style={{
              backgroundColor: "#acff6c",
            }}
          >
            送出
          </button>
        </div>
        {/* 匿名留言 */}
        <div className="comment-anonymous-checkbox">
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            匿名留言
          </label>
          <span className="checkbox-hint">
            勾選後將使用隨機頭像與名稱，重新勾選會重新隨機生成
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
