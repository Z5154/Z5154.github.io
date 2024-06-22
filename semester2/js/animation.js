/*页面交互*/
console.log("页面动画JS已加载");
/*
 * 轮播图
 * 346935060@qq.com
 */
//将图片名存入数组
var imgContent = ["img/slideshow1.jpg","img/slideshow2.jpg","img/slideshow3.jpg"];
var index = 0;
//获取img元素
var img = document.getElementsByClassName("shuffling");
//获取按钮
var lefButton = document.getElementById("leftButton");
var rigButton = document.getElementById("rightButton");
//将图片与元素绑定
for(var i = 0;i < img.length;i++)
{
	img[i].src = imgContent[i];
}
//按钮单击函数
function press(boolean){
	//if(boolean)
	img[index].id = '';
	if(boolean){		//true->图片向右流动
		index ++;
	}else{				//false->图片向左流动
		index --;
		if(index < 0)
		index = img.length - 1;
	}
	img[index %= 3].id = "on";
}
//绑定按钮单击函数
lefButton.onclick = function(){press(false)};
rigButton.onclick = function(){press(true)};
//每过一段时间轮播一次
function auto(){
	press(true);
}
setInterval(auto,5000)
/*
 * 动画
 */
/*获取需要绑定的元素*/
var jitter = document.getElementsByClassName("toJitter");
var Tv = document.getElementsByClassName("toTv");
/*动画绑定函数*/
function animationSeter(obj,Animation){
	obj.style.animation = Animation;
}
/*为toJitter绑定函数*/
for(var j=0;j<jitter.length;j++)
{
	jitter[j].onmouseover = function(){animationSeter(this,"jitter 0.7s");};
	jitter[j].onmouseleave = function(){this.style.animation = ""};
}
/*为toTV绑定函数*/
for(var j = 0;j < Tv.length;j++)
{
	animationSeter(Tv[j],"TVplay 1.5s");
	Tv[j].style.animationFillMode = "forwards";
}
/*
 * 地图
 */
/*地图设置*/
function mapSeter(){
	var map = new BMap.Map("map");
	var point = new BMap.Point(104.793702,31.495834);
	map.centerAndZoom(point, 17);
	var marker = new BMap.Marker(point);        // 创建标注    
	map.addOverlay(marker);                     // 将标注添加到地图中 
	//map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);
}
var Map = document.getElementById("map-container");
var Mapcount = 1;
var Button_map = document.getElementById("button-map");
Button_map.onclick = function(){
	if(Mapcount == 1)
	{
		textColor = "orange";
		code = "绵阳职业技术学院崇实楼";
		Map.style.display = "block";
		Mapcount = 0;
		mapSeter();
		//修正因为动画导致的地图显示错误
		window.setTimeout(function(){
		mapSeter();	
		},1800);
	}else{
		textColor = "#00BFFF";
		code="01";
		Map.style.display = "none";
		Mapcount = 1;
	}
};
/*
 * 搜索框
 */
var search = document.getElementById("search");
var search_text = document.getElementById("search-text");
var search_close = document.getElementById("search-close");
/*点击搜索按钮弹出搜索框*/
search.onclick = function(){
	chance = 0.99;
	textColor = "deeppink";
	code = "search";
	search_text.style.display = "block";
	window.setTimeout(function(){
		search_text.style.top = "0px";
		search_text.style.opacity = "1";
	},40);
}
/*点击关闭按钮关闭搜索框*/
search_close.onclick = function(){
	textColor = "#00BFFF";
	code = "01";
	chance = 0.999;
	search_text.style.top = "-65px";
	search_text.style.opacity = "0";
	window.setTimeout(function(){
	search_text.style.display = "none";
	search_text.style.top = "65px";
	},600);
}
/*
 * 登录栏
 */
var login_button = document.getElementById("login-button");
var login_container = document.getElementById('login-container');
var login_form = document.getElementById("login-form");
var login_close = document.getElementById("login-close");
//登录窗口的弹出效果
login_button.onclick = function(){
	textColor = "blue";
	code = "登录";
	login_container.style.display = "block";
	window.setTimeout(function(){
		login_container.style.width = "370px";
		login_container.style.height = "370px";
		window.setTimeout(function(){
			login_form.style.display = "flex"; 
			window.setTimeout(function(){
				login_form.style.opacity = 1;
			},40);
		},1000);
	},40);
}
//登录窗口关闭效果
login_close.onclick = function(){
	textColor = "#00BFFF";
	code = "01";
	login_form.style.opacity = 0;
	window.setTimeout(function(){
		login_form.style.display = "none";
		window.setTimeout(function(){
			login_container.style.height = "0px";
			login_container.style.width = "0px";
			window.setTimeout(function(){
			login_container.style.display = "none";
			},1000)
		},40);
	},500); 
}
/*天气*/
var weather = document.getElementById("weather");
var Bweather = document.getElementById("Bweather");
var weather_container = document.getElementById("weather-container");
weather.onmouseover = function(){
	Bweather.style.display = "block";
}
weather_container.onmouseleave = function(){
	Bweather.style.display = "none";
}
/*下载框*/
var download_close = document.getElementById("download-close");
var download_btn = document.getElementById("download-btn");
var download = document.getElementById("download");
//打开下载框
download_btn.onclick = function(){
	download.style.display = "flex";
	setTimeout(function(){
		download.style.width = "400px";
		download.style.height = "300px";
	},80);
}
//关闭下载框
download_close.onclick = function(){
	download.style.width = "0px";
	download.style.height = "0px";
	setTimeout(function(){
		download.style.display = "none";
	},500);
}
/*

 * */
/*
 * login_container.style.height = "0px";
	window.setTimeout(function(){
		login_container.style.display = "none";
	},1000)
 */