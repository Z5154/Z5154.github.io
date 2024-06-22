var key = false;
var popImgArray = [
{"imgLeft":"img/basketball_younger.png","imgRight":"img/basketball_olderman2.png"},
{"imgLeft":"img/5223ac5c95d79c7b23aef.png","imgRight":""},
{"imgLeft":"img/pixel_monster2.gif","imgRight":"img/pixel_girl2.gif"},
{"imgLeft":"img/Robat2.png","imgRight":"img/Robat1.png"}
];
var backgroundImgArray = ["url(img/work3.jpg)","url(img/girl2.jpeg)","url(img/pixel_city.gif)","url(img/kehuan.jpg)"];
var $member = $(".member");
var $pop_image_left = $(".pop_image_left");
var $pop_image_right = $(".pop_image_right");
var $introduce_member = $("#introduce_member");
var $dove = $("#dove");
var introduce_team = document.getElementById("introduce_team");
$member.mouseover(function(e){
	var i = $member.index(this);
	console.log(i);
	$pop_image_left.css("display","block");
	$pop_image_right.css("display","block");
	$pop_image_left.find("img").attr("src",popImgArray[i].imgLeft);
	$pop_image_right.find("img").attr("src",popImgArray[i].imgRight);
	$introduce_member.css("background-image",backgroundImgArray[i]);
})
$member.mouseleave(function(e){
	$pop_image_left.css("display","none");
	$pop_image_right.css("display","none");
})
/*地图*/
function mapSeter(){
	var map = new BMap.Map("map");
	var point = new BMap.Point(104.793702,31.495834);
	map.centerAndZoom(point, 17);
	var marker = new BMap.Marker(point);        // 创建标注    
	map.addOverlay(marker);                     // 将标注添加到地图中 
	map.enableScrollWheelZoom(true);
}
var Map = document.getElementById("map");
var Mapcount = 1;
		textColor = "orange";
		code = "绵阳职业技术学院崇实楼";
		Map.style.display = "block";
		Mapcount = 0;
		mapSeter();
//轮播
var bn = document.getElementById("bn");
var banner_img = document.getElementsByClassName("banner_img");
var index = 0;
var toLeft = document.getElementById("toLeft");
var toRight = document.getElementById("toRight");
var banner_choose = document.getElementById("banner_choose");
var choose_item = document.getElementsByClassName("choose_item");
//毛秋月
//$(function(){
//	var index=0;
//	function dingshiqi(){
//	var f=setInterval(function(){
//		if(index==$(".banner_img").length-1){
//			index=0;
//			$(".banner_img").css("opacity","0");
//			$(".banner_img").eq(index).css("opacity","1");
//		}else{
//			index++;
//			$(".banner_img").css("opacity","0");
//			$(".banner_img").eq(index).css("opacity","1");
//		}
//	},2000)}
//
//	$(".botton").click(function(){
//		clearInterval(f);
//		var indexx=$(this).index();
//		index=indexx;
//		$(".banner_img").css("opacity","0");
//		$(".banner_img").eq(index).css("opacity","1");
//		dingshiqi();
//	})
//})
//毛秋月
function press(boolean){
	banner_img[index].id = '';
	choose_item[index].className = "choose_item";
	if(boolean){		//true->图片向右流动
		index ++;
		reBanner();
	}else{				//false->图片向左流动
		index --;
		if(index < 0)
		index = banner_img.length - 1;
		reBanner();
	}
	banner_img[index %= banner_img.length].id = "on";
	choose_item[index].className = "choose_item active";
}
function choose(){				//这个函数的作用是点击小点跳转到对应图片
	for(var i in choose_item){
		var count = 0;
		choose_item[i].onclick = function(){
			var item = this.getAttribute("data-index");
			banner_img[index].id = '';
			choose_item[index].className = "choose_item";
			index = item;
			banner_img[index %= banner_img.length].id = "on";
			choose_item[index].className = "choose_item active";
			reBanner();
		}
	}
}
choose();
toLeft.onclick = function(){
	press(false);
}
toRight.onclick = function(){
	press(true);
}
function auto(){
	press(true);
}
var banner =  setInterval(auto,5000);		//计时器，五秒调用一次
function reBanner(){
	clearInterval(banner);					//清除定时器，重新产生一个新的定时器，并将它的id付给banner
	banner =  setInterval(auto,5000);
}
/*边栏导航*/
var conf = document.getElementById("conf");
$conf = $("#conf");
var cbList_container = document.getElementById("cbList_container");
var cbList = cbList_container.getElementsByTagName("li");
var flag = true;
conf.onclick = function(){
	if(flag){
		cbList_container.style.height = "500px";
		cbList_container.style.overflow = "visible";
		$conf.attr("data-content","点此按钮关闭导航");
	}else{
		cbList_container.style.height = "40px";
		cbList_container.style.overflow = "hidden";
		$conf.attr("data-content","点此按钮以打开导航");
	}
	flag = !flag;
}
//确认是否开启地下室通道
if(sessionStorage.getItem("key")){
	$dove.attr({"data-content":"尝试撬锁","href":"web-desktop/index.html"});
}
//侧边栏——回到顶部
var toTop = document.getElementById("toTop");
var rocket = toTop.getElementsByTagName("svg")[0];
function backTop(dom){
	var dom = dom;
	if(dom.style.animation != "" ){
		return;
	}else{
		console.log("火箭发射！！！");
		window.setTimeout(function(){clearAni(dom)},2000);
		dom.style.animation = "2s rocket";
	}
}
function clearAni(dom){
	dom.style.animation = "";
}
toTop.addEventListener("click",function(){backTop(rocket)});

/*******************
 ********风格切换********
 ********************/
var Style = ["css/default.css","css/colorBlock.css","css/pixelWorld.css"]
var toTqStyle = document.getElementById("toTqStyle");
var colorCarton = document.getElementById("colorCarton");
var toDefaultStyle = document.getElementById("toDefaultStyle");	/*默认风格按钮*/
var styleSheet = document.getElementById("stylesheet");			/*获取样式链接*/
//切换到唐强的鎏金时代风格
//tqStyle.addEventListener("click",function(){
//	console.log(styleSheet.setAttribute("href",Style[0]));
//});
//切换到默认风格
toDefaultStyle.addEventListener("click",function(){
	styleSheet.setAttribute("href",Style[0]);
	sessionStorage.setItem("style",Style[0]);
	if(sessionStorage.getItem("style"))
		{
			console.log("目前存储的风格是:" + sessionStorage.getItem("style"));
		};
	location.reload();
});
//切换到彩色方块风格
colorCarton.addEventListener("click",function(){
	styleSheet.setAttribute("href",Style[1]);
	sessionStorage.setItem("style",Style[1]);
	if(sessionStorage.getItem("style"))
		{
			console.log("目前存储的风格是:" + sessionStorage.getItem("style"));
		};
	sessionStorage.setItem("key",true);
	location.reload();
});
