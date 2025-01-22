const articles = [
  {
    id: 1,
    commentCount: 0,
    comments: [], // 留言內容初始化為空
    category: "都市傳說",
    createdAt: "2025-01-01T12:30:00Z", // 發文時間
    authorName: "韭把刀",
    authorAvatar: "images/Forum/at/1-1.png",
    title: "那些年，一起追我們的女孩",
    preview: "我們高中時期那片校園，有著綠意盎然的操場、隨風搖曳的櫻花道、破舊的教室樓，和一片漆黑的後山小徑。說是漆黑，並非真的因為陰暗，實際上那裡的路燈早已壞掉，但總有人說，即使是白晝，那片小徑也讓人不寒而慄。高三那一年，我們幾個臭味相投的好友，總是聚在一起取笑學妹，也喜歡一起挑戰校園的各種禁忌。畢竟是最後一年，青春就是要留下些讓人回想起來會心一笑的回憶，不是嗎？其中，最讓我們津津樂道的，便是班上那位安靜內向的女孩——綺婷。綺婷是一個瘦弱的女生，皮膚蒼白，幾乎不發一語，永遠坐在教室角落。每當放學後，其他人都回家了，她總會獨自留在教室裡，低著頭不知道在寫些什麼。我們這些心性未熟的男生見她這般奇怪，便將她當成班上的「幽靈」戲稱，並開始有意無意地捉弄她。有一天傍晚，我們忍不住好奇心，偷偷跑進教室，想一探她到底在寫什麼。桌上散亂的日記本映入眼簾，頁面上密密麻麻的筆跡寫滿了我們的名字，反覆地寫著，逐漸轉成歪曲的字體，夾雜著奇異的話語：「我會找到你們的……」「你們跑不掉……」那一刻，寒氣從腳底竄起，日記本被我們慌忙推倒，卻發現後面壓著一張泛黃的照片——那是我們與綺婷的合照，背後標註了「永別」。自從那天之後，我們這群人再也不敢單獨留下，總覺得身後有什麼東西追隨著自己。夜晚放學的時候，總覺得從教室角落有雙眼睛注視著我們，甚至在某些夜晚，我們各自的夢裡，總會夢見那條漆黑小徑的盡頭，站著一個模糊的影子——她朝著我們微笑，蒼白的臉上卻帶著詭異的扭曲。那年畢業後，班上流傳著綺婷不再來學校的傳言。有人說她已經轉學，有人說她只是厭倦了學校，但我們幾個人心裡都知道，她在我們身邊——只是已經不再是那個活生生的女孩。多年後，我們回到母校重聚，卻驚愕地在走廊盡頭的公告板上，見到當年那張泛黃的照片，依舊貼在角落，而照片中的我們，眼神變得空洞，彷彿靈魂已經隨著某個夜晚的記憶一同消失。我們每個人都知道，無論時光如何流逝，綺婷依舊在我們身後，冷冷地注視著，等待著那遲到的悔意。",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/1.jpg",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 20,
        altText: "like"
      },// 按讚數
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },// 留言數
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 600, altText: "label"
      }, // 收藏數
    ],
  },
  {
    id: 2,
    commentCount: 0,
    comments: [], 
    category: "廢墟探險",
    createdAt: "2025-01-02T12:30:00Z", // 發文時間
    authorName: "藤森月子",
    authorAvatar: "images/Forum/Tsukiko-Fujimori.png",
    title: "[民雄鬼屋] 充滿傳說的一口古井！",
    preview:
      "最近看了電影《民雄鬼屋》的影評和預告，越來越對這座充滿靈異傳說的老宅感興趣！聽說這裡最詭異的是院子裡那口古井，據說晚上會聽到低語聲，還有人看到奇怪的影像映在水面上。更毛的是，這棟鬼屋就位在民雄義檢山墳場附近，難怪傳聞說這裡怨氣特別重。有人說這口井曾是女主人輕生的地方，從此成了陰陽交界的入口，也難怪這麼多靈異故事圍繞著它。好想親自去看看，但又有點怕會碰到什麼不乾淨的東西...你們有去過民雄鬼屋嗎？對這些傳說有什麼看法，或聽過更多恐怖故事？一起來分享吧！",
    isFavorite: false,
    articleImage: "images/Forum/at/2.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 2,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 78, altText: "label"
      },
    ],
  },
  {
    id: 3,
    commentCount: 0,
    comments: [], 
    category: "恐怖獵奇",
    createdAt: "2025-01-03T12:30:00Z", // 發文時間
    authorName: "光",
    authorAvatar: "images/Forum/at/3-1.png",
    title: "每次回老家過夜都會噩夢",
    preview:
      "從小就是麻瓜，無病無災的長大，唯一一次靈異經驗就是剛出社會租到有飄的房子，導致體質有些改變，每個晚上都會靈魂出體被鬼追，或是預知夢，覺得太恐怖，後來求大廟神明幫我切掉網路線，自此就減少靈魂出體的次數了。 隨著健身、多接觸大自然，我也很久沒有噩夢或是靈魂出體。但目前狀況是，每幾週回台中老家過夜，就會噩夢，噩夢內容感受到故意要讓我害怕，本來每次都害怕，進階到看到無感，我只要趁碰到我前醒來就好，因我不怕，飄夢就變得更出其不意嚇我，比如變成家人突然獸性大發咬你，或是挖掘我內心最怕的事件。醒來後，我很憤怒，這明明是我家欸，為啥睡自己家還會噩夢，明明離鄉工作前也睡得好好的。房間平常是我妹妹在住的，並不是無人氣的狀態，工作住處也很少做夢，請問是老家不乾淨嗎？還是有什麼原因呢？",
    isFavorite: false,
    articleImage: "images/Forum/at/3.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 5,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 2, altText: "label"
      },
    ],
  },
  {
    id: 4,
    commentCount: 0,
    comments: [], 
    createdAt: "2025-01-04T12:30:00Z", // 發文時間
    category: "恐怖作品",
    authorName: "轉空",
    authorAvatar: "images/Forum/at/4-1.png",
    title: "讓人著迷又微驚悚的SCP",
    preview:
      "其實從去年開始，甚至更久以前，就有聽過關於SCP基金會相關的東西了。  不過因為內容過於複雜，所以沒有特別深入去瞭解。  直到今年，YouTube上有一名YouTuber翻譯並拍攝了一系列的SCP介紹影片，讓我瘋狂的愛上這系列的東西。  SCP基金會是是一個記載了大量關於各種超常現象的個體和事件的一系列虛構作品。  創作的人涵蓋全球，是一個大型的共同創作，任何人都可以去申請把自己寫的SCP加入進去。  scp從一個被貼在外國超自然網站的文章，變成現在的如此規模，真的很讓人驚奇。",
    isFavorite: false,
    articleImage: "images/Forum/at/4.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 6,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 78, altText: "label"
      },
    ],
  },
  {
    id: 5,
    commentCount: 0,
    comments: [], 
    category: "驅邪收驚",
    createdAt: "2025-01-05T12:30:00Z", // 發文時間
    authorName: "迷路的貓",
    authorAvatar: "images/Forum/at/5-1.png",
    title: "鬼壓床還是被跟上了？求解！",
    preview:
      "第一次發文，各位，我最近好像遇到不乾淨的東西……事情發生在上個月，我去南部的民宿住了一晚。半夜突然醒來，發現動不了，感覺像有人壓在我身上，耳邊還聽到低沉的呼吸聲！我以為是鬼壓床，逼自己冷靜下來，終於過了幾分鐘才恢復行動，但奇怪的是，回家後這種現象卻不斷發生。每次都是半夜三點左右，感覺房間裡有個影子，甚至還會隨著我移動。想問問大家，我這是被跟上了嗎？該怎麼處理？。",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/5.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 7,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 60, altText: "label"
      },
    ],
  },
  {
    id: 6,
    commentCount: 0,
    comments: [], 
    category: "都市傳說",
    createdAt: "2025-01-06T12:30:00Z", // 發文時間
    authorName: "莉莉安",
    authorAvatar: "images/Forum/at/6-1.png",
    title: "鬼月半夜騎機車遇到「多出來的手」",
    preview: "鬼月的時候我習慣早點回家，不過那天有點晚了，得一個人騎機車從偏僻的山路回家。騎到一半，突然覺得肩膀一沉，像是多了什麼重量。我心裡一驚，不敢回頭，繼續硬著頭皮騎。可是越騎越不對勁，總感覺有「手」從我腰間慢慢攀上來，像是要抱住我。回到家之後，我嚇到渾身冒冷汗，回頭看機車後座，什麼都沒有。聽說鬼月的時候騎車真的會遇到這種事，不知道有沒有人也有過類似經歷？怎麼防範啊？",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/6.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 8,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 67, altText: "label"
      },
    ],
  },
  {
    id: 7,
    commentCount: 0,
    comments: [], 
    category: "都市傳說",
    createdAt: "2025-01-07T12:30:00Z", // 發文時間
    authorName: "暗影守望者",
    authorAvatar: "images/Forum/at/7-1.png",
    title: "公司廁所半夜傳來的低語聲……",
    preview: "我在一間科技公司上班，平常加班到很晚。幾天前晚上十一點左右，整層辦公室只剩我一人。我去廁所洗手，忽然聽到一種微弱的低語聲，像是有人在隔壁隔間自言自語。我還以為是別的同事沒回去，就隨口問了一句：「還沒下班啊？」但隔壁的聲音立刻停了下來，一片死寂。當時有種異樣的恐懼從背後升起，我連水都沒關就逃出去了。後來問同事們，沒人那晚留下來過。大家有聽過公司廁所鬧鬼的故事嗎？這會不會是什麼不好的預兆？",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/7.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 11,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 60, altText: "label"
      },
    ],
  },
  {
    id: 8,
    commentCount: 0,
    comments: [], 
    category: "都市傳說",
    createdAt: "2025-01-08T12:30:00Z", // 發文時間
    authorName: "黑夜行者",
    authorAvatar: "images/Forum/shadowwatcher.png",
    title: "深夜在山區遇見「沒有臉」的登山者",
    preview: "和朋友去宜蘭的山區露營，結果遇到非常詭異的事。那天晚上十點左右，我去帳篷外走動，正準備回去時看到一個穿著藍色風衣的人正往我們的營地走來。因為太晚了，我覺得有點奇怪，於是多看了幾眼。他走到靠近篝火的地方，我才發現他的臉……是空的！就像一團模糊的影子，完全沒有五官。當我想要喊朋友的時候，他已經轉身離開，走向樹林深處了。我當場嚇到全身僵住，後來回帳篷跟朋友講，他們也覺得不可思議。有人知道這是什麼靈異現象嗎？有經驗的大神請指教！",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/8.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 3,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 8, altText: "label"
      },
    ],
  },
  {
    id: 9,
    commentCount: 0,
    comments: [], 
    category: "都市傳說",
    createdAt: "2025-01-09T12:30:00Z", // 發文時間
    authorName: "暗夜守望者",
    authorAvatar: "images/Forum/at/9-1.png",
    title: "鬧鬼工廠的不尋常聲音！發現奇怪的符號",
    preview: "那天晚上我和兩個朋友決定去看看網上流傳的這間鬧鬼工廠。據說這裡以前發生過意外，之後工廠就荒廢了，很多人說夜晚時能聽到不尋常的聲音。我們大概晚上11點左右到達，手電筒微弱的光照著破損的牆壁和散落的機械零件，氣氛異常詭異。才剛走進去沒多久，我們就聽到一種低沉的聲音，像是有人在悄悄說話，又像是風吹過斷裂的金屬片。聲音忽遠忽近，聽起來像是咒語，我朋友嚇得立刻拉住我想走，但我還是想確認一下。我們鼓起勇氣往聲音傳來的方向走，直到發現一堵牆上畫滿了符號。那些符號像是某種道教的符咒，字跡歪歪扭扭，雖然看起來有點久遠但看得出有些是用紅色顏料寫的。看到這場景的那一瞬間，我們全都愣住了，寒意從腳底竄上背脊。我不知道那些符號是誰畫的，也不敢確定它們是否真有驅邪或招靈的作用。當時我們不敢再多做停留，立刻逃出了工廠。事後越想越不對勁，現在還在猶豫該不該去查查那些符號的意義……有沒有人也去過那裡？是否有見過那些奇怪的符號？希望有懂符咒的大大可以分享一些見解。",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/9.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 2,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 9, altText: "label"
      },
    ],
  },
  {
    id: 10,
    commentCount: 0,
    comments: [], 
    category: "都市傳說",
    createdAt: "2025-01-10T12:30:00Z", // 發文時間
    authorName: "模糊獵人",
    authorAvatar: "images/Forum/at/10-1.png",
    title: "第一次發文，想跟大家分享我上週在嘉義一間廢棄工廠探險的恐怖經歷...",
    preview: "第一次發文，想跟大家分享我上週在嘉義一間廢棄工廠探險的恐怖經歷...我一直對廢墟探險很感興趣，上週和幾個朋友一起去了嘉義一處荒廢多年的工廠，據說以前是製造某種化學產品的地方，後來因為一次意外就廢棄了。當地人說這裡晚上很「不乾淨」，但我們幾個都不信邪，打算親自探個究竟。當天晚上 11 點左右，我們帶著手電筒和相機進入工廠。剛開始氣氛還算輕鬆，大家嘻嘻哈哈地拍照，但隨著往裡面走，感覺越來越詭異。工廠裡滿是破碎的窗戶、倒塌的牆壁，地上還散落著生鏽的器具和一些不知名的文件，空氣中充滿一種霉味和金屬味。就在我們走到一個類似辦公室的房間時，我突然聽見低低的聲音，像是有人在竊竊私語，但四周根本沒其他人！我問朋友們有沒有聽到什麼，他們也說好像有奇怪的聲音。當時氣氛瞬間凝固，大家都不敢說話，手電筒的光線在牆上晃動，讓人越看越心慌。更恐怖的是，我們剛準備離開時，竟然聽見那聲音變得清晰了一些，像是有人用氣音在說「走開...」。我全身汗毛瞬間豎起，拔腿就跑，其他人也沒回頭，直接衝出工廠。後來我們回到車上，誰都不敢再說話，直到開出很遠才有人提起剛剛的事。大家的描述竟然都一樣：那聲音很低很輕，像是從四面八方傳來，彷彿要我們快離開那裡。這幾天想起來還是覺得毛骨悚然，感覺那地方不只是荒廢那麼簡單。你們有過類似的經歷嗎？還是知道其他關於嘉義廢墟的傳說？留言分享一下吧！",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/10.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 5,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 10, altText: "label"
      },
    ],
  },
  {
    id: 11,
    commentCount: 0,
    comments: [], 
    category: "廢墟探險",
    createdAt: "2025-01-11T12:30:00Z", // 發文時間
    authorName: "暗影探險家",
    authorAvatar: "images/Forum/at/11-1.png",
    title: "廢棄多年的精神病院，竟記載「某名病患聲稱被鬼附身」",
    preview: "上週末，我和兩位朋友決定挑戰附近一座被廢棄多年的精神病院。這裡據說是「最鬧鬼的地方」，曾經有醫護人員和病患在一場火災中不幸罹難。當我們晚上11點到達時，四周靜得只能聽見自己的呼吸聲。打開手電筒，昏黃的光照在塵封的牆壁上，竟然能看到還殘留著當年的火災痕跡。探索到二樓時，我突然聽到樓下傳來腳步聲，像是有人在地板上走動。我們立刻停下腳步，屏住呼吸，心跳幾乎快跳出喉嚨！那聲音持續了約十秒後戛然而止。之後，我們在一間診療室裡發現了幾份舊檔案，竟然記載著「某名病患聲稱被鬼附身」的紀錄。離開後，我還是忍不住感到心驚膽戰。如果你也有膽量，或許可以去那裡探訪，但請做好心理準備，因為那裡似乎並不歡迎外人。",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/11.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 10,
        altText: "like"
      },// 按讚數
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },// 留言數
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 600, altText: "label"
      }, // 收藏數
    ],
  },
  {
    id: 12,
    commentCount: 0,
    comments: [], 
    category: "廢墟探險",
    createdAt: "2025-01-12T12:30:00Z", // 發文時間
    authorName: "遺跡獵人",
    authorAvatar: "images/Forum/at/12-1.png",
    title: "荒廢遊樂園的鬼影之夜",
    preview:
      "你敢在晚上進入一個荒廢的遊樂園嗎？在我大學的時候，我和幾個好友挑戰了這個極限。傳說這裡因為一次設備故障導致多人死亡，從此荒廢。當我們穿過被鐵鍊封鎖的大門時，整個遊樂園被雜草和鏽跡佔據。月光下的摩天輪如同一個巨大的骷髏，靜靜注視著我們。在鬼屋的入口，我們的手電筒突然閃爍不定。走進去後，裡面是一片死寂，但卻能聽到遠處傳來隱約的笑聲。我試著用手機拍照，卻發現照片中出現了一個模糊的人影，而現場根本沒有其他人。最後我們不敢多停留，迅速離開了這個地方。但那張照片至今仍讓我不寒而慄。或許，這裡的居民真的不希望被打擾吧。",
      isFavorite: false, // 是否收藏
    articleImage: "images/Forum/at/12.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 9,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 78, altText: "label"
      },
    ],
  },
  {
    id: 13,
    commentCount: 0,
    comments: [], 
    category: "都市傳說",
    createdAt: "2025-01-13T12:30:00Z", // 發文時間
    authorName: "幻影追尋者",
    authorAvatar: "images/Forum/shadowwatcher.png",
    title: "午夜電梯：通往不存在的樓層",
    preview: "在許多都市傳說中，電梯似乎總是承載著某種不可解釋的神秘。今天我要分享的是一個來自朋友的親身經歷，關於一座商辦大樓中的「不存在的樓層」。我的朋友阿杰是一名加班狂人，他經常待到深夜才離開公司。有一次，他加班到接近凌晨，整棟大樓幾乎只剩下他一個人。他疲憊地走進電梯，按下了一樓的按鈕準備回家，但就在電梯關門的瞬間，他注意到面板上有個按鈕微微發著紅光，上面寫著「B13」。阿杰感到疑惑，因為這棟大樓並沒有地下13樓的設計。他好奇地按了下去，電梯隨即開始緩緩下降。到了「B13」樓層時，門打開了，他看到了一個昏暗、冷清的走廊，地上滿是塵埃，似乎很久沒有人踏足。雖然內心感到不安，但阿杰禁不住好奇心，決定走進去一探究竟。走廊兩側的房間門都緊閉著，但他聽到了一些奇怪的聲音——像是低語，又像是哭泣。他越走越遠，直到一扇門後突然傳來猛烈的敲擊聲。驚恐之下，他迅速轉身跑回電梯，但發現「B13」按鈕的紅光已經熄滅，怎麼按也無法再回到那層樓。事後，他把這件事告訴了大樓的管理員，對方臉色大變，只說了一句：「我們這裡從來沒有什麼地下13樓。」從那天起，阿杰再也不敢在那棟大樓加班到太晚。這個故事雖然聽起來像是都市傳說，但我相信每個人都有可能遇到那種不屬於我們世界的空間。你，會有勇氣按下那個不存在的按鈕嗎？",
    articleImage: "images/Forum/at/13.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 8,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 8, altText: "label"
      },
    ],
  },

  {
    id: 14,
    commentCount: 0,
    comments: [], 
    category: "廢墟探險",
    createdAt: "2025-01-14T12:30:00Z", // 發文時間
    authorName: "迷失旅人",
    authorAvatar: "images/Forum/at/14-1.png",
    title: "廢棄車站的詭異音響",
    preview:
      "一個寒冷的冬夜，我和兩位好友來到了郊區的一座廢棄車站探險。這座車站曾經是重要的交通樞紐，但因經濟衰退而被棄置了數十年。進入車站時，我們驚訝地發現，牆壁上還貼著當年的時刻表，而椅子上甚至遺留了一本發黃的舊報紙。探索到月台時，我聽到遠處傳來火車的聲音，但當我轉身看去，軌道上卻空無一物。這種聲音間歇性地出現，好像真的有一列看不見的火車正穿越這裡。當我們準備離開時，我突然感覺肩膀被輕輕拍了一下，回頭卻什麼也沒看到。朋友們說他們什麼都沒感覺到，但我的心中卻留下了無法解釋的疑惑。如果你有膽量，不妨來這裡聽聽那詭異的火車聲，或許你也能體會到那份不可言說的恐懼。",
    articleImage: "images/Forum/at/14.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 7,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 2, altText: "label"
      },
    ],
  },
  {
    id: 15,
    commentCount: 0,
    comments: [], 
    category: "恐怖獵奇",
    createdAt: "2025-01-15T12:30:00Z", // 發文時間
    commentCount: 465,
    authorName: "靈異蒐集家",
    authorAvatar: "images/Forum/at/15-1.png",
    title: "消失的左腳鞋：都市傳說還是真實事件？",
    preview:
      "你是否聽過「消失的左腳鞋」這個故事？據說在一些被認為不乾淨的地方，人們經常會發現散落的左腳鞋，卻怎麼也找不到右腳鞋。有人認為，這些鞋是死者的遺物，被某種無法解釋的力量丟棄在那裡，也有人說，這其實是惡靈的警告，叫人不要靠近。我親身經歷過一次類似的事件。在一個老舊的地下室裡，我和朋友發現了十幾雙左腳鞋堆積在角落，其中一些鞋款甚至可以追溯到幾十年前。當我們準備拍照時，我的相機竟然自動關機，手機也無法使用。更詭異的是，當我們走出地下室後，我竟然發現自己的左腳鞋鞋帶鬆了，好像有人特意解開了一樣。這件事後，我對這些都市傳說多了一層敬畏，或許它們並不是純粹的虛構，而是背後隱藏著一些尚未解明的真相。",
    articleImage: "images/Forum/at/15.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 6,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 78, altText: "label"
      },
    ],
  },
  {
    id: 16,
    commentCount: 0,
    comments: [], 
    category: "恐怖獵奇",
    createdAt: "2025-01-16T12:30:00Z", // 發文時間
    authorName: "黑暗檔案",
    authorAvatar: "images/Forum/at/16-1.png",
    title: "死亡時鐘：能預測死亡的詭異裝置",
    preview:
      "在某些靈異論壇上流傳著「死亡時鐘」的故事。據說這種裝置可以準確預測一個人的死亡時間，有人聲稱它是來自不明來源的詛咒物品，使用者必須付出相應的代價。我的朋友阿哲曾經親眼見過這樣的時鐘。他說，在一次跳蚤市場上，有位老人低價出售一個古老的鐘錶，並聲稱它能「看見未來」。出於好奇，阿哲買下了它，並將它放在自己的書房裡。奇怪的是，每當他注視這個時鐘的指針時，耳邊就會聽到低聲的呢喃。幾天後，他發現時鐘上竟然出現了一串日期與時間，而這個時間與他的一位好友意外身亡的時間完全吻合。後來，阿哲害怕繼續使用這個詭異的時鐘，便將它扔進了河裡，但有傳言說，這種時鐘永遠無法被銷毀，總會以某種形式回到人們的手中。你會願意冒險去找這樣的裝置嗎？",
    articleImage: "images/Forum/at/16.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 5,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 60, altText: "label"
      },
    ],
  },

  {
    id: 17,
    commentCount: 0,
    comments: [], 
    category: "恐怖作品",
    createdAt: "2025-01-17T12:30:00Z", // 發文時間
    authorName: "午夜書迷",
    authorAvatar: "images/Forum/Lillian.png",
    title: "解析經典恐怖小說《鬼燈的誘惑》",
    preview: "近年來，恐怖小說逐漸受到廣大讀者的喜愛，而《鬼燈的誘惑》無疑是一部無法忽視的經典之作。這部作品的作者用細膩的筆觸描繪了一個充滿詭異氛圍的小鎮，當地居民依賴一種名為「鬼燈」的神秘燈火，但每逢燈滅，就會有一人失蹤。故事的主角是一位外地來的年輕記者，因為調查失蹤事件而深陷其中。全書的恐怖氛圍主要來自對細節的描寫，比如燈光在雨夜中的搖曳、窗外隱約可見的人影，甚至是角色內心的不安感。結局揭示了鬼燈的真相：它是來自另一個世界的通道，通過它，失蹤的人們被「接走」。這部小說令人讀來毛骨悚然，也讓人深思人性中對未知的恐懼。如果你是恐怖作品的愛好者，這部作品絕對值得一讀！",
    articleImage: "images/Forum/at/17.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 4,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 67, altText: "label"
      },
    ],
  },
  {
    id: 18,
    commentCount: 0,
    comments: [], 
    category: "都市傳說",
    createdAt: "2024-12-31T12:30:00Z", // 發文時間
    authorName: "迷霧觀察者",
    authorAvatar: "images/Forum/at/18-1.png",
    title: "人影湖：午夜倒影中的詭異真相",
    preview: "人影湖是我家鄉一個傳說已久的地方，據說深夜站在湖邊，你能在水面上看到自己的倒影。但恐怖的是，那個倒影不一定會和你的動作一致。我們這群朋友從小就聽過這個傳說，但從沒有人真正見過。直到某個暑假的晚上，我們決定親自一探究竟。那天晚上，我們帶著手電筒和幾罐啤酒，笑笑鬧鬧地來到了湖邊。湖水在月光下顯得格外平靜，彷彿鏡子一般。我們幾個人圍著湖站成一圈，往水面上看。起初一切正常，我們的倒影都和我們的動作完全一致。直到其中一位朋友阿明突然說：「等等，你們看我的倒影，它好像在……笑？」我們仔細一看，果然，他的倒影嘴角露出了一抹詭異的笑容，而阿明本人則是一臉困惑，完全沒有在笑！我們瞬間慌了，開始四處張望，感覺湖邊的空氣越來越冷。就在我們準備離開的時候，湖面突然起了一陣漣漪，所有的倒影都消失了，緊接著水裡傳來了一陣低語聲，像是有人在輕聲叫著我們的名字。我們不敢多想，拔腿就跑回了村子。後來，村裡的長輩告訴我們，人影湖確實有些「不乾淨」，據說很久以前有個人投湖自盡，從此他的靈魂就一直徘徊在湖面，專門模仿活人的動作，試圖拉人下水。我們慶幸自己那晚及時逃走，但那詭異的倒影和低語聲，至今仍讓我不寒而慄。",
    articleImage: "images/Forum/at/18.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 4,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 8, altText: "label"
      },
    ],
  },
  {
    id: 19,
    commentCount: 0,
    comments: [], 
    category: "恐怖作品",
    createdAt: "2024-12-30T12:30:00Z", // 發文時間
    authorName: "黑暗電影人",
    authorAvatar: "images/Forum/at/19-1.png",
    title: "不容錯過的恐怖電影《深夜來電》",
    preview: "如果你喜歡帶有心理懸疑的恐怖片，那麼《深夜來電》絕對能滿足你的需求。這部電影的劇情圍繞著一位獨居的年輕女子展開，她某天晚上接到了一通陌生電話，對方聲稱是她的「未來自我」，並警告她千萬不要離開家門。電影的恐怖點在於逐漸揭示的真相，以及電話另一頭聲音的不自然音質，讓人不寒而慄。尤其是當主角無法抵擋好奇心而走出家門時，觀眾會隨之陷入一場驚悚的漩渦。結局令人意想不到，但又令人細思極恐——它挑戰了觀眾對時間和現實的認知。如果你是心理驚悚的愛好者，這部電影絕對不要錯過！",
    articleImage: "images/Forum/at/19.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 2,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 60, altText: "label"
      },
    ],
  },
  {
    id: 20,
    commentCount: 0,
    comments: [], 
    category: "驅邪收驚",
    createdAt: "2024-12-29T12:30:00Z", // 發文時間
    authorName: "古法守護者",
    authorAvatar: "images/Forum/shadowwatcher.png",
    title: "收驚儀式的由來與重要性",
    preview: "收驚是一種流傳已久的民間習俗，主要用於幫助受驚嚇的人穩定情緒，驅除外在的負面影響。這種習俗起源於古代，當時的人們相信，人在受到驚嚇時，魂魄可能會離開身體，導致精神恍惚或身體不適。儀式通常由專業的收驚師進行，他們會使用香火、紙錢和符咒等物品，在特定時間內完成儀式過程。一些地方還會搭配唸誦咒語或唱歌來召回被驚嚇的魂魄。我曾親眼見過一次完整的收驚儀式，當時是一個孩子被狗嚇到，整晚哭鬧不止。經過收驚後，孩子明顯安靜了許多，似乎真的得到了安撫。不論你是否相信這些習俗，它至少為人們提供了一種心理上的慰藉，也反映了我們文化中的深層信仰與智慧。",
    articleImage: "images/Forum/at/20.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 3,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 8, altText: "label"
      },
    ],
  },
  {
    id: 21,
    commentCount: 0,
    comments: [], 
    category: "都市傳說",
    createdAt: "2024-12-28T12:30:00Z", // 發文時間
    authorName: "暗夜行者",
    authorAvatar: "images/Forum/at/21-1.png",
    title: "神秘的「午夜巴士」",
    preview: "「午夜巴士」的傳說在許多城市中都有不同的版本，但我想分享的是我親身經歷的一次怪事，至今讓我對深夜搭乘公車感到恐懼。那是幾年前的某個深夜，我因為加班錯過了最後一班正常公車，只能等待所謂的「深夜特班車」。當時我在一個人煙稀少的公車站等候，沒多久，一輛老舊的巴士緩緩駛來。奇怪的是，這輛車沒有路線號碼，車窗也被霧氣覆蓋，看不清裡面的情況。我猶豫了一下，還是上了車。一進車廂，我立刻感到一股寒意。車裡坐著幾個低頭不語的乘客，他們的表情僵硬，彷彿不屬於這個世界。我選了一個靠窗的座位坐下，試圖避免和其他人眼神接觸。巴士駛過了幾站，但奇怪的是，每次停靠時，只有車門開了，卻沒有人上下車。更令人不安的是，窗外的街景似乎在重複，像是我們一直在原地打轉。最終，我鼓起勇氣問司機：「這輛車到底開去哪裡？」司機沉默了一會，然後用低沉的聲音回答：「有些地方，你不該問。」這句話讓我全身發冷。幸運的是，當車子經過一個熟悉的地點時，我果斷按了下車鈴，衝下了車。站在路邊，我回頭望去，卻發現巴士消失在了濃霧中，彷彿從未存在過。後來，我聽人說過「午夜巴士」的傳說，據說它專門載著一些無法「安息」的靈魂，在城市的邊緣徘徊。我慶幸自己能夠全身而退，但那夜的記憶，成為我心中永遠的陰影。",
    articleImage: "images/Forum/at/21.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 2,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 10, altText: "label"
      },
    ],
  },
  {
    id: 22,
    commentCount: 0,
    comments: [], 
    category: "驅邪收驚",
    createdAt: "2024-12-27T12:30:00Z", // 發文時間
    authorName: "靈符傳人",
    authorAvatar: "images/Forum/at/22-1.png",
    title: "驅邪儀式的細節解析與親身經歷",
    preview: "驅邪這個詞在許多靈異愛好者的耳中已經不陌生了。它是傳統民間信仰中，為了解決人們遭遇到邪物侵擾、壞運氣纏身的情況而進行的儀式。這種儀式不僅涉及到宗教的信仰，更多時候還反映了人們對未知事物的恐懼與渴望掌控的心理。我第一次參與驅邪儀式，是因為朋友家中連續發生了許多怪事：深夜裡莫名其妙的敲門聲，家裡的植物無緣無故枯死，甚至小孩突然生病，醫生卻查不出原因。最後，他們請來了一位知名的驅邪師傅。儀式是在晚上九點開始的，師傅先是在大廳中央擺了一張供桌，上面放著供品、香爐和一道紅色的符咒。師傅口中唸唸有詞，隨後開始以柳枝沾著淨水在房間的每個角落撒灑。他還用雞血畫了一個「驅邪符」在門框上，據說這是用來阻擋外邪再次入侵的關鍵手段。最讓人感到毛骨悚然的是，儀式進行到一半時，家中的小孩突然開始無緣無故大哭，甚至喊出一些奇怪的話語，像是「離開我的房間」。師傅當時神情嚴肅地拿出一把銅錢劍，快速揮舞在孩子周圍，並大聲喝令「邪靈速退！」孩子瞬間安靜下來，似乎真的擺脫了什麼東西。儀式結束後，朋友家中的怪事就再也沒有發生過了。這次經歷讓我對驅邪儀式有了新的理解，或許它不僅僅是形式上的安慰，也可能真的有某種無法解釋的力量在運作。無論你是否相信，這些古老的習俗其實也承載了我們對生命與未知世界的敬畏。",
    articleImage: "images/Forum/at/22.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 2,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 9, altText: "label"
      },
    ],
  },
  {
    id: 23,
    commentCount: 0,
    comments: [], 
    category: "驅邪收驚",
    createdAt: "2024-12-26T12:30:00Z", // 發文時間
    authorName: "老街神秘人",
    authorAvatar: "images/Forum/at/23-1.png",
    title: "祖傳收驚術：一次神奇的重拾平靜",
    preview: "收驚作為驅邪的一部分，在民間一直扮演著重要角色。特別是對於容易受驚的孩子或經歷恐怖事件的成年人來說，這是一種有效且簡單的安撫方式。今天想分享的是我親眼見證的一次祖傳收驚術，這次經歷徹底顛覆了我對這些傳統習俗的看法。故事的主角是我的鄰居小梅，她在一次深夜外出時，因為目睹一場車禍，從此變得精神恍惚，總是感覺背後有人跟著她，甚至連睡覺都不安穩。她的家人試過看醫生，也請心理輔導，但效果有限。最後，她的奶奶決定試試家傳的收驚術。儀式在家中進行，奶奶先是在地上鋪了紅布，並準備了三炷香、一碗米、一面鏡子和一把剪刀。她將小梅叫到紅布中央坐下，並開始用手中的米繞著小梅的頭轉三圈，嘴裡唸著一些我聽不懂的方言咒語。接著，奶奶拿出鏡子，對著小梅的臉照了一下，然後迅速轉向門外，據說這是用來將驚嚇的魂魄「引回來」。最後，她用剪刀在紅布上比劃了幾下，象徵剪斷與邪物的連結。整個儀式大約進行了20分鐘，氣氛詭異但也讓人感到一絲莊重。儀式完成後，奶奶讓小梅喝了一口用香灰和淨水調製的「平安水」，並叮囑她當天晚上不能照鏡子。奇妙的是，第二天小梅就告訴我們，她感覺背後的陰影消失了，晚上也睡得很安穩。這次的經歷讓我開始思考，這些祖傳的習俗可能不僅僅是心理安慰，而是一種與自然或靈界溝通的特殊方式。它們雖然無法用科學解釋，但卻能在特定情況下，帶來讓人難以忽視的效果。",
    articleImage: "images/Forum/at/23.png",
    interactions: [
      {
        icon: "images/Forum/Forum_ghost.svg",
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 1,
        altText: "like"
      },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      {
        icon: "images/Forum/Forum_label.svg",
        filledIcon: "images/Forum/label-filled.svg",
        count: 10, altText: "label"
      }
    ]
  }

];

export default articles;