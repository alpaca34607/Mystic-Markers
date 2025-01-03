import { generateComments } from './presetComments';
import { presetComments } from './presetComments';

// 為每個預設標記生成隨機評論和平均評分
const generateMarkerData = (markerId, baseMarker) => {
    // 如果有 pageId，使用對應的預設評論
    let comments;
    if (baseMarker.pageId) {
        const pageKey = `page${baseMarker.pageId}`;
        comments = presetComments[pageKey] || [];
    } else {
        // 如果沒有 pageId，則生成隨機評論
        const commentCount = Math.floor(Math.random() * 11) + 5;
        comments = generateComments(markerId, commentCount);
    }

    // 計算平均評分
    const averageRating = comments.length > 0
        ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
        : 0;

    return {
        ...baseMarker,
        comments,
        rating: averageRating
    };
};
// 預設標記點資料
const templeMarkers = [

    generateMarkerData("taipei-longshan-temple", {
        id: "taipei-longshan-temple",
        position: [25.037516, 121.499959],
        title: "艋舺龍山寺",
        city: "台北市",
        district: "萬華區",
        coverPhoto: "images/default-location.jpg",
        description: "龍山寺是台北市最著名的寺廟之一，擁有豐富的歷史和文化背景。",
        userId: "system",
        userName: "文化巡禮",
        userAvatar: "images/Avatars/avatar (12).jpg",
    }),
generateMarkerData("tainan-confucius-temple", {
    id: "tainan-confucius-temple",
    position: [22.991859, 120.207671],
    title: "台南孔廟",
    city: "台南市",
    district: "中西區",
    coverPhoto: "images/default-location.jpg",
    description: "全台首學台南孔廟，歷史悠久，是學子祈福的聖地。",
    userId: "system",
    userName: "歷史小達人",
    userAvatar: "images/Avatars/avatar (15).jpg",
}),
generateMarkerData("taichung-baojue-temple", {
    id: "taichung-baojue-temple",
    position: [24.137929, 120.686178],
    title: "台中保安宮",
    city: "台中市",
    district: "北區",
    coverPhoto: "images/default-location.jpg",
    description: "保安宮是供奉保生大帝的著名廟宇，香火鼎盛。",
    userId: "system",
    userName: "信仰旅人",
    userAvatar: "images/Avatars/avatar (27).jpg",
}),

generateMarkerData("kaohsiung-zuoying-temple", {
    id: "kaohsiung-zuoying-temple",
    position: [22.687966, 120.292607],
    title: "左營蓮池潭北極殿",
    city: "高雄市",
    district: "左營區",
    coverPhoto: "images/default-location.jpg",
    description: "北極殿是蓮池潭畔的重要廟宇，供奉北極玄天上帝。",
    userId: "system",
    userName: "南風巡禮",
    userAvatar: "images/Avatars/avatar (33).jpg",
}),
generateMarkerData("taipei-matsu-temple", {
    id: "taipei-matsu-temple",
    position: [25.086382, 121.512708],
    title: "台北松山慈祐宮",
    city: "台北市",
    district: "松山區",
    coverPhoto: "images/default-location.jpg",
    description: "松山慈祐宮供奉天上聖母，是當地居民的信仰中心。",
    userId: "system",
    userName: "青燈俠影",
    userAvatar: "images/Avatars/avatar (14).jpg",
  }),
  
  generateMarkerData("tainan-grand-matsu-temple", {
    id: "tainan-grand-matsu-temple",
    position: [22.991889, 120.202561],
    title: "台南大天后宮",
    city: "台南市",
    district: "中西區",
    coverPhoto: "images/default-location.jpg",
    description: "全台第一座官建媽祖廟，是國家三級古蹟。",
    userId: "system",
    userName: "雲游仙客",
    userAvatar: "images/Avatars/avatar (18).jpg",
  }),
  
  generateMarkerData("new-taipei-land-god-temple", {
    id: "new-taipei-land-god-temple",
    position: [25.007383, 121.463834],
    title: "新北深坑土地公廟",
    city: "新北市",
    district: "深坑區",
    coverPhoto: "images/default-location.jpg",
    description: "深坑土地公廟供奉福德正神，是地方居民的重要祈福場所。",
    userId: "system",
    userName: "山林隱士",
    userAvatar: "images/Avatars/avatar (19).jpg",
  }),
  
  generateMarkerData("hualien-land-god-temple", {
    id: "hualien-land-god-temple",
    position: [23.991072, 121.614525],
    title: "花蓮市土地公廟",
    city: "花蓮縣",
    district: "花蓮市",
    coverPhoto: "images/default-location.jpg",
    description: "這座土地公廟是當地居民經常參拜的祈福地。",
    userId: "system",
    userName: "東海俠客",
    userAvatar: "images/Avatars/avatar (23).jpg",
  }),
  
  generateMarkerData("new-taipei-qingshui-temple", {
    id: "new-taipei-qingshui-temple",
    position: [25.049024, 121.369737],
    title: "新北三峽祖師廟",
    city: "新北市",
    district: "三峽區",
    coverPhoto: "images/default-location.jpg",
    description: "三峽祖師廟建築雄偉，是信仰清水祖師的知名廟宇。",
    userId: "system",
    userName: "天涯墨客",
    userAvatar: "images/Avatars/avatar (21).jpg",
  }),
  
  generateMarkerData("kaohsiung-guandi-temple", {
    id: "kaohsiung-guandi-temple",
    position: [22.626315, 120.300525],
    title: "高雄左營關帝廟",
    city: "高雄市",
    district: "左營區",
    coverPhoto: "images/default-location.jpg",
    description: "供奉武聖關公，是左營重要的信仰中心。",
    userId: "system",
    userName: "義薄雲天",
    userAvatar: "images/Avatars/avatar (25).jpg",
  }),
  
  generateMarkerData("taichung-guandi-temple", {
    id: "taichung-guandi-temple",
    position: [24.138572, 120.676586],
    title: "台中市關帝廟",
    city: "台中市",
    district: "中區",
    coverPhoto: "images/default-location.jpg",
    description: "歷史悠久的關帝廟，供奉關聖帝君。",
    userId: "system",
    userName: "紅塵俠道",
    userAvatar: "images/Avatars/avatar (29).jpg",
  }),
  
  generateMarkerData("keelung-matsu-temple", {
    id: "keelung-matsu-temple",
    position: [25.128252, 121.744652],
    title: "基隆天后宮",
    city: "基隆市",
    district: "仁愛區",
    coverPhoto: "images/default-location.jpg",
    description: "基隆天后宮是當地重要的媽祖信仰中心，具有悠久歷史。",
    userId: "system",
    userName: "海天俠女",
    userAvatar: "images/Avatars/avatar (30).jpg",
  }),
  
  generateMarkerData("chiayi-land-god-temple", {
    id: "chiayi-land-god-temple",
    position: [23.480075, 120.449111],
    title: "嘉義土地公廟",
    city: "嘉義市",
    district: "東區",
    coverPhoto: "images/default-location.jpg",
    description: "位於嘉義市中心的土地公廟，深受居民愛戴。",
    userId: "system",
    userName: "林間隱龍",
    userAvatar: "images/Avatars/avatar (32).jpg",
}),
  
  generateMarkerData("pingtung-guandi-temple", {
    id: "pingtung-guandi-temple",
    position: [22.551733, 120.548372],
    title: "屏東市關帝廟",
    city: "屏東縣",
    district: "屏東市",
    coverPhoto: "images/default-location.jpg",
    description: "屏東市關帝廟供奉關聖帝君，是地方的重要信仰場所。",
    userId: "system",
    userName: "赤膽俠士",
    userAvatar: "images/Avatars/avatar (34).jpg",
}),
  
  generateMarkerData("miaoli-qingshui-temple", {
    id: "miaoli-qingshui-temple",
    position: [24.564018, 120.822293],
    title: "苗栗清水祖師廟",
    city: "苗栗縣",
    district: "苗栗市",
    coverPhoto: "images/default-location.jpg",
    description: "苗栗清水祖師廟以其精美的建築和悠久的歷史聞名。",
    userId: "system",
    userName: "行雲劍客",
    userAvatar: "images/Avatars/avatar (36).jpg",
}),
  
  generateMarkerData("nantou-matsu-temple", {
    id: "nantou-matsu-temple",
    position: [23.916167, 120.684631],
    title: "南投媽祖廟",
    city: "南投縣",
    district: "南投市",
    coverPhoto: "images/default-location.jpg",
    description: "位於南投市中心的媽祖廟，是當地居民重要的祈福場所。",
    userId: "system",
    userName: "蒼穹游俠",
    userAvatar: "images/Avatars/avatar (38).jpg",
}),
generateMarkerData("changhua-lukang-matsu-temple", {
    id: "changhua-lukang-matsu-temple",
    position: [24.056530, 120.434520],
    title: "彰化鹿港天后宮",
    city: "彰化縣",
    district: "鹿港鎮",
    coverPhoto: "images/default-location.jpg",
    description: "鹿港天后宮歷史悠久，是媽祖信仰的重要據點。",
    userId: "system",
    userName: "江湖夜雨",
    userAvatar: "images/Avatars/avatar (40).jpg",
  }),
  
  generateMarkerData("yunlin-beigang-matsu-temple", {
    id: "yunlin-beigang-matsu-temple",
    position: [23.570743, 120.300075],
    title: "雲林北港朝天宮",
    city: "雲林縣",
    district: "北港鎮",
    coverPhoto: "images/default-location.jpg",
    description: "北港朝天宮是雲林地區最著名的媽祖廟之一。",
    userId: "system",
    userName: "踏雪無痕",
    userAvatar: "images/Avatars/avatar (41).jpg",
  }),
  
  generateMarkerData("taipei-qingshui-temple", {
    id: "taipei-qingshui-temple",
    position: [25.036897, 121.496186],
    title: "台北艋舺清水巖",
    city: "台北市",
    district: "萬華區",
    coverPhoto: "images/default-location.jpg",
    description: "清水巖是艋舺地區的著名宗教建築，以其雕刻精美而聞名。",
    userId: "system",
    userName: "萬里孤雲",
    userAvatar: "images/Avatars/avatar (42).jpg",
  }),
  
  generateMarkerData("hualien-guandi-temple", {
    id: "hualien-guandi-temple",
    position: [23.976043, 121.605645],
    title: "花蓮關帝廟",
    city: "花蓮縣",
    district: "花蓮市",
    coverPhoto: "images/default-location.jpg",
    description: "供奉關聖帝君，是當地人祈求平安的信仰場所。",
    userId: "system",
    userName: "風中旅人",
    userAvatar: "images/Avatars/avatar (43).jpg",
  }),
  
  generateMarkerData("kaohsiung-matsu-temple", {
    id: "kaohsiung-matsu-temple",
    position: [22.616827, 120.309298],
    title: "高雄旗津天后宮",
    city: "高雄市",
    district: "旗津區",
    coverPhoto: "images/default-location.jpg",
    description: "旗津天后宮是當地漁民的信仰中心。",
    userId: "system",
    userName: "逐風劍影",
    userAvatar: "images/Avatars/avatar (44).jpg",
  }),
  
  generateMarkerData("nantou-land-god-temple", {
    id: "nantou-land-god-temple",
    position: [23.906237, 120.684912],
    title: "南投福德祠",
    city: "南投縣",
    district: "南投市",
    coverPhoto: "images/default-location.jpg",
    description: "南投福德祠是一座深受居民喜愛的土地公廟。",
    userId: "system",
    userName: "三山飛狐",
    userAvatar: "images/Avatars/avatar (45).jpg",
  }),
  
  
];


export default templeMarkers;