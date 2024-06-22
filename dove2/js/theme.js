/*翟维*/
//2020-06-09
console.log(window.sessionStorage.getItem("style"));
var styleSheet = document.getElementById("stylesheet");
var Style = "css/default.css"
if(sessionStorage.getItem("style")){
	console.log(sessionStorage.getItem("style"));
	Style = sessionStorage.getItem("style");
	styleSheet.setAttribute("href",Style);
}
styleSheet.setAttribute("href",Style);