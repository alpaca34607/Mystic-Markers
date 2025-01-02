import React, { useState, useEffect } from "react";
import "../style.scss";

const PostModal = ({ isOpen, onClose, onNewArticle }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("urbantale");

  // 如果 modal 未開啟，提前返回 null
  if (!isOpen) return null;

  // 處理點擊 modal 外部關閉
  const handleBackgroundClick = (e) => {
    if (e.target.id === "postModal") {
      onClose();
    }
  };

  // 處理提交
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!title.trim() || !content.trim()) {
      alert("請填寫標題和內容");
      return;
    }

    const newArticle = {
      id: Date.now(),
      title: title,
      preview: content,
      category: category,
      authorName: "您的帳號名稱",
      authorAvatar: "images/Forum/carbon_user-avatar-filled.svg",
      articleImage: "",
      commentCount: 0,
      interactions: [
        {
          icon: "images/Forum/Forum_ghost.svg",
          filledIcon: "images/Forum/solar_ghost-outline.svg",
          altText: "like",
          count: 0
        },
        {
          icon: "images/Forum/Forum_Message.svg",
          altText: "message",
          count: 0
        }
      ],
      isFavorite: false
    };

    if (onNewArticle) {
      onNewArticle(newArticle);
    }
    
    // 重置表單
    setTitle("");
    setContent("");
    setCategory("urbantale");
    onClose();
  };

  return (
    <div id="postModal" onClick={handleBackgroundClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>

        <form onSubmit={handleSubmit}>
          <div className="user-info">
            <img 
              src={process.env.PUBLIC_URL + "/images/Forum/carbon_user-avatar-filled.svg"} 
              alt="頭像" 
              className="avatar"
            />
            <span id="userName">您的帳號名稱</span>
          </div>

          <div id="board-bar">
            <label htmlFor="boardSelect">分類看板：</label>
            <select 
              id="boardSelect"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="都市傳說">都市傳說</option>
              <option value="廢墟探險">廢墟探險</option>
              <option value="恐怖獵奇">恐怖獵奇</option>
              <option value="恐怖作品">恐怖作品</option>
              <option value="驅邪收驚">驅邪收驚</option>
              <option value="我的收藏">我的收藏</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="請輸入標題"
            id="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="撰寫您的文章內容..."
            id="postContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>

          <div className="media-buttons">
            <button type="button">圖片</button>
            <button type="button">影片</button>
          </div>

          <div className="action-buttons">
            <button type="button" onClick={onClose}>取消</button>
            <button type="submit">送出</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;