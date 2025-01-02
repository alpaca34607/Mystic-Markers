// src/config.js
const config = {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? '/your-repo-name'  // 替换成您的 GitHub 仓库名
      : '',
    
    getImageUrl: (path) => {
      return `${config.baseUrl}${path}`;
    }
  };
  
  export default config;