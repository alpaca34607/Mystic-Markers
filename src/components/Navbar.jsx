import React, { useState, useEffect, useRef } from "react";
import AuthModal from "./AuthModal";
import "../style.scss";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

// Menu
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 登入/註冊
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  // 通知
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const newsDropdownRef = useRef(null);

  // 點擊外部關閉 news-dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(event.target)) {
        setIsNewsOpen(false);
      }
    };
    if (isNewsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNewsOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  const openModal = (type) => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  const closeModal = () => setIsAuthOpen(false);
  // 存登入狀態、使用者姓名
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const updateAuthState = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      const name = localStorage.getItem("userName");
      setIsLoggedIn(!!loggedIn);
      setUserName(name || "");
    };
    // 初始化登入狀態
    updateAuthState();

    // 監聽 localStorage 更新
    window.addEventListener("storage", updateAuthState);
    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // 非 Firebase 登入時 signOut 可能無效，忽略錯誤
    }
    // 清除登入相關 localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setUserName("");
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/";
  };

  const newsList = [
    { title: "本月精選文章新出爐", content: "那些年，一起追我們的女孩", link: "/Story" },
    { title: "系統更新通知", content: "新增了地圖功能，可以查看地圖上的標記，並查看標記的詳細資訊。", link: "/Map" },
    { title: "論壇熱門話題", content: "鬧鬼工廠的不尋常聲音！發現奇怪的符號", link: "/Forum" },
  ];

  return (
    <header className="Topbar">
      <nav className="Topbar-right">
        {/* LOGO 圖標 */}
        <Link to="/">
          <div className="logo">
            <img src="images/LOGO.svg" alt="神秘座標LOGO" />
            <h3 className="logoText">Mystic Markers</h3>
          </div>
        </Link>
        {/* 登入/註冊 或 登出 */}
        <div className="member">
          {isLoggedIn ? (
            <div className="welcome-container">
              <span>歡迎您, {userName}</span>
              <button onClick={handleLogout} className="auth-btn">
                登出
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <a
                href="#"
                onClick={() => {
                  setAuthType("login"); // 設置視圖為登入
                  setIsAuthOpen(true); // 打開彈窗
                }}
                className="auth-btn"
              >
                登入
              </a>
              |
              <a
                href="#"
                onClick={() => {
                  setAuthType("register"); // 設置視圖為註冊
                  setIsAuthOpen(true); // 打開彈窗
                }}
                className="auth-btn"
              >
                註冊
              </a>
            </div>
          )}
          {isAuthOpen && (
            <AuthModal
              isOpen={isAuthOpen}
              onClose={() => setIsAuthOpen(false)}
              initialView={authType}
            />
          )}
        </div>
      </nav>
      {/* 通知/會員管理/MENU */}
      <nav className="nav-wrapper">
        <div className="news-dropdown-wrapper" ref={newsDropdownRef}>
          <button className="news-btn" onClick={() => setIsNewsOpen(!isNewsOpen)}>
            <img id="news" src="images/news.svg" alt="news" />
          </button>
          {isNewsOpen && (
            <div className="news-dropdown">
              <ul className="news-dropdown-content">
                {newsList.length > 0 && newsList.map((news, index) => (
                  <li className="news-item" key={index}>
                    <Link to={news.link}>
                      <div className="title">
                        <div className="dot"></div>
                        <span>{news.title}</span>
                      </div>
                      <p>{news.content}</p>
                    </Link>
                  </li>))}
              </ul>
            </div>
          )}
        </div>
        {/* 登入後顯示會員管理按鈕 */}
        {isLoggedIn && (
          <div className="group-info">
            <Link to="/User">
              <img
                id="Group"
                src="images/Group.svg"
                alt="Group"
              />
            </Link>
          </div>
        )}
        {/* Menu */}
        <div className="navbar">
          {/* 漢堡按鈕 */}
          <button
            className={`hamburger ${isMenuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          {/* 導覽列 */}
          <nav
            className={`navigation ${isMenuOpen ? "show" : ""}`}
            onClick={() => setIsMenuOpen(false)} // 點擊關閉選單
          >
            <ul className="menu">
              <li>
                <Link to="/Story">怪談博物館</Link>
              </li>
              <li>
                <Link to="/Map">靈異導航</Link>
              </li>
              <li>
                <Link to="/Forum" state={{ userName: userName }}>鬼影探索</Link>
              </li>
              <li>
                <Link to="/Contact">解謎之門</Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
