import React from "react";

// 圖示
const ICONS = {
  like: "images/Forum/Forum_ghost.svg",
  likeFilled: "images/Forum/solar_ghost-outline.svg",
  message: "images/Forum/mynaui_message.svg",
  collect: "images/Forum/Forum_label.svg",
  collectFilled: "images/Forum/label-filled.svg",
};

/*文章互動列：按讚、留言、收藏，可選分享按鈕*/
const InteractionBar = ({
  likeCount,
  isLiked,
  onLikeClick,
  messageCount,
  isFavorite,
  onFavoriteClick,
  showShare = false,
  onShareClick,
}) => {
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onLikeClick?.();
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteClick?.();
  };

  return (
    <div className="interaction-bar">
      <div className="interaction-items">
        {/* 按讚 */}
        <div className="interaction-item">
          <button
            type="button"
            className="interaction-link"
            onClick={handleLike}
          >
            <img
              src={isLiked ? ICONS.likeFilled : ICONS.like}
              alt="like"
            />
          </button>
          <span>{likeCount}</span>
        </div>
        {/* 留言 */}
        <div className="interaction-item">
          <img src={ICONS.message} alt="message" />
          <span>{messageCount}</span>
        </div>
        {/* 收藏 */}
        <div className="interaction-item">
          <button
            type="button"
            className="interaction-link"
            onClick={handleFavorite}
          >
            <img
              src={isFavorite ? ICONS.collectFilled : ICONS.collect}
              alt={isFavorite ? "已收藏" : "收藏"}
            />
          </button>
          <span>{isFavorite ? "已收藏" : "收藏"}</span>
        </div>
      </div>
      {showShare && (
        <button
          type="button"
          className="share-button"
          onClick={onShareClick}
        >
          <img
            src="images/Forum/ic_outline-share.png"
            alt="分享"
            className="share-icon"
          />
        </button>
      )}
    </div>
  );
};

export default InteractionBar;
