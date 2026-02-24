import { useState, useEffect } from "react";

// 匿名頭像列表（從 public/images/Avatars 隨機選用）
// 使用 import.meta.env.BASE_URL 以支援 Vite 部署路徑（如 GitHub Pages 的 /Mystic-Markers/）
const getAnonymousAvatars = () => {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
  const basePath = base ? `${base}/images` : "/images";
  return Array.from(
    { length: 100 },
    (_, i) => `${basePath}/Avatars/avatar%20(${i + 1}).jpg`
  );
};

// 匿名名稱組合：形容詞 + 名稱
const RANDOM_ADJS = ["神秘的", "都市的", "夜行的", "好奇的", "探險的", "夜遊的", "暗夜的"];
const RANDOM_NAMES = [
  "神秘訪客",
  "都市探險家",
  "夜遊者",
  "好奇寶寶",
  "探險家",
  "夜行者",
  "暗夜低語者",
  "幽影追隨者",
  "荒廢詠嘆者",
  "迷霧探險者",
  "深淵凝視者",
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
        "匿名--" +
          RANDOM_ADJS[Math.floor(Math.random() * RANDOM_ADJS.length)] +
          RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]
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
