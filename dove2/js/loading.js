//2020-06-03
window.scrollTo(0,0);
var loading = document.getElementById("loading");
var tyle = "css/default.css"
if(sessionStorage.getItem("style")){
	tyle = sessionStorage.getItem("style");
}
var aniTime = 0;
switch(tyle){
	case "css/default.css":aniTime = 0;break;
	case "css/colorBlock.css":aniTime = 2000;break;
}
document.onreadystatechange = function(){
	//如果文档全部加载完成
	if(document.readyState == "complete"){
		window.setTimeout(function(){
			loading.style.display = "none";
		},aniTime);
	}
}
