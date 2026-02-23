import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * 頁尾元件 - 顯示導航連結與版權資訊
 * 會根據當前路徑自動排除當前頁面的連結
 */
function Footer() {
  const location = useLocation();
  const pathname = location.pathname;

  // 導航連結設定：路徑、顯示文字
  const navLinks = [
    { path: "/", label: "首頁" },
    { path: "/Story", label: "怪談博物館" },
    { path: "/Map", label: "靈異導航" },
    { path: "/Forum", label: "鬼影探索" },
    { path: "/Contact", label: "解謎之門" },
  ];

  // 過濾掉當前頁面的連結（當前頁不顯示在導航中）
  const filteredLinks = navLinks.filter((link) => {
    if (link.path === "/") {
      return pathname !== "/";
    }
    return !pathname.startsWith(link.path);
  });

  return (
    <footer>
      <div className="content">
        <div className="left">
          <ul className="link">
            {filteredLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <small>
            &copy; 2024 Mystic Markers. All Rights Reserved. 此網站設計學生練習作品，無任何商業營利用途。
          </small>
        </div>
        <img src="images/LOGO_footer.svg" alt="神秘座標" />
      </div>
    </footer>
  );
}

export default Footer;
