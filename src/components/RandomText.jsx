import { useState } from "react";

const RandomText = (originalText, interval = 100, duration = 1000) => {
  const [text, setText] = useState(originalText);

  const generateRandomText = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const startRandomizing = () => {
    let intervalId;
    const stopTime = Date.now() + duration;

    intervalId = setInterval(() => {
      setText(generateRandomText(originalText.length));
      if (Date.now() > stopTime) {
        clearInterval(intervalId);
        setText(originalText);
      }
    }, interval);
  };

  return [text, startRandomizing];
};

export default RandomText;
