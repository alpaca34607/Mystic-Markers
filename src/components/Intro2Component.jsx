import React, { useEffect, useRef } from "react";
import "../../css/style.css";
import SectionTitle from "./SectionTitle";

const Intro2Component = () => {
    const targetRef = useRef(null);

    useEffect(() => {
        const elems = document.querySelectorAll(".laya-please");
        const layer3 = document.querySelector(".layer-3");
        const layer4 = document.querySelector(".layer-4");
        const layer5 = document.querySelector(".layer-5");
        const layer6 = document.querySelector(".layer-6");
        const layer7 = document.querySelector(".layer-7");
        const layer8 = document.querySelector(".layer-8");

        // 滑鼠移動事件
        const handleMouseMove = (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 計算滑鼠相對於視窗的水平和垂直位置
            const mouseX = e.pageX;
            const mouseY = e.pageY;

            // 增大位移的比例，讓滑鼠移動一點就有較大的變化
            const mouseMovedX2 = (width / 2 - mouseX) / 15; // 水平移動
            const mouseMovedY2 = (height / 2 - mouseY) / 15; // 垂直移動

            const mouseMovedX3 = (width / 2 - mouseX) / 12;
            const mouseMovedY3 = (height / 2 - mouseY) / 12;

            const mouseMovedX4 = (width / 2 - mouseX) / 10;
            const mouseMovedY4 = (height / 2 - mouseY) / 10;

            const mouseMovedX5 = (width / 2 - mouseX) / 8;
            const mouseMovedY5 = (height / 2 - mouseY) / 8;

            const mouseMovedX6 = (width / 2 - mouseX) / 6;
            const mouseMovedY6 = (height / 2 - mouseY) / 6;

            const mouseMovedX7 = (width / 2 - mouseX) / 4;
            const mouseMovedY7 = (height / 2 - mouseY) / 4;

            // 更新各層位移 (水平方向 + 垂直方向)
            if (layer3) layer3.style.transform = `translateX(${mouseMovedX2}px) translateY(${mouseMovedY2}px)`;
            if (layer4) layer4.style.transform = `translateX(${mouseMovedX3}px) translateY(${mouseMovedY3}px)`;
            if (layer5) layer5.style.transform = `translateX(${mouseMovedX4}px) translateY(${mouseMovedY4}px)`;
            if (layer6) layer6.style.transform = `translateX(${mouseMovedX5}px) translateY(${mouseMovedY5}px)`;
            if (layer7) layer7.style.transform = `translateX(${mouseMovedX6}px) translateY(${mouseMovedY6}px)`;
            if (layer8) layer8.style.transform = `translateX(${mouseMovedX7}px) translateY(${mouseMovedY7}px)`;
        };

        // Intersection Observer 監控元素進入視口時觸發動畫
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 滾動進入視口，觸發滑動效果
                    entry.target.style.transition = "none";  // 不再有過渡動畫
                    entry.target.style.transform = "translateY(0)";
                    entry.target.style.opacity = "1";
                } else {
                    // 滾出視口，保持初始狀態
                    entry.target.style.transform = "translateY(100px)";
                    entry.target.style.opacity = "0";
                }
            });
        });

        // 監聽目標元素
        elems.forEach((elem) => {
            observer.observe(elem);
        });

        // 添加滑鼠移動事件
        document.body.addEventListener("mousemove", handleMouseMove);

        // 清理事件監聽器
        return () => {
            elems.forEach((elem) => {
                observer.unobserve(elem);
            });
            document.body.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
       
        <div id="intro2">
            <div className="paper">
                <img
                    ref={targetRef}
                    className="paper1 laya-please layer-3"
                    data-speed="2"
                    src="/images/paper_1.jpg"
                    alt="paper1"
                />
                <img
                    className="paper2 laya-please layer-4"
                    data-speed="1"
                    src="/images/paper_2.jpg"
                    alt="paper2"
                />
            </div>
            </div>
        
    );
};

export default Intro2Component;
