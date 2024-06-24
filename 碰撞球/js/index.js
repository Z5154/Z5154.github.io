/*
 * 产生随机数
 * @param{*} low
 * @param{*} high
 */
function radomIntFromRange(low,high){
	return Math.floor(Math.random() * (high - low + 1) + low);
}

//产生随机浮点数
function radomFloatFromRange(low,high){
	return Math.random() * (high - low + 1) + low;
}

//产生随机颜色
function radomColor(colors){
	return colors[Math.floor(Math.random() * colors.length)];
}

//计算两个点的距离
function getDistance(x1,y1,x2,y2){
	var dx = x1 - x2;
	var dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy);
}

var canvas = document.getElementById('canvas');
var wh = window.innerHeight;
var ww = window.innerWidth
canvas.height = wh;
canvas.width = ww;

//创建绘制上下文
var ctx = canvas.getContext('2d');
window.addEventListener('resize',function(){
	wh = window.innerHeight;
	ww = window.innerWidth
	canvas.height = wh;
	canvas.width = ww;
	init();
});

var colorArray = [
	'red',
	'blue',
	'deeppink',
	'deepskyblue'
]

function Particle(x,y,dx,dy,radius,color){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
		ctx.fill();
		ctx.closePath();
	}
	this.update = function(){
		if(this.x + this.radius + this.dx >= ww || this.x - this.radius <= 0){
			this.dx = -this.dx;
		}
		if(this.y + this.radius + this.dy >= wh || this.y -this.radius <=0 ){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y +=this.dy;
		this.draw();
	}
}
//球组
var ballArray = [];

function init(){
	ballArray = [];
	for(var i = 0;i < 100;i ++){
		var radius = radomIntFromRange(15,20);
		var x = radomIntFromRange(radius,ww-radius);
		var y = radomIntFromRange(radius,wh - radius);
		//初始化时不重叠
		//循环必须得到限制，否则在小屏幕下会陷入死循环,这里限制每个对象最多尝试50次，50次尝试失败则选择可以重叠
		var count = 0;
		for(var j = 0;j < ballArray.length; j++){
			if(getDistance(x,y,ballArray[j].x,ballArray[j].y) <= radius + ballArray[j].radius){
				x = radomIntFromRange(radius,ww-radius);
				 y = radomIntFromRange(radius,wh - radius);
				 j = -1;
				 count ++;
			}
			if(count >= 50){
				break;
			}
		}
		var dy = radomFloatFromRange(-1,1);
		var dx = radomFloatFromRange(-1,1);
		var color = radomColor(colorArray);
		var ball = new Particle(x,y,dx,dy,radius,color);
		ballArray.push(ball);
	}
}

function animate(){
	ctx.clearRect(0,0,ww,wh);
	for(var i in ballArray){
		ballArray[i].update();
	}
	requestAnimationFrame(animate);
}
init();
animate();
//console.log(ballArray[0]);
//console.log(ballArray[0].y);
//ballArray[0].draw();
