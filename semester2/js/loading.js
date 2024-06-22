var load = document.getElementById("loading");
var loads = document.getElementsByClassName("loads");
load.style.width = window.innerWidth + "px";
load.style.height = window.innerHeight + "px";
console.log("load");
//给子div分时绑定动画，使其一不同的节奏播放
loads[0].style.animation ="4s loading infinite";
window.setTimeout(function(){
	loads[1].style.animation ="4s loading infinite";
		window.setTimeout(function(){
			loads[2].style.animation ="4s loading infinite";
				window.setTimeout(function(){
					loads[3].style.animation ="4s loading infinite";
				},500);
		},500);
},500);

//监听加载状态改变
document.onreadystatechange = function(){
	if(document.readyState == "complete"){
		console.log("加载完成");
		window.setTimeout(function(){
			load.style.display = "none";
		},2000);	//在加载完成2秒以后调用
	}
}