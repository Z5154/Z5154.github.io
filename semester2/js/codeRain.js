/*代码雨*/
console.log("雨一直一直的下");
var codeRain = document.getElementById("codeRain");
var canvas = codeRain.getContext("2d");
/*获取窗口的宽度和高度*/
var w = window.innerWidth;
var h = window.innerHeight;
/*设置画布的宽高*/
codeRain.width = w;
codeRain.height = h;
/*设置代码雨字体大小*/
var fontsize = 16;
/*设置文字填充颜色*/
var textColor = "#00BFFF";
/*计算一共有多少列代码雨*/
var colunms = Math.floor(w/fontsize);
/*记录文字落下的y轴坐标*/
var drop = [];
/*初始化文字的y轴坐标*/
for(var i = 0;i<colunms;i++)
{
	drop[i] = 1;
}
/*代码雨回归顶部的概率*/
var chance = 0.999;
/*设置代码雨的内容*/
var code = "01";
/*绘制文字坠落的函数*/
function draw(){
	/*设置画布填充色*/
	canvas.fillStyle = "rgba(47,50,56,0.25)";
	/*创建蒙版*/
	canvas.fillRect(0,0,w,h);
	/*给字体设置样式*/
	canvas.font = "700 " + fontsize + "px 微软雅黑";
	/*给字体添加颜色*/
	canvas.fillStyle = textColor;
	/*循环，让文字不断下落*/
	for(i = 0;i<colunms;i++){
		/*使文字随机出现*/
		var index = Math.floor(Math.random() * code.length);		//Math.round生成一个[0,1)的随机数，乘以字符串长度并向下取整，可以获得随机下标
		/*设置x轴*/
		var x = i * fontsize;
		/*设置y轴*/
		var y = drop[i] * fontsize;
		/*绘制文字*/
		canvas.fillText(code[index],x,y);
		if(y >= h && Math.random() > chance){
			drop[i] = 0;			//如果掉落的位置已经在画布外，而且在此次循环中满足随机数的条件的话，设置y轴的坐标原点为0，
									//重新下坠
		}
		/*一次循环后，y轴坐标加1*/
		drop[i] ++;
		/*console.log("雨一直一直的下");*/
	}
}
draw();
/*循环调用,30毫秒执行一次*/
setInterval(draw,30);
/*setInterval('console.log(1)',1000);*/
