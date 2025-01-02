import React from "react";
import "../style.scss";

const PostModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 如果視窗未開啟，返回 null

  return (
    <div id="postModal">
      <div className="modal-content">
        {/* 關閉按鈕 */}
        <span
          className="close-btn"
          onClick={onClose}
        >
          &times;
        </span>

        {/* 帳號與頭像 */}
        <div className="user-info">
          <img src="../images/Forum/carbon_user-avatar-filled.svg" alt="頭像" class="avatar"/>
          <span id="userName">您的帳號名稱</span>
        </div>

        {/* 分類選單 */}
        <div id="board-bar">
        <label htmlFor="boardSelect">分類看板：</label>
        <select id="boardSelect">
          <option value="urbantale">都市傳說</option>
          <option value="adventure">廢墟探險</option>
          <option value="Curiosity">恐怖獵奇</option>
          <option value="Portfolio">恐怖作品</option>
          <option value="Exorcise">驅邪收驚</option>
          <option value="collection">我的收藏</option>
        </select>
        </div>
       

        {/* 文章標題 */}
        <input type="text" placeholder="請輸入標題" id="postTitle" />

        {/* 文章內容 */}
        <textarea placeholder="撰寫您的文章內容..." id="postContent"></textarea>

        {/* 插入圖片和影片 */}
        <div className="media-buttons">
          <button>圖片</button>
          <button>影片</button>
        </div>

        {/* 動作按鈕 */}
        <div className="action-buttons">
          <button onClick={onClose}>
            取消
          </button>
          <button>送出</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
