import Swal from "sweetalert2";

/* SweetAlert2 工具 */

export const swalSuccess = (message, title = "成功") => {
  return Swal.fire({
    title,
    text: message,
    icon: "success",
    confirmButtonText: "確定",
  });
};

export const swalError = (message, title = "錯誤") => {
  return Swal.fire({
    title,
    text: message,
    icon: "error",
    confirmButtonText: "確定",
  });
};

export const swalWarning = (message, title = "提示") => {
  return Swal.fire({
    title,
    text: message,
    icon: "warning",
    confirmButtonText: "確定",
  });
};

export const swalInfo = (message, title = "資訊") => {
  return Swal.fire({
    title,
    text: message,
    icon: "info",
    confirmButtonText: "確定",
  });
};

/** 支援 HTML 內容的資訊提示（用於多行文字） */
export const swalInfoHtml = (html, title = "資訊") => {
  return Swal.fire({
    title,
    html,
    icon: "info",
    confirmButtonText: "確定",
  });
};
