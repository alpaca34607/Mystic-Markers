const REPO_NAME = '/Mystic-Markers';
// 評論數據庫
const templecommentDB = {
  userIds: Array.from({ length: 100 }, (_, i) => `user${i + 1}`),

  userNames: [
    "模糊獵人", "藤森月子", "光", "迷路的貓", "黑夜探險者",
    "阿幽", "鬼瞳", "小紙人", "青燈", "月影",
    "陰陽師", "紙紮匠", "阿飄飄", "靈狐", "大黑貓",
    "陰月", "紅瞳", "焚香道長", "小鬼頭", "怨影",
    "血月", "符師阿泰", "白無常", "怨念兒", "影魅",
    "小屍屍", "青冥", "靈探", "符文", "天師子墨",
    "闇火", "渡魂者", "陰風", "黑白無常", "骨娃",
    "靈瞳", "南無阿強", "陰間使者", "冥蝶", "七月",
    "幻夜", "小燭台", "血玫瑰", "念咒姐", "幽幽子"

  ],

  avatars: Array.from({ length: 100 }, (_, i) => {
    const basePath = process.env.NODE_ENV === 'production' 
      ? `${REPO_NAME}/images` 
      : '/images';
    return `${basePath}/Avatars/avatar%20(${i + 1}).jpg`;
  }),

  ratings: [1, 1, 1, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5], 

  positiveTexts: [
    "廟宇的光明面真的讓人感到平靜，很特別的體驗！",
    "香火很旺盛，整體氛圍莊嚴神聖。",
    "建築風格獨特，雕工精美，值得一看。",
    "寺廟的龍柱氣勢磅礡，很有靈性！",
    "聽說很多人來求籤都很靈驗，確實能感受到不同。",
    "廟裡的光影交錯營造出神秘氣氛，拍照超美。",
    "廟宇的歷史故事很吸引人，聽說有很多靈異傳說。",
    "夜晚的氛圍特別不同，感覺特別莊嚴。",
    "廟裡的壁畫栩栩如生，有種說不出的神秘感。"
],

neutralTexts: [
  "普通的廟宇，香火還算可以。",
  "建築還不錯，但沒什麼特別的。",
  "感覺就是一般的寺廟，氛圍還好。",
  "有點年代感，但維護得不算太好。",
  "地方不大，人倒是不少。"
],

negativeTexts: [
  "建築有點老舊，需要整修。",
  "人太多了，感受不到什麼靈性。",
  "位置不好找，交通不便。",
  "周邊環境需要改善。",
  "沒什麼特色，一般般而已。"
]

};

// 根據評分選擇對應的評論文字
// 根據評分選擇對應的評論文字
function getCommentTextByRating(rating) {
  const { positiveTexts, neutralTexts, negativeTexts } = templecommentDB;

  if (rating >= 4) {
      return positiveTexts[Math.floor(Math.random() * positiveTexts.length)];
  } else if (rating === 3) {
      return neutralTexts[Math.floor(Math.random() * neutralTexts.length)];
  } else {
      return negativeTexts[Math.floor(Math.random() * negativeTexts.length)];
  }
}

// 生成隨機評論
function generateTempleComment(id) {
  const { userIds, userNames, avatars, ratings } = templecommentDB;

  const rating = ratings[Math.floor(Math.random() * ratings.length)];

  return {
      id,
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      userName: userNames[Math.floor(Math.random() * userNames.length)],
      userAvatar: avatars[Math.floor(Math.random() * avatars.length)],
      rating,
      text: getCommentTextByRating(rating),
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
  };
}

// 生成指定數量的評論
function generateTempleComments(pageId, count) {
  return Array.from({ length: count }, (_, index) =>
      generateTempleComment(`${pageId}-${index + 1}`)
  );
}

// 定義寺廟 ID 列表
const templeMarkerIds = [
  "taipei-longshan-temple",
  "tainan-confucius-temple",
  "taichung-baojue-temple",
  "kaohsiung-zuoying-temple",
  "taipei-matsu-temple",
  "tainan-grand-matsu-temple",
  "new-taipei-land-god-temple",
  "hualien-land-god-temple",
  "new-taipei-qingshui-temple",
  "kaohsiung-guandi-temple",
  "taichung-guandi-temple",
  "keelung-matsu-temple",
  "chiayi-land-god-temple",
  "pingtung-guandi-temple",
  "miaoli-qingshui-temple",
  "nantou-matsu-temple",
  "changhua-lukang-matsu-temple",
  "yunlin-beigang-matsu-temple",
  "taipei-qingshui-temple",
  "hualien-guandi-temple",
  "kaohsiung-matsu-temple",
  "nantou-land-god-temple"
];

// 生成所有寺廟的評論
const templeMarkersComments = templeMarkerIds.reduce((acc, id) => {
  // 為每個寺廟生成 5-15 個隨機評論
  const commentCount = Math.floor(Math.random() * 11) + 5;
  acc[id] = generateTempleComments(id, commentCount);
  return acc;
}, {});

// 導出
export {
  generateTempleComments,
  templeMarkersComments
};