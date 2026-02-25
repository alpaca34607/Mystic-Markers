/* 文章按讚數 localStorage 儲存 key */
const STORAGE_KEY = "forumArticleLikeCounts";

/*取得文章的儲存按讚數，若無則回傳 null*/
export const getStoredLikeCount = (articleId) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const count = data[String(articleId)];
  return count !== undefined ? count : null;
};

/*儲存文章的按讚數*/
export const saveLikeCount = (articleId, count) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  data[String(articleId)] = count;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
