// utils/assetPath.js
export const asset = (path) => {
  // Menggabungkan BASE_URL + path dan merapikan double slash
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/+/g, "/");
};
