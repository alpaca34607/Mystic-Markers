const articles = [
  {
    id:1,
    category: "都市傳說",
    commentCount: 0,
    authorName: "模糊獵人",
    authorAvatar: "images/Forum/blur-hunter.svg",
    title: "親身經歷！那晚在荒廢的工廠聽見奇怪的低語聲",
    preview: "第一次發文，想跟大家分享我上週在嘉義一間廢棄工廠探險的恐怖經歷...",
    isFavorite: false, // 是否收藏
    articleImage: "images/Forum/hunter-article-picture.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 1502, 
        altText: "like" },// 按讚數
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },// 留言數
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 600, altText: "label" }, // 收藏數
    ]
  },
  {
    id:2,
    commentCount: 0,
    category: "廢墟探險",
    authorName: "藤森月子",
    authorAvatar: "images/Forum/Tsukiko-Fujimori.svg",
    title: "[民雄鬼屋] 充滿傳說的一口古井！",
    preview:
      "最近看到電影「民雄鬼屋」的影評和預告，覺得很感興趣，其實很多華人的靈異故事，都是從一口古宅的井開始說起，再加上地點位在民雄鄉義檢山墳場附近，",
    articleImage: "images/Forum/Tsukiko-Fujimori-text.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 102, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 78, altText: "label" }
    ]
  },
  {
    id:3,
    commentCount: 0,
    category: "恐怖獵奇",
    authorName: "光",
    authorAvatar: "images/Forum/light.svg",
    title: "每次回老家過夜都會噩夢",
    preview:
      "從小就是麻瓜，無病無災的長大，唯一一次靈異經驗就是剛出社會租到有飄的房子，導致體質有些改變，每個晚上都會靈魂出體被鬼追，或是預知夢，覺得太恐怖，後來求大廟神明幫我切掉網路線，自此就減少靈魂出體的次數了。 隨著健身、多接觸大自然，我也很久沒有噩夢或是靈魂出體。但目前狀況是，每幾週回台中老家過夜，就會噩夢，噩夢內容感受到故意要讓我害怕，本來每次都害怕，進階到看到無感，我只要趁碰到我前醒來就好，因我不怕，飄夢就變得更出其不意嚇我，比如變成家人突然獸性大發咬你，或是挖掘我內心最怕的事件。醒來後，我很憤怒，這明明是我家欸，為啥睡自己家還會噩夢，明明離鄉工作前也睡得好好的。房間平常是我妹妹在住的，並不是無人氣的狀態，工作住處也很少做夢，請問是老家不乾淨嗎？還是有什麼原因呢？",
    articleImage: "images/Forum/Tsukiko-Fujimori-text.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 304, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 2, altText: "label" }
    ]
  },
  {
    id:4,
    commentCount: 0,
    category: "恐怖作品",
    commentCount: 465,
    authorName: "轉空",
    authorAvatar: "images/Forum/Turn-short.svg",
    title: "讓人著迷又微驚悚的SCP",
    preview:
      "其實從去年開始，甚至更久以前，就有聽過關於SCP基金會相關的東西了。  不過因為內容過於複雜，所以沒有特別深入去瞭解。  直到今年，YouTube上有一名YouTuber翻譯並拍攝了一系列的SCP介紹影片，讓我瘋狂的愛上這系列的東西。  SCP基金會是是一個記載了大量關於各種超常現象的個體和事件的一系列虛構作品。  創作的人涵蓋全球，是一個大型的共同創作，任何人都可以去申請把自己寫的SCP加入進去。  scp從一個被貼在外國超自然網站的文章，變成現在的如此規模，真的很讓人驚奇。",
    articleImage: "images/Forum/Turn-empty-article.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 62, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 78, altText: "label" }
    ]
  },
  {
    id:5,
    commentCount: 0,
    category: "驅邪收驚",
    authorName: "迷路的貓",
    authorAvatar: "images/Forum/lost-cat.svg",
    title: "鬼壓床還是被跟上了？求解！",
    preview:
      "第一次發文，各位，我最近好像遇到不乾淨的東西……事情發生在上個月，我去南部的民宿住了一晚。半夜突然醒來，發現動不了，感覺像有人壓在我身上，耳邊還聽到低沉的呼吸聲！我以為是鬼壓床，逼自己冷靜下來，終於過了幾分鐘才恢復行動，但奇怪的是，回家後這種現象卻不斷發生。每次都是半夜三點左右，感覺房間裡有個影子，甚至還會隨著我移動。想問問大家，我這是被跟上了嗎？該怎麼處理？。那天晚上我和兩個朋友決定去看看網上流傳的這間鬧鬼工廠。據說這裡以前發生過意外，之後工廠就荒廢了，很多人說夜晚時能聽到不尋常的聲音。我們大概晚上11點左右到達，手電筒微弱的光照著破損的牆壁和散落的機械零件，氣氛異常詭異。才剛走進去沒多久，我們就聽到一種低沉的聲音，像是有人在悄悄說話，又像是風吹過斷裂的金屬片。聲音忽遠忽近，聽起來像是咒語，我朋友嚇得立刻拉住我想走，但我還是想確認一下。我們鼓起勇氣往聲音傳來的方向走，直到發現一堵牆上畫滿了符號。那些符號像是某種道教的符咒，字跡歪歪扭扭，雖然看起來有點久遠但看得出有些是用紅色顏料寫的。看到這場景的那一瞬間，我們全都愣住了，寒意從腳底竄上背脊。我不知道那些符號是誰畫的，也不敢確定它們是否真有驅邪或招靈的作用。當時我們不敢再多做停留，立刻逃出了工廠。事後越想越不對勁，現在還在猶豫該不該去查查那些符號的意義……有沒有人也去過那裡？是否有見過那些奇怪的符號？希望有懂符咒的大大可以分享一些見解。",
    articleImage: "images/Forum/Turn-empty-article.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 82, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 60, altText: "label" }
    ]
  },
  {
    id:6,
    commentCount: 0,
    category: "都市傳說",
    authorName: "莉莉安",
    authorAvatar: "images/Forum/Lillian.svg",
    title: "鬼月半夜騎機車遇到「多出來的手」",
    preview:"鬼月的時候我習慣早點回家，不過那天有點晚了，得一個人騎機車從偏僻的山路回家。騎到一半，突然覺得肩膀一沉，像是多了什麼重量。我心裡一驚，不敢回頭，繼續硬著頭皮騎。可是越騎越不對勁，總感覺有「手」從我腰間慢慢攀上來，像是要抱住我。回到家之後，我嚇到渾身冒冷汗，回頭看機車後座，什麼都沒有。聽說鬼月的時候騎車真的會遇到這種事，不知道有沒有人也有過類似經歷？怎麼防範啊？",   
    articleImage: "images/Forum/Lillian-article.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 102, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 67, altText: "label" }
    ]
  },
  {
    id:7,
    commentCount: 0,
    category: "都市傳說",
    authorName: "暗影守望者",
    authorAvatar: "images/Forum/Night-Walker.svg",
    title: "公司廁所半夜傳來的低語聲……",
    preview:"我在一間科技公司上班，平常加班到很晚。幾天前晚上十一點左右，整層辦公室只剩我一人。我去廁所洗手，忽然聽到一種微弱的低語聲，像是有人在隔壁隔間自言自語。我還以為是別的同事沒回去，就隨口問了一句：「還沒下班啊？」但隔壁的聲音立刻停了下來，一片死寂。當時有種異樣的恐懼從背後升起，我連水都沒關就逃出去了。後來問同事們，沒人那晚留下來過。大家有聽過公司廁所鬧鬼的故事嗎？這會不會是什麼不好的預兆？",   
    articleImage: "images/Forum/Night-Walker-Articles.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 28, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 60, altText: "label" }
    ]
  },
  {
    id:8,
    commentCount: 0,
    category: "都市傳說",
    authorName: "黑夜行者",
    authorAvatar: "images/Forum/shadowwatcher.svg",
    title: "深夜在山區遇見「沒有臉」的登山者",
    preview: "和朋友去宜蘭的山區露營，結果遇到非常詭異的事。那天晚上十點左右，我去帳篷外走動，正準備回去時看到一個穿著藍色風衣的人正往我們的營地走來。因為太晚了，我覺得有點奇怪，於是多看了幾眼。他走到靠近篝火的地方，我才發現他的臉……是空的！就像一團模糊的影子，完全沒有五官。當我想要喊朋友的時候，他已經轉身離開，走向樹林深處了。我當場嚇到全身僵住，後來回帳篷跟朋友講，他們也覺得不可思議。有人知道這是什麼靈異現象嗎？有經驗的大神請指教！",
    articleImage: "images/Forum/Shadowwatch-Articles.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 502, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 8, altText: "label" }
    ]
  },
  {
    id:9,
    commentCount: 0,
    category: "都市傳說",
    authorName: "暗夜守望者",
    authorAvatar: "images/Forum/Night-Explorer.svg",
    title: "親身經歷！那晚在荒廢的工廠聽見奇怪的低語聲",
    preview: "第一次發文，想跟大家分享我上週在嘉義一間廢棄工廠探險的恐怖經歷...",
    articleImage: "images/Forum/Night-Explorer-Articles",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 72, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 9, altText: "label" }
    ]
  },
  {
    id:10,
    commentCount: 0,
    category: "都市傳說",
    authorName: "模糊獵人",
    authorAvatar: "images/Forum/blur-hunter3.svg",
    title: "親身經歷！那晚在荒廢的工廠聽見奇怪的低語聲",
    preview: "第一次發文，想跟大家分享我上週在嘉義一間廢棄工廠探險的恐怖經歷...",
    articleImage: "images/Forum/hunter-article-picture.svg",
    interactions: [
      { icon: "images/Forum/Forum_ghost.svg", 
        filledIcon: "images/Forum/solar_ghost-outline.svg",
        count: 18, 
        altText: "like" },
      { icon: "images/Forum/mynaui_message.svg", count: 0, altText: "message" },
      { icon: "images/Forum/Forum_label.svg", 
        filledIcon: "images/Forum/MapCollect.png",
        count: 10, altText: "label" }
    ]
  },


];

export default articles;