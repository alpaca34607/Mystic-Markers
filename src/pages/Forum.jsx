import React, { useState, useMemo, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // 確保引入 useParams
import Navbar from "../components/Navbar"; //Navbar
import "../style.scss";
import ArticleList from "../components/ArticleList"; // 文章列表
import ArticleView from "../components/ArticleView";
import articlesData from "../js/articlesData"; // 原始文章資料
import PostModal from "../components/PostModal"; // 發文彈窗組件
import { Routes, Route } from "react-router-dom";

import Contact from "./Contact";
import Story from "./Story";
import Map from "./Map";

const Forum = () => {
  const { category } = useParams(); // 接收首頁路由中的分類名稱
  const [articles, setArticles] = useState(articlesData); // 狀態：所有文章
  const [searchValue, setSearchValue] = useState(""); // 搜尋欄位
  const [ascending, setAscending] = useState(true); // 排序 升幕與降幕
  const [sortType, setSortType] = useState("popular"); // 排序類型"最新"或者"熱門"排序，預設"熱門"
  const [currentCategory, setCurrentCategory] = useState("所有看板"); // 狀態：當前分類
  const [isModalOpen, setModalOpen] = useState(false); // 狀態：發文彈窗是否開啟
  const [searchTriggered, setSearchTriggered] = useState(false); // 記錄是否已觸發搜尋
  const [hoveredIcon, setHoveredIcon] = useState(null); //紀錄更換排序按鈕
  const location = useLocation(); //帳戶名稱
  const userName = location.state?.userName || "匿名用戶";
   useEffect(() => {
      // 當路由變更時，將頁面滾動到頂部
      window.scrollTo(0, 0);
    }, [location]);

  useEffect(() => {
    // [撰寫新文章]加載靜態數據和 localStorage 中的數據
    const storedArticles =
      JSON.parse(localStorage.getItem("articlesData")) || [];
    setArticles([...storedArticles, ...articlesData]);
  }, []);

  // [撰寫新文章]提交新文章時添加到文章列表
  const handleNewArticle = (newArticle) => {
    setArticles([newArticle, ...articles]); // 新文章加到最上面
    setModalOpen(false); // 關閉彈窗
  };
  //刪除文章
  const handleDeleteArticle = (id) => {
    // 從本地 state 中刪除
    const updatedArticles = articles.filter(
      (article) => article.id !== id || !article.isUserCreated
    );

    // 同步更新 localStorage
    localStorage.setItem("articlesData", JSON.stringify(updatedArticles));

    setArticles(updatedArticles);
  };

  // 首頁路由器更新用
  useEffect(() => {
    if (category) {
      setCurrentCategory(decodeURIComponent(category)); // 動態更新分類
    }
  }, [category]);

  // [搜尋]過濾功能，只有在按下搜尋按鈕後才觸發
  const filteredArticles_search = useMemo(() => {
    if (searchTriggered) {
      return articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchValue.toLowerCase()) // 根據標題搜尋
      );
    }
    return articles; // 沒有觸發搜尋時，顯示所有文章
  }, [searchValue, articles, searchTriggered]);

  // [分類]篩選文章
  const filteredArticles_category = useMemo(() => {
    return filteredArticles_search.filter((article) => {
      if (currentCategory === "所有看板") return true; // 顯示所有文章
      if (currentCategory === "我的收藏") return article.isFavorite; // 顯示收藏文章
      return article.category === currentCategory; // 根據分類篩選文章
    });
  }, [filteredArticles_search, currentCategory]);

  // [熱門、最新]根據按讚數進行排序
  const sortedArticles = useMemo(() => {
    return [...filteredArticles_category].sort((a, b) => {
      if (sortType === "popular") {
        const aLikes = a.interactions.find((i) => i.altText === "like").count;
        const bLikes = b.interactions.find((i) => i.altText === "like").count;
        return ascending ? aLikes - bLikes : bLikes - aLikes; // 熱門排序
      } else if (sortType === "latest") {
        return ascending
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt); //最新排序
      }
      return 0;
    });
  }, [filteredArticles_category, sortType, ascending, searchTriggered]);

  // [搜尋]輸入變化
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // [熱門]觸發排序方式的切換
  const toggleSortOrder = () => {
    setAscending((prevState) => !prevState); // 切換升冪和降冪
  };

  // [搜尋]按鈕觸發搜尋和排序
  const handleSearchButtonClick = () => {
    setSearchTriggered(true); // 觸發搜尋
    toggleSortOrder(); // 切換排序
  };

  // [發文規則]按鈕
  const showPostingRules = () => {
    alert(
      "發文規則：\n1. 請保持友善與尊重。\n2. 禁止發表不當內容。\n3. 內容需與分類相關。"
    );
  };

  // [分類]點擊分類按鈕時更改當前分類
  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  // [分類]點擊收藏按鈕時切換收藏狀態
  const handleArticleFavorite = (id) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, isFavorite: !article.isFavorite } // 切換收藏狀態
          : article
      )
    );
  };


  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <main className="forum-body">
              <div className="forum-container">
                <div className="forum-layout">
                  {/* 側邊分類欄位、篩選、廣告區 */}
                  <aside className="sidebar">
                    <div className="sidebar-content">
                      <nav className="category-board">
                        <ul className="category-list" role="list">
                          {[
                            { icon: "Forum_list-box", label: "所有看板" },
                            { icon: "Forum-symbols-book-5", label: "都市傳說" },
                            { icon: "Forum_building", label: "廢墟探險" },
                            { icon: "Forum_movie", label: "恐怖獵奇" },
                            { icon: "Forum_ghost-2", label: "恐怖作品" },
                            { icon: "Forum_temple", label: "驅邪收驚" },
                            { icon: "label-filled_grey", label: "我的收藏" },
                          ].map((category) => (
                            <li
                              key={category.label}
                              className={`category-item ${currentCategory === category.label
                                ? "active"
                                : ""
                                }`}
                              role="listitem"
                              onClick={() =>
                                handleCategoryClick(category.label)
                              }
                            >
                              <div>
                                <img
                                  src={`images/Forum/${category.icon}.svg`}
                                  alt={category.label}
                                />
                                <p>{category.label}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </nav>
                      <div
                        className="ad-section"
                        role="complementary"
                        aria-label="廣告區域"
                      >
                        <img
                          className="ad-text"
                          src="images/Forum/HORRO.png"
                          alt="廣告"
                        />
                      </div>
                    </div>
                  </aside>

                  {/* 主內容 */}
                  <div className="main-content">
                    <div className="top-bar">
                      {/* 按鈕欄 */}
                      <div className="nav-buttons">
                        {[
                          {
                            icon: "mingcute_fire-fill",
                            hoverIcon: "mingcute_fire-fill2", // 懸停時的圖標
                            label: "熱門",
                            onClick: () => {
                              setSortType("popular"); // 設定熱門排序
                              setAscending((prev) => !prev); // 切換升冪與降冪
                            },
                          },
                          {
                            icon: "emojione-monotone_new-button",
                            hoverIcon: "emojione-monotone_new-button2", // 懸停時的圖標
                            label: "最新",
                            onClick: () => {
                              if (sortType === "latest") {
                                setAscending((prev) => !prev); // 切換升冪與降冪
                              } else {
                                setSortType("latest"); // 設定最新排序
                                setAscending(true); // 默認升冪
                              }
                            }
                          },
                          {
                            icon: "ooui_notice",
                            hoverIcon: "ooui_notice_fill", // 懸停時的圖標
                            label: "發文規則",
                            onClick: showPostingRules,
                          },
                        ].map((item, index) => (
                          <div key={index} className="nav-button-container"
                            onMouseEnter={() => setHoveredIcon(item.hoverIcon)} // 當滑鼠進入時設定 hoverIcon
                            onMouseLeave={() => setHoveredIcon(null)} // 當滑鼠離開時恢復
                          >
                            <img
                              src={hoveredIcon === item.hoverIcon
                                ? `images/Forum/${item.hoverIcon}.svg`
                                : `images/Forum/${item.icon}.svg`}
                              alt={item.label}
                              className="nav-button-icon"
                            />
                            <button
                              key={index}
                              onClick={item.onClick}
                              className="nav-button"
                            >
                              <p>{item.label}</p>
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* 搜尋欄位 */}
                      <div className="right-bar">
                        <div className="search-bar-container">
                          <div className="search-bar">
                            <input
                              type="search"
                              className="search-input"
                              placeholder="搜尋文章"
                              value={searchValue}
                              onChange={handleSearch}
                            />
                            <button
                              className="search-button"
                              onClick={handleSearchButtonClick}
                            >
                              <img
                                src="images/Forum/iconamoon_search.svg"
                                alt="搜尋"
                              />
                            </button>
                          </div>
                        </div>

                        {/* 發表文章按鈕 */}
                        <div className="PostModal-bar">
                          <img
                            src="images/Forum/jam_write.svg"
                            alt="撰寫文章"
                            style={{ cursor: "pointer", width: "50px" }}
                            onClick={() => setModalOpen(true)}
                          />
                          <PostModal
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                            onNewArticle={(handleNewArticle) => {
                              setArticles([handleNewArticle, ...articles]); // 新增文章置頂
                            }}
                            userName={userName} // 傳遞使用者名稱給 PostModal
                          />
                        </div>
                      </div>
                    </div>

                    {/* 文章列表 */}
                    <ArticleList
                      articles={sortedArticles} // 排序並篩選後的文章資料
                      onFavorite={handleArticleFavorite} //傳遞收藏功能
                      onDelete={handleDeleteArticle} // 傳遞刪除功能
                    />
                  </div>
                </div>
              </div>
            </main>
          }
        />
        <Route path="/article/:articleId" element={<ArticleView />} />
        <Route path="/Story" element={<Story />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default Forum;
