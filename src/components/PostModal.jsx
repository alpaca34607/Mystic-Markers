import React, { useState } from "react";
import "../style.scss";

const PostModal = ({ isOpen, onClose, onNewArticle, userName }) => {
  if (!isOpen) return null;

  // 本地狀態管理表單輸入
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("都市傳說");
  const [authorName, setAuthorName] = useState(userName || "匿名用戶");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [articleImage, setArticleImage] = useState("");

  // 圖片處理
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAuthorAvatar(reader.result); // 保存 Base64 字符串
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArticleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticleImage(reader.result); // 保存 Base64 字符串
      };
      reader.readAsDataURL(file);
    }
  };

  // 提交新文章
  const handleSubmit = () => {
    const newArticle = {
      id: Date.now(), // 唯一 ID
      commentCount: 0,
      comments: [],
      category,
      authorName,
      authorAvatar: authorAvatar || "images/Forum/default-avatar.svg",
      title,
      preview: content.substring(0, 100), // 預覽文字
      isFavorite: false,
      articleImage: articleImage || "images/Forum/default-image.svg",
      createdAt: new Date().toISOString(), // 自動生成當前時間
      interactions: [
        {
          icon: "images/Forum/Forum_ghost.svg",
          filledIcon: "images/Forum/solar_ghost-outline.svg",
          count: 0,
          altText: "like",
        },
        {
          icon: "images/Forum/mynaui_message.svg",
          count: 0,
          altText: "message",
        },
        {
          icon: "images/Forum/Forum_label.svg",
          filledIcon: "images/Forum/MapCollect.png",
          count: 0,
          altText: "label",
        },
      ],
      isUserCreated: true, // 標記為用戶自己新增的文章
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
            src={authorAvatar || "images/Forum/light.png"}
            alt="頭像"
            className="avatar"
          />
          <input
            type="text"
            className="author-name"
            value={authorName}
            readOnly
          />
        </div>
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
          <label>上傳圖片</label>
          <div className="image-upload-group">
            <div>
              <input type="file" onChange={handleAvatarUpload} />
              <span>頭像</span>
              {authorAvatar && (
                <img
                  src={authorAvatar}
                  alt="預覽頭像"
                  className="preview-image"
                />
              )}
            </div>
            <div>
              <input type="file" onChange={handleArticleImageUpload} />
              <span>文章圖片</span>
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
        <div className="form-actions">
          <button onClick={onClose}>取消</button>
          <button onClick={handleSubmit}>發布</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
