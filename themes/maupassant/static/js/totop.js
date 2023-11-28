$(window).scroll(function() {
    $(window).scrollTop() > 500 ? $("#rocket").addClass("show") : $("#rocket").removeClass("show");
});
$("#rocket").click(function() {
    $("#rocket").addClass("launch");
    $("html, body").animate({
        scrollTop: 0
    }, 500, function() {
        $("#rocket").removeClass("show launch");
    });
    return false;
});

   
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
} 

$.shuicheMouse({
    type:getRandomInt(11)+1, 
    color:false
})

if(L2Dwidget){
  L2Dwidget.init({
  "model": {
      jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
      "scale": 1
  },        
  "display": {
      "superSample": 2,
      "width": 200,//宽度
      "height": 400,//高度
      "position": "right",//位置，right,left
      "hOffset": 47,
      "vOffset": 95
  }
  });
}

document.oncopy = function addLink(e){
 	e.preventDefault();
 	//获取复制的文本内容
 	var selection = window.getSelection();
 	//获取当前网页地址
 	// var localLink = document.location.href;
 	var appendLink =  '————————————————' + '\r\n' + $('.post-archive').text();
	var text = e.clipboardData.getData("text");
 	var copyText = "";
	var conn = '\r\n';
 	if (selection) {
		copyText = selection + conn + appendLink;		
	}else {
		copyText = text + conn + appendLink;		 		
	}     

 	if(e.clipboardData){
		e.clipboardData.setData('text',copyText)
	}else{
		//在ie中 clipboardData是window的属性
		window.clipboardData.setData('text',copyText);
	}
 }



/* 鼠标特效*/ 
var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        var a = new Array("❤感谢观看❤","❤","❤喜欢就点个赞呗❤","❤❤","❤快去点赞❤","❤❤❤","❤不是点这里哦❤","❤❤","❤点赞在底部啦❤","❤","❤❤");
        var $i = $("<span></span>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
        y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
        1500,
        function() {
            $i.remove();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const container = document.querySelector('.post');

    // 检测用户的主题偏好
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('preferColor', prefersDarkMode);	
    // 根据用户主题偏好应用相应的样式
    if (prefersDarkMode) {
        body.classList.add('dark-theme');
        container.style.backgroundColor = '#333333';
        container.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.1)';
    } else {
        body.classList.add('light-theme');
        container.style.backgroundColor = '#f0f0f0';
        container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    }
});
