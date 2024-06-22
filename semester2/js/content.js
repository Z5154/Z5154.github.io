console.log("内容JS已加载")
/*这个JS的作用是给网页提供内容*/
var logo = document.getElementById("logo");
/*绘图*/
var canvas = logo.getContext("2d");
//canvas.fillStyle = "transparent";	//设置画布背景色为透明
//调整线条宽度
canvas.lineWidth = "2";
//调整线条颜色
canvas.strokeStyle = "dodgerblue";
//获取画布的宽高
var w = logo.width;
var h = logo.height
//绘制矩形框
console.log(w,h);
canvas.rect(0,0,w,h);
canvas.stroke();
//设置文字样式
canvas.font = "60px comic sans ms";
// 创建线性渐变
var gradient=canvas.createLinearGradient(0,0,w,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
//设置填充颜色
canvas.fillStyle = gradient;
//设置文字位置
/*canvas.fillText("Demo",80,100);*/
//绘制圆形图案
function draw(x,y,r){
	canvas.beginPath();
	canvas.arc(x,y,r,0,2*Math.PI);
	canvas.stroke();
	canvas.closePath();
}
canvas.lineWidth = "5";
draw(170,20,15);
draw(120,124,15);
draw(130,54,15);
draw(180,94,15);
/*控制文本域内容*/
var textArea = document.getElementById("user_message");
textArea.value = "";
