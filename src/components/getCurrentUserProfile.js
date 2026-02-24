import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const STORAGE_KEY = "userProfile";

const getBasePath = () =>
  process.env.NODE_ENV === "production" ? "/Mystic-Markers" : "";
const getDefaultAvatar = () =>
  getBasePath() + "/images/Avatars/avatar%20(1).jpg";

/** 從 localStorage 載入會員自訂資料 */
export function loadProfile(userId) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const data = JSON.parse(stored);
    return data.userId === userId ? data : null;
  } catch {
    return null;
  }
}

/** 儲存會員自訂資料到 localStorage */
export function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/**
 * 取得當前使用者基本資訊（支援 Firebase 與本地登入）
 * 供 Map、Forum 等頁面使用
 * @returns {{ userId: string, userName: string, userAvatar: string }}
 */
export function getCurrentUserProfile() {
  const defaultAvatar = getDefaultAvatar();

  try {
    const currentUser = auth.currentUser;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const registeredData = JSON.parse(
      localStorage.getItem("registeredData") || "null",
    );
    const savedProfile = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null",
    );

    if (currentUser) {
      const saved =
        savedProfile?.userId === currentUser.uid ? savedProfile : null;
      return {
        userId: currentUser.uid,
        userName: saved?.displayName || currentUser.displayName || "訪客",
        userAvatar: saved?.avatar || currentUser.photoURL || defaultAvatar,
      };
    }

    if (isLoggedIn && registeredData) {
      const mockUserId = "mock-" + registeredData.email;
      const saved = savedProfile?.userId === mockUserId ? savedProfile : null;
      return {
        userId: mockUserId,
        userName: saved?.displayName || registeredData.name || "訪客",
        userAvatar: saved?.avatar || defaultAvatar,
      };
    }
  } catch (e) {
    console.error("取得使用者資訊失敗", e);
  }

  return {
    userId: "guest",
    userName: "訪客",
    userAvatar: defaultAvatar,
  };
}

/**
 * 取得當前使用者完整資訊（含 user 物件與 profile）
 * 供 User 頁面使用
 * @returns {{ user: object|null, profile: object }|null}
 */
export function getCurrentUseAllProfile() {
  try {
    const currentUser = auth.currentUser;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const registeredData = JSON.parse(
      localStorage.getItem("registeredData") || "null",
    );

    if (currentUser) {
      const saved = loadProfile(currentUser.uid);
      const avatar = saved?.avatar || currentUser.photoURL || "";
      return {
        user: currentUser,
        profile: {
          displayName: saved?.displayName || currentUser.displayName || "",
          avatar,
          phone: saved?.phone || "",
          bio: saved?.bio || "",
          hobbies: saved?.hobbies || [],
        },
      };
    }

    if (isLoggedIn && registeredData) {
      const mockUser = {
        uid: "mock-" + registeredData.email,
        displayName: registeredData.name,
        email: registeredData.email,
        photoURL: null,
        metadata: { creationTime: null },
      };
      const saved = loadProfile(mockUser.uid);
      return {
        user: mockUser,
        profile: {
          displayName: saved?.displayName || registeredData.name || "",
          avatar: saved?.avatar || "",
          phone: saved?.phone || registeredData.phone || "",
          bio: saved?.bio || "",
          hobbies: saved?.hobbies || [],
        },
      };
    }
  } catch (e) {
    console.error("取得使用者資訊失敗", e);
  }

  return null;
}

/** 自訂 Hook：取得基本使用者資訊，供 Map、Forum 等使用 */
export function useCurrentUserProfile() {
  const [userProfile, setUserProfile] = useState(() => getCurrentUserProfile());

  useEffect(() => {
    const updateProfile = () => setUserProfile(getCurrentUserProfile());
    const unsubscribe = onAuthStateChanged(auth, updateProfile);
    window.addEventListener("storage", updateProfile);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", updateProfile);
    };
  }, []);

  return userProfile;
}

/** 自訂 Hook：取得完整使用者與 profile，供 User 頁面使用 */
export function useUserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    displayName: "",
    avatar: "",
    phone: "",
    bio: "",
    hobbies: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const update = () => {
      const result = getCurrentUseAllProfile();
      if (result) {
        setUser(result.user);
        setProfile(result.profile);
      } else {
        setUser(null);
        setProfile({
          displayName: "",
          avatar: "",
          phone: "",
          bio: "",
          hobbies: [],
        });
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, update);
    window.addEventListener("storage", update);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", update);
    };
  }, []);

  return { user, profile, setProfile, loading };
}
