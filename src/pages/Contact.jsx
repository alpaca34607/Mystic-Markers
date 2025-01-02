import React, { useState ,useEffect} from "react";
import Navbar from "../components/Navbar";
import Story from "./Story";
import Map from "./Map";
import Forum from "./Forum";
import { Link, Route, Routes } from "react-router-dom";
import "../style.scss";
import App from "../App";

const Contact = () => {
  const [currentTab, setCurrentTab] = useState("account");

  const faqContent = {
    account: [
      {
        question: "如何註冊帳號？",
        answer: "您可以使用有效的電子郵件地址註冊帳號。",
      },
      {
        question: "忘記密碼怎麼辦？",
        answer: "點擊登入頁的「忘記密碼」，我們將寄送密碼重設的連結。",
      },
      {
        question: "如何修改個人資料？",
        answer: "登入後進入「設定」頁面，您可以更新暱稱、頭像、簡介等資料。",
      },
      {
        question: "可以刪除我的帳號嗎？",
        answer:
          "是的，您可以透過「帳號設定」頁面提交帳號刪除申請，刪除後無法恢復。",
      },
    ],
    content: [
      {
        question: "如何發布文章？",
        answer: "點擊「發表文章」，選擇適合的版塊，輸入標題與內容後按下發佈。",
      },
      {
        question: "文章可以編輯或刪除嗎？",
        answer:
          "是的，您可以在發佈後一定時間內編輯文章，刪除則需進入文章右上角的選單。",
      },
      {
        question: "圖片或影片怎麼上傳？",
        answer: "編輯文章時，點擊「上傳檔案」按鈕即可加入圖片或影片。",
      },
      {
        question: "為什麼我的文章被移除了？",
        answer: "如果您的文章違反了社群規範或版規，可能會被管理員移除。",
      },
    ],
    safety: [
      {
        question: "社群有什麼禁止的行為嗎？",
        answer: "禁止的行為包括但不限於：侮辱他人、散播不實消息等。",
      },
      {
        question: "如何檢舉不當內容或用戶？",
        answer: "點擊文章或留言右上角的「檢舉」按鈕，選擇檢舉原因。",
      },
      {
        question: "我被他人檢舉會怎麼處理？",
        answer: "如果您的內容被檢舉，我們的管理員會進行審核。",
      },
      {
        question: "如何保護我的隱私？",
        answer: "請避免在公開文章或留言中透露您的個人資訊。",
      },
    ],
  };
  useEffect(() => {
      // 當路由變更時，將頁面滾動到頂部
      window.scrollTo(0, 0);
    }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={
        <main className="contact-body">
        <div className="faq-contact">
          {/* FAQ Section */}
          <div className="faq-section">
            <h1>常見問題</h1>
            <div className="faq-buttons">
              <button onClick={() => setCurrentTab("account")}>帳號相關</button>
              <button onClick={() => setCurrentTab("content")}>內容發布</button>
              <button onClick={() => setCurrentTab("safety")}>
                規範與安全
              </button>
            </div>
            <div className="faq-items">
              {faqContent[currentTab].map((item, index) => (
                <div className="faq-item" key={index}>
                  <details>
                    <summary>
                      {/* 問題 */}
                      {item.question}
                      <img src="../images/Contact/arrow2.svg" alt="下拉符號" />
                    </summary>
                    {/* 答案 */}
                    <p>{item.answer}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>

          {/* 聯絡我們 */}
          <div className="contact-section">
            <h1>聯絡我們</h1>
            <div className="contact-content">
              <div className="contact-right">
                <div className="contact-bubble">
                  <img src="../images/Contact/Union.svg" alt="人物圖片" />
                  <div className="bubble-text">
                    <p>
                      <strong>E-mail:</strong> mystiocmarkers@google.com
                    </p>
                    <p>
                      <strong>電話:</strong> 02-412-8869
                    </p>
                    <p>
                      <strong>聯絡時間:</strong> 週一至週日 09:30 - 18:30
                    </p>
                  </div>
                </div>
                <img
                  className="person-image"
                  src="../images/Contact/Frame71.png"
                  alt="人物圖片"
                />
              </div>

              <form className="contact-form">
                <p>姓名:</p>
                <input type="text" placeholder="您的姓名" />
                <p>E-mail:</p>
                <input type="email" placeholder="您的電子郵件" />
                <p>主旨:</p>
                <input type="text" placeholder="標題" />
                <p>內容:</p>
                <textarea placeholder="您的訊息"></textarea>
                <button type="submit">送出</button>
              </form>
            </div>
          </div>
        </div>

        {/* 頁尾區 */}
        <footer>
          <div className="content">
            <div className="left">
              <ul className="link">
                <li>
                  <Link to="/">首頁</Link>
                </li>
                <li>
                  <Link to="/Story">怪奇博物館</Link>
                </li>
                <li>
                  <Link to="/Map">靈異導航</Link>
                </li>
                <li>
                  <Link to="/Forum">鬼影探索</Link>
                </li>
              </ul>
              <small>&copy; 2024 Mystic Markers. All Rights Reserved.</small>
            </div>
            <img src="/images/LOGO_footer.svg" alt="神秘座標" />
          </div>
        </footer>
        </main>
      }
      />
        <Route path="/" element={<App />} />
        <Route path="/Story" element={<Story />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/Forum" element={<Forum />} />
      </Routes>
    </>
  );
};

export default Contact;
