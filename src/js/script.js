//---漢堡按鈕---
$(document).ready(
    function () {
        $('.hamburger').click(function () {
            $(this).toggleClass('is-active');
            $('.navigation').toggleClass('show');
        });

        // 指定 menu 滾動效果
        $('.menu a').click(function(){
            // 取得屬性值 也就是href 裡面內容#video
            let btn =$(this).attr('href');
            // 取得相對座標位置 (top,left)
            let pos =$(btn).offset(); 
        });
    });