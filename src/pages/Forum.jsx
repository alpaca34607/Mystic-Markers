import React, { useState,  useEffect } from "react";
import Navbar from "../components/Navbar"; //Navbar
import "../style.scss";
import ArticleList from "../components/ArticleList"; // 文章列表
import articlesData from "../js/articlesData"; // 原始文章資料
import PostModal from "../components/PostModal"; // 發文彈窗組件
import { Link, Routes, Route } from "react-router-dom";
import Story from "./Story";
import Map from "./Map";
import Contact from "./Contact";
import App from "../App";

const Forum = () => {
  useEffect(() => {
      // 當路由變更時，將頁面滾動到頂部
      window.scrollTo(0, 0);
    }, [location]);

  const [articles, setArticles] = useState(articlesData); // 狀態：所有文章
  const [sortedArticles, setSortedArticles] = useState(articles); // 排序後的文章
  const [currentCategory, setCurrentCategory] = useState("所有看板"); // 狀態：當前分類
  const [isModalOpen, setModalOpen] = useState(false); // 狀態：發文彈窗是否開啟

  // 熱門排序指令
  const sortArticlesByPopularity = () => {
    const sorted = [...articles].sort((a, b) => {
      const aLikes = a.interactions.find((i) => i.altText === "like").count;
      const bLikes = b.interactions.find((i) => i.altText === "like").count;
      return bLikes - aLikes;
    });
    setSortedArticles(sorted);
  };

  // 最新排序
  const sortArticlesByDate = () => {
    const sorted = [...articles].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortedArticles(sorted);
  };

  // 發文規則按鈕
  const showPostingRules = () => {
    alert(
      "發文規則：\n1. 請保持友善與尊重。\n2. 禁止發表不當內容。\n3. 內容需與分類相關。"
    );
  };

  // 根據分類篩選文章
  const filteredArticles = articles.filter((article) => {
    if (currentCategory === "所有看板") return true; // 顯示所有文章
    if (currentCategory === "我的收藏") return article.isFavorite; // 顯示收藏文章
    return article.category === currentCategory; // 根據分類篩選文章
  });

  // 點擊分類按鈕時更改當前分類 (切換分類)
  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  // 點擊收藏按鈕時切換收藏狀態
  const handleArticleFavorite = (id) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, isFavorite: !article.isFavorite } // 切換收藏狀態
          : article
      )
    );
  };

  // 提交新文章時添加到文章列表
  const handleNewArticle = (newArticle) => {
    setArticles([newArticle, ...articles]); // 新文章加到最上面
    setModalOpen(false); // 關閉彈窗
  };

  // 搜尋相關邏輯
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const dummyData = [
    { title: "民雄鬼屋" },
    { title: "荒廢城堡" },
    { title: "恐怖噩夢" },
    { title: "SCP-173" },
    { title: "民雄的傳說" },
    { title: "民雄的傳說" },
  ];
  // 搜尋函式
  const handleSearch = (value) => {
    const searchQuery = value.trim().toLowerCase();
    if (searchQuery === "") {
      setFilteredResults([]); // 搜尋欄清空時，不顯示任何結果
    } else {
      const results = dummyData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery)
      );
      setFilteredResults(results);
    }
  };

  // 即時處理搜尋輸入
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value); // 即時搜尋
  };

  // 按下 Enter 時觸發搜尋
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/*"
          element={
            <main className="forum-body">
              <div className="forum-container">
                <div className="forum-layout">
                  {/* 側邊分類欄位 */}
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
                            { icon: "Forum_building", label: "我的收藏" },
                          ].map((category) => (
                            <li
                              key={category.label}
                              className={`category-item ${
                                currentCategory === category ? "active" : ""
                              }`}
                              role="listitem"
                              onClick={() => handleCategoryClick(category.label)}
                            >
                              <div>
                                <img
                                  src={`../images/Forum/${category.icon}.svg`}
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
                          src="../public/images/Forum/HORRO.svg"
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
                            label: "熱門",
                            onClick: sortArticlesByPopularity,
                          },
                          {
                            icon: "emojione-monotone_new-button",
                            label: "最新",
                            onClick: sortArticlesByDate,
                          },
                          {
                            icon: "ooui_notice",
                            label: "發文規則",
                            onClick: showPostingRules,
                          },
                        ].map((item, index) => (
                          <div key={index} className="nav-button-container">
                            <img
                              src={`../public/images/Forum/${item.icon}.svg`}
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
                              type="text"
                              className="search-input"
                              placeholder="搜尋 民雄鬼屋"
                              value={searchValue}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                            />
                            <button
                              className="search-button"
                              onClick={() => handleSearch(searchValue)}
                            >
                              <img
                                src="../public/images/Forum/iconamoon_search.svg"
                                alt="搜尋"
                              />
                            </button>
                          </div>
                          {/* 搜尋結果 */}
                          <div className="search-results">
                            {filteredResults.length > 0 ? (
                              <ul>
                                {filteredResults.map((item, index) => (
                                  <li key={index}>{item.title}</li>
                                ))}
                              </ul>
                            ) : (
                              searchValue && <p>沒有找到相關結果。</p> // 若無結果且搜尋欄不為空
                            )}
                          </div>
                        </div>

                        {/* 發表文章按鈕 */}
                        <div className="PostModal-bar">
                          <img
                            src="../../images/Forum/jam_write.png"
                            alt="撰寫文章"
                            style={{ cursor: "pointer", width: "50px" }}
                            onClick={() => setModalOpen(true)}
                          />
                          <PostModal
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 文章列表 */}
                    <ArticleList
                      articles={filteredArticles} //文章資料
                      onFavorite={handleArticleFavorite} //傳遞收藏功能
                    />

                    {/* 發文彈窗 */}
                    <PostModal
                      isOpen={isModalOpen}
                      onClose={() => setModalOpen(false)}
                      onNewArticle={(newArticle) =>
                        setArticles([newArticle, ...articles])
                      }
                    />
                  </div>
                </div>
              </div>
            </main>
          }
        />
        <Route path="/Story" element={<Story />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default Forum;
