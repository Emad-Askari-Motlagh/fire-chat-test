const encryptData = (text) => {
  if (!text && typeof text !== "string") {
    return;
  }
  return btoa(text);
};

const decryptData = (text) => {
  if (!text && typeof text !== "string") {
    return;
  }
  return atob(text);
};
export { encryptData, decryptData };
