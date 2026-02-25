import React, { useState, useEffect } from "react";
import "../style.scss";
import { useCurrentUserProfile } from "./getCurrentUserProfile";
import { useAnonymousIdentity } from "../hooks/useAnonymousIdentity";

const PostModal = ({ isOpen, onClose, onNewArticle }) => {
  const userProfile = useCurrentUserProfile();
  const { userId, userName, userAvatar } = userProfile;
  const { isAnonymous, setIsAnonymous, anonymousAvatar, anonymousName } =
    useAnonymousIdentity();

  // 本地狀態管理表單輸入
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("都市傳說");
  const [articleImage, setArticleImage] = useState("");

  // 展開時禁止頁面滾動（所有 Hooks 必須在條件 return 之前呼叫）
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleArticleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticleImage(reader.result); // 保存 Base64 字符串
      };
      reader.readAsDataURL(file);
    }else{
      setArticleImage("");
    }
  };

  // 提交新文章
  const handleSubmit = () => {
    const displayName = isAnonymous ? (anonymousName || "匿名訪客") : userName;
    const displayAvatar = isAnonymous ? (anonymousAvatar || "images/Forum/default-avatar.svg") : (userAvatar || "images/Forum/default-avatar.svg");

    const newArticle = {
      id: Date.now(), // 唯一 ID
      commentCount: 0,
      comments: [],
      category,
      userName: displayName,
      userAvatar: displayAvatar,
      authorName: displayName, // ArticleList / ArticleView 使用
      authorAvatar: displayAvatar,
      title,
      content, // 完整內文
      preview: content.substring(0, 100), // 預覽文字（用於列表摘要）
      isFavorite: false,
      articleImage: articleImage || "",
      createdAt: new Date().toISOString(), // 自動生成當前時間
      likeCount: 0,
      messageCount: 0,
      collectCount: 0,
      isUserCreated: true,
      authorId: userId, // 用於判斷是否為原 PO 留言
    };

    // 更新 localStorage
    const storedArticles =
      JSON.parse(localStorage.getItem("articlesData")) || [];
    const updatedArticles = [newArticle, ...storedArticles];
    localStorage.setItem("articlesData", JSON.stringify(updatedArticles));

    onNewArticle(newArticle); // 通知父組件更新狀態
    onClose(); // 關閉彈窗
  };

  return (
    <div className="post-modal">
      <div className="overlay" onClick={onClose}></div> {/* 添加的遮罩層 */}
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="header-container">
          <h2>新增文章</h2>
        </div>
        <div className="form-header">
          <img
            src={isAnonymous ? (anonymousAvatar || "images/Forum/default-avatar.svg") : (userAvatar || "images/Forum/light.png")}
            alt="頭像"
            className="avatar"
            referrerPolicy="no-referrer"
            onError={(e) => { e.target.src = "images/Forum/default-avatar.svg"; }}
          />
          <span className="user-name">
            {isAnonymous ? (anonymousName || "匿名訪客") : userName}
          </span>
        </div>
        <div className="form-group form-group-checkbox">
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            匿名發布
          </label>
          <span className="checkbox-hint">勾選後將使用隨機頭像與匿名名稱，取消勾選後重新勾選會重新隨機生成</span>
        </div>
        <div className="form-content">
        <div className="form-group">
          <label>選擇發文看板</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="都市傳說">都市傳說</option>
            <option value="廢墟探險">廢墟探險</option>
            <option value="恐怖獵奇">恐怖獵奇</option>
            <option value="恐怖作品">恐怖作品</option>
            <option value="驅邪收驚">驅邪收驚</option>
          </select>
        </div>
        <div className="form-group">
          <label>文章標題</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="請輸入文章標題"
          />
        </div>
        <div className="form-group">
          <label>內容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="撰寫您的文章內容..."
          />
        </div>
        <div className="form-group">
          <label>上傳文章圖片</label>
          <div className="image-upload-group">
            <div>
              <input type="file" accept="image/*" onChange={handleArticleImageUpload} />
              {articleImage && (
                <img
                  src={articleImage}
                  alt="預覽文章圖片"
                  className="preview-image"
                />
              )}
            </div>
          </div>
        </div>
        </div>
        <div className="form-actions">
          <button onClick={onClose}>取消</button>
          <button onClick={handleSubmit}>發布</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
