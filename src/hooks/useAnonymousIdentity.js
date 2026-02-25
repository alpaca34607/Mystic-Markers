import { useState, useEffect } from "react";

// 匿名頭像列表（從 public/images/Avatars 隨機選用）
// 使用 import.meta.env.BASE_URL 以支援 Vite 部署路徑（如 GitHub Pages 的 /Mystic-Markers/）
const getAnonymousAvatars = () => {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
  const basePath = base ? `${base}/images` : "/images";
  return Array.from(
    { length: 100 },
    (_, i) => `${basePath}/Avatars/avatar%20(${i + 1}).jpg`,
  );
};

// 匿名名稱組合形容詞 + 名稱
const RANDOM_ADJS = [
  "神秘",
  "都市",
  "深淵",
  "今日",
  "明日",
  "探險的",
  "夜遊的",
  "暗夜",
  "飢餓的",
  "冷漠的",
  "孤獨的",
  "幽暗的",
  "霧中的",
  "優雅的",
  "沒朋友的",
];
const RANDOM_NAMES = [
  "旅人",
  "浪人",
  "引路人",
  "訪客",
  "探險家",
  "夜遊者",
  "寶寶",
  "阿嬤",
  "幽靈",
  "探險家",
  "夜行者",
  "低語者",
  "追隨者",
  "詠嘆者",
  "探險者",
  "凝視者",
  "道士",
];

/**
 * 匿名身份 Hook
 * 勾選匿名時隨機產生頭像與名稱，取消勾選時清除，重新勾選時會重新隨機
 * @returns {{ isAnonymous, setIsAnonymous, anonymousAvatar, anonymousName }}
 */
export function useAnonymousIdentity() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [anonymousAvatar, setAnonymousAvatar] = useState("");
  const [anonymousName, setAnonymousName] = useState("");

  useEffect(() => {
    if (isAnonymous) {
      const avatars = getAnonymousAvatars();
      setAnonymousAvatar(avatars[Math.floor(Math.random() * avatars.length)]);
      setAnonymousName(
        "匿名-" +
          RANDOM_ADJS[Math.floor(Math.random() * RANDOM_ADJS.length)] +
          RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)],
      );
    } else {
      setAnonymousAvatar("");
      setAnonymousName("");
    }
  }, [isAnonymous]);

  return {
    isAnonymous,
    setIsAnonymous,
    anonymousAvatar,
    anonymousName,
  };
}
