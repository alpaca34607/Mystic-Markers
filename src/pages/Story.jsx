import React, { useEffect } from "react";
import Navbar from "../components/Navbar"; //Navbar
import "../style.scss";
import { Routes, Route } from "react-router-dom";
import Forum from "./Forum";
import Map from "./Map";
import Contact from "./Contact";
import App from "../App";
import { Link } from "react-router-dom";
import GotoTop from "../components/GotoTop";


export default function Story() {
    useEffect(() => {
        // 當路由變更時，將頁面滾動到頂部
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/*"
                    element={
                        <main className="Story">

                            {/*  精選文章 那些年一起追我們的女孩 */}
                            <section className="feature-story">
                                <div>
                                    <img src="/images/Story/tornpaper.png" alt="裝飾紙張" className="paper" />
                                </div>
                                <div className="feature-story-container">
                                    <div className="story-title">
                                        <img src="/images/Story/Mark_blue.svg" className="blue-mark" alt="本月精選文章" />
                                        <img src="/images/Story/title-featured-story.png" className="text-title" alt="本月精選文章" />
                                    </div>

                                    <div className="story-box">
                                        <div className="story">
                                            <div className="user">
                                                <p>韭把刀 <br />2024.11.05 </p>
                                                <figure className="user-img"><img src="/images/Story/Polygon 1.png" alt="使用者頭像" /></figure>
                                            </div>
                                            <h2>那些年，一起追我們的女孩</h2>
                                            <div className="story-content">
                                                <p className="story1">
                                                    我們高中時期那片校園，有著綠意盎然的操場、隨風搖曳的櫻花道、破舊的教室樓，和一片漆黑的後山小徑。說是漆黑，並非真的因為陰暗，實際上那裡的路燈早已壞掉，但總有人說，即使是白晝，那片小徑也讓人不寒而慄。
                                                </p>
                                                <p>高三那一年，我們幾個臭味相投的好友，總是聚在一起取笑學妹，也喜歡一起挑戰校園的各種禁忌。畢竟是最後一年，青春就是要留下些讓人回想起來會心一笑的回憶，不是嗎？其中，最讓我們津津樂道的，便是班上那位安靜內向的女孩——綺婷。
                                                </p>
                                                <p>綺婷是一個瘦弱的女生，皮膚蒼白，幾乎不發一語，永遠坐在教室角落。每當放學後，其他人都回家了，她總會獨自留在教室裡，低著頭不知道在寫些什麼。我們這些心性未熟的男生見她這般奇怪，便將她當成班上的「幽靈」戲稱，並開始有意無意地捉弄她。
                                                </p>
                                                <p>有一天傍晚，我們忍不住好奇心，偷偷跑進教室，想一探她到底在寫什麼。桌上散亂的日記本映入眼簾，頁面上密密麻麻的筆跡寫滿了我們的名字，反覆地寫著，逐漸轉成歪曲的字體，夾雜著奇異的話語：「我會找到你們的……」「你們跑不掉……」那一刻，寒氣從腳底竄起，日記本被我們慌忙推倒，卻發現後面壓著一張泛黃的照片——那是我們與綺婷的合照，背後標註了「永別」。
                                                </p>
                                                <p>自從那天之後，我們這群人再也不敢單獨留下，總覺得身後有什麼東西追隨著自己。夜晚放學的時候，總覺得從教室角落有雙眼睛注視著我們，甚至在某些夜晚，我們各自的夢裡，總會夢見那條漆黑小徑的盡頭，站著一個模糊的影子——她朝著我們微笑，蒼白的臉上卻帶著詭異的扭曲。
                                                </p>
                                                <p>那年畢業後，班上流傳著綺婷不再來學校的傳言。有人說她已經轉學，有人說她只是厭倦了學校，但我們幾個人心裡都知道，她在我們身邊——只是已經不再是那個活生生的女孩。</p>
                                                <p>多年後，我們回到母校重聚，卻驚愕地在走廊盡頭的公告板上，見到當年那張泛黃的照片，依舊貼在角落，而照片中的我們，眼神變得空洞，彷彿靈魂已經隨著某個夜晚的記憶一同消失。我們每個人都知道，無論時光如何流逝，綺婷依舊在我們身後，冷冷地注視著，等待著那遲到的悔意。
                                                </p>
                                            </div>
                                            <a href="">繼續閱讀</a>
                                        </div>
                                        <div className="share-link">
                                            <figure><img src="/images/Story/feature-story-line.png" alt="裝飾線條" /></figure>
                                            <ul className="share-icon">
                                                <li><a href="#"><img src="/images/Story/icon-sharelink.png" alt="Share Link" /></a></li>
                                                <li><a href="#"><img src="/images/Story/icon-twitter.png" alt="Twitter" /></a></li>
                                                <li><a href="#"><img src="/images/Story/icon-fb.png" alt="Facebook" /></a></li>
                                                <li><a href="#"><img src="/images/Story/icon-line.png" alt="Line" /></a></li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </section>
                            <div className="story-collection">

                                {/* 鄉野奇談 */}
                                <section className="countryside-story">
                                    <div className="countryside-story-title"><img src="/images/Story/title-countryside-story.png" alt="鄉野奇談" /></div>
                                    <div className="flying-papersblack"><img src="/images/Story/flyingpapersblack1920-2.png" alt="飛散紙張" /></div>
                                    <div className="tree"><img src="/images/Story/branches.png" alt="樹枝背景" /></div>
                                </section>
                                <div className="taiwan-stories">
                                    {/* 故事集 */}
                                    <section className="story-grid">

                                        {/* 紅衣小女孩 */}
                                        <article className="story-item">
                                            <div className="red-girl-container">
                                                <div className="red-girl-text">
                                                    <div className="red-girl-title">
                                                        <h3>紅<span>衣小女孩</span></h3>
                                                    </div>
                                                    <div className="red-girl-text">
                                                        <p>紅衣小女孩是台灣最著名的都市傳說之一，常出現在荒郊、山區或偏僻的廢墟。據說她身穿紅色連衣裙，臉色蒼白，帶著詭異的笑容。她的身影被認為帶來不祥與恐懼，許多人描述見到她後會接連遭遇厄運、甚至意外身亡。
                                                        </p>
                                                        <p>這個傳說源於一則流傳的錄影，錄像中有登山者意外捕捉到她的影像，她跟隨在人群後方，彷彿靜靜地注視著每個人，卻沒有人注意到她的存在。傳說她可能是冤死之魂，或是因仇怨未解、被迫滯留人間的亡魂。無論她的來歷真相為何，紅衣小女孩的故事反映了人們對未知的恐懼，也成為台灣文化中無法抹去的靈異符號。
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </section>

                                    {/*   黃色小飛俠 */}
                                    <section className="story-grid">
                                        <article className="story-item2">
                                            <div className="yellow-peter-pan-container">
                                                <div className="yellow-peter-pan">
                                                    <div className="yellow-peter-pan-title">
                                                        <h3>黃<span>色小飛俠</span></h3>
                                                        <div className="yellow-peter-pan-text">
                                                            <p>黃色小飛俠，又稱玉山小飛俠，是台灣登山客間流傳的靈異傳說。
                                                                據說，迷失方向的旅人若在霧濛濛的山路遇上三個披著黃色雨衣、戴著斗笠的人，千萬別輕易相信他們。</p>
                                                            <p>這三人面無表情，臉龐籠罩在斗笠陰影下，看不清五官，也從不說話。當旅人急切地詢問回程路徑時，他們只是默默地舉起手，指向同一方向。迷途者若跟隨前行，走著走著，待霧氣逐漸散開，卻常發現自己置身在懸崖邊緣，僅一步之遙便是深不見底的危險。
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </section>

                                    {/* 宮燈姐姐  */}
                                    <section className="story-grid">
                                        <article className="story-item3">
                                            <div className="lantern-sister-container">
                                                <div className="lantern-sister">
                                                    <div className="lantern-sister-title">
                                                        <h3>宮<span>燈姐姐</span> </h3>
                                                        <div className="lantern-sister-text">
                                                            <p>傳說中，宮燈姐姐原本也是淡江大學的學生，她跟一個男學生交往時受到父母反對，因此打算私奔，可是到了約定好的時間時，卻遲遲等不到男方的出現，以為自己被拋棄的她傷心之餘、在約定地點的宮燈大道第三盞路燈下自殺結束了生命，但在那之後，開始會有學生在午夜十二點經過那個地點時，被不知名的美麗女子搭話詢問時間，如果學生回頭或回答的話，往往會發現身後沒有人、或是回神過來時發現自己在那個地點昏睡了一整晚，有人認為是當初那個女學生的靈魂至今仍徘徊在那裡，等待男方的出現。
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </section>

                                    {/* 山羊人 */}
                                    <section className="story-grid">
                                        <article className="story-item4">
                                            <div className="goat-man-container">
                                                <div className="goat-man-title">
                                                    <h3>山<span>羊人</span> </h3>
                                                    <div className="goat-man-text">
                                                        <p>山羊人，是台灣達悟族傳說中的怪人，會施展強大的法術。
                                                            山羊人住在山裡，是個有著羊頭人身的怪人，雖然長相畸形，但他擁有相當強大的法力，曾經有兩個紅頭部落的人想把他抓回部落，結果一個人肩頸莫名腫起來、另一個人則是頭被徹底扭到後面；另外，山羊人也會施展法術讓死人五天後起死回生，這不僅讓跟隨他的氏族人口增長快速，甚至還一度被伊萬特人請去巴丹島復活夭折的孩子，並得到兩個金塊做為報酬。
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </section>
                                </div>
                            </div>
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
                <Route path="/Forum" element={<Forum />} />
                <Route path="/Map" element={<Map />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
        </>
    );
};;

