import { useState, useEffect, useRef, useCallback } from "react";
import Footer from "../components/Footer";
import { swalSuccess, swalError, swalWarning } from "../utils/swal";
import { useUserProfile, saveProfile } from "../components/getCurrentUserProfile";

import "../style.scss";

export default function User() {
    const { user, profile, setProfile, loading } = useUserProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        displayName: "",
        avatar: "",
        phone: "",
        bio: "",
        hobbies: [],
    });
    const [avatarLoadError, setAvatarLoadError] = useState(false);
    const fileInputRef = useRef(null);
    // 修改密碼彈窗（本地註冊用）
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const firstPasswordInputRef = useRef(null);

    useEffect(() => {
        if (profile && Object.keys(profile).length > 0 && !isEditing) {
            setEditForm(profile);
            setAvatarLoadError(false);
        }
    }, [profile, isEditing]);

    // 轉換日期格式
    const formattedDate = (date) => {
        if (!date) return null;
        const d = date instanceof Date ? date : (date?.toDate?.() ?? new Date(date));
        return isNaN(d.getTime()) ? null : d.toLocaleDateString("zh-TW", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleEdit = () => {
        setEditForm({ ...profile });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditForm({ ...profile });
        setIsEditing(false);
    };

    const handleSave = () => {
        const newProfile = {
            ...profile,
            ...editForm,
            userId: user.uid,
        };
        setProfile(newProfile);
        saveProfile(newProfile);
        localStorage.setItem("userName", newProfile.displayName);
        window.dispatchEvent(new Event("storage"));
        setAvatarLoadError(false);
        setIsEditing(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarLoadError(false);
            setEditForm((prev) => ({ ...prev, avatar: reader.result }));
        };
        reader.readAsDataURL(file);
    };
    const handleHobbyChange = (currentHobby) => {
        setEditForm((prev) => {
            const hobbies = prev.hobbies || [];
            if (hobbies.includes(currentHobby)) {
                // 已勾選則移除
                return { ...prev, hobbies: hobbies.filter((newhobby) => newhobby !== currentHobby) };
            }
            if (hobbies.length >= 3) {
                // 已滿 3 個則替換第一個
                return { ...prev, hobbies: [...hobbies.slice(1), currentHobby] };
            }
            // 未滿 3 個則加入
            return { ...prev, hobbies: [...hobbies, currentHobby] };
        });
    };


    const isMockUser = user?.uid?.startsWith("mock-");

    const closePasswordModal = useCallback(() => {
        setIsPasswordModalOpen(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }, []);

    useEffect(() => {
        if (!isPasswordModalOpen) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") closePasswordModal();
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleEsc);
        firstPasswordInputRef.current?.focus();
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isPasswordModalOpen, closePasswordModal]);

    const handleChangePasswordClick = () => {
        if (isMockUser) {
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setIsPasswordModalOpen(true);
        } else {
            swalWarning("目前僅支援本地註冊的帳號修改密碼");
        }
    };

    const handlePasswordSubmit = () => {
        const { currentPassword, newPassword, confirmPassword } = passwordForm;
        if (!currentPassword || !newPassword || !confirmPassword) {
            swalWarning("請填寫所有欄位！");
            return;
        }
        if (newPassword !== confirmPassword) {
            swalWarning("新密碼與確認密碼不一致！");
            return;
        }
        const registeredData = JSON.parse(localStorage.getItem("registeredData") || "null");
        if (!registeredData || registeredData.password !== currentPassword) {
            swalError("現有密碼錯誤！");
            return;
        }
        const updated = { ...registeredData, password: newPassword };
        localStorage.setItem("registeredData", JSON.stringify(updated));
        swalSuccess("密碼修改成功！");
        closePasswordModal();
    };

    if (loading) {
        return (
            <main className="user-page">
                <div className="user-page-container user-page-loading">載入中...</div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="user-page">
                <div className="user-page-container user-page-empty">請先登入</div>
            </main>
        );
    }

    const displayAvatar = isEditing ? editForm.avatar : profile.avatar;
    const defaultAvatar = "images/Avatars/avatar (1).jpg";
    // 當 photoURL 載入失敗時使用預設頭像
    const avatarSrc = avatarLoadError ? defaultAvatar : (displayAvatar || defaultAvatar);

    return (
        <>
            <main className="user-page">
                <div className="user-page-background"><img src="images/User/lilys.png" alt="背景" /></div>
                <div className="user-page-container">
                    <h1 className="user-page-title">會員資料</h1>
                    <div className="profile-container">
                        {/* 大頭貼區塊 */}
                        <div className="user-profile-header">
                            <div className="user-avatar-section">
                                <div className="user-avatar-wrapper">
                                    <img
                                        src={avatarSrc}
                                        alt={profile.displayName || "頭像"}
                                        className="user-avatar-img"
                                        onError={() => setAvatarLoadError(true)}
                                        referrerPolicy="no-referrer"
                                    />
                                    {isEditing && (
                                        <button
                                            type="button"
                                            className="user-avatar-edit"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            更換頭像
                                        </button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                <p className="user-display-name">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.displayName}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({
                                                    ...prev,
                                                    displayName: e.target.value,
                                                }))
                                            }
                                            placeholder="顯示名稱"
                                            className="user-edit-input"
                                        />
                                    ) : (
                                        profile.displayName || "未設定"
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* 基本資訊區塊 */}
                        <div className="user-info-card">
                            <h2 className="user-info-card-title">基本資訊</h2>
                            <div className="user-info-list">
                                <div className="user-info-row">
                                    <label className="user-info-label">Email</label>
                                    <span className="user-info-value">{user.email || "—"}</span>
                                </div>
                                <div className="user-info-row">
                                    <label className="user-info-label">名稱</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.displayName}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({
                                                    ...prev,
                                                    displayName: e.target.value,
                                                }))
                                            }
                                            className="user-edit-input user-edit-input-inline"
                                        />
                                    ) : (
                                        <span className="user-info-value">
                                            {profile.displayName || "—"}
                                        </span>
                                    )}
                                </div>
                                <div className="user-info-row">
                                    <label className="user-info-label">電話</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.phone}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({ ...prev, phone: e.target.value }))
                                            }
                                            placeholder="請輸入電話"
                                            className="user-edit-input user-edit-input-inline"
                                        />
                                    ) : (
                                        <span className="user-info-value">
                                            {profile.phone || "—"}
                                        </span>
                                    )}
                                </div>

                                <div className="user-info-row">
                                    <label className="user-info-label">註冊日期</label>
                                    <span className="user-info-value">{formattedDate(user.metadata.creationTime) || "—"}</span>
                                </div>
                                <div className="user-info-row user-info-row-bio">
                                    <span className="user-info-label">個人簡介</span>
                                    {isEditing ? (
                                        <textarea
                                            value={editForm.bio}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({ ...prev, bio: e.target.value }))
                                            }
                                            placeholder="寫點關於自己的介紹..."
                                            className="user-edit-textarea"
                                            rows={3}
                                        />
                                    ) : (
                                        <span className="user-info-value">
                                            {profile.bio || "—"}
                                        </span>
                                    )}
                                </div>
                                <div className="user-info-row user-info-row-bio">
                                    <label className="user-info-label">感興趣的話題</label>

                                    {isEditing ? <div className="hobby-list">{["都市傳說", "廢墟探險", "恐怖獵奇", "恐怖作品", "驅邪收驚"].map((currentHobby) => (

                                        <label key={currentHobby}>
                                            <input type="checkbox" value={currentHobby} checked={(editForm.hobbies || []).includes(currentHobby)} onChange={() => handleHobbyChange(currentHobby)} />
                                            {currentHobby}
                                        </label>
                                    ))}</div> : (<div className="hobby-tag-list">{(profile.hobbies || []).map((hobby) => (<div key={hobby} className="hobby-tag">{hobby}</div>))}</div>)
                                    }

                                </div>
                            </div>

                            {/* 編輯 / 儲存 / 取消 按鈕 */}
                            <div className="user-actions">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            className="user-btn user-btn-save"
                                            onClick={handleSave}
                                        >
                                            儲存
                                        </button>
                                        <button
                                            type="button"
                                            className="user-btn user-btn-cancel"
                                            onClick={handleCancel}
                                        >
                                            取消
                                        </button>
                                    </>
                                ) : (<>
                                    <button
                                        type="button"
                                        className="user-btn user-btn-edit"
                                        onClick={handleEdit}
                                    >
                                        編輯資料
                                    </button>
                                    {isMockUser && <button
                                        type="button"
                                        className="user-btn user-btn-edit"
                                        onClick={handleChangePasswordClick}
                                    >
                                        修改密碼
                                    </button>}
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>


            {/* 本地註冊：修改密碼彈窗 */}
            {isPasswordModalOpen && (
                <div
                    className="user-password-modal-overlay"
                    onClick={(e) => e.target === e.currentTarget && closePasswordModal()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="password-modal-title"
                >
                    <div
                        className="user-password-modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="user-password-modal-close"
                            onClick={closePasswordModal}
                            aria-label="關閉"
                        >
                            &times;
                        </button>
                        <h2 id="password-modal-title" className="user-password-modal-title">
                            修改密碼
                        </h2>
                        <div className="user-password-modal-form">
                            <label htmlFor="currentPassword">現有密碼</label>
                            <input
                                ref={firstPasswordInputRef}
                                id="currentPassword"
                                type="password"
                                placeholder="請輸入現有密碼"
                                value={passwordForm.currentPassword}
                                onChange={(e) =>
                                    setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))
                                }
                                autoComplete="current-password"
                            />
                            <label htmlFor="newPassword">新密碼</label>
                            <input
                                id="newPassword"
                                type="password"
                                placeholder="請輸入新密碼"
                                value={passwordForm.newPassword}
                                onChange={(e) =>
                                    setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                                }
                                autoComplete="new-password"
                            />
                            <label htmlFor="confirmPassword">確認新密碼</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="請再次輸入新密碼"
                                value={passwordForm.confirmPassword}
                                onChange={(e) =>
                                    setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                                }
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="user-password-modal-actions">
                            <button
                                type="button"
                                className="user-password-modal-submit"
                                onClick={handlePasswordSubmit}
                            >
                                確認修改
                            </button>
                            <button
                                type="button"
                                className="user-password-modal-cancel"
                                onClick={closePasswordModal}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
