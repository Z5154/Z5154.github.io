var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');
var ww = window.innerWidth;
var wh = window.innerHeight;
canvas.height = wh;
canvas.width = ww;

//重力
var Gravity = 0.8;
//球组
var ballArray = [];
//当鼠标单击屏幕，在数组中加入一个对象
window.addEventListener('mousedown',function(e){
	if(e.button == 0){
		var ball = new Ball(e.clientX,e.clientY,-10,30,'deeppink');
		ballArray.push(ball);
	}else if(e.button == 2){
		ballArray.pop();
	}
})
//移除鼠标右键上下文监听
document.oncontextmenu = function(){return false};
//document.removeEventListener('contextmenu');
//构造函数
function Ball(x, y, dy, radius, color) {
	//随机左右滚
	this.dx = Math.floor((Math.random()-0.5) * 13) + 1;
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	this.update = function() {
		this.y += this.dy;
		if(this.y + this.radius + this.dy + Gravity >= wh || this.y - this.radius <= 0) {
			this.dy = -this.dy;
			//每次弹跳都衰减x轴、y轴的加速度
			this.dy *= 0.9;
			this.dx *= 0.9;
			if(Math.abs(this.dy) <= 0.1) {
				this.dy = 0;
			}
			if(Math.abs(this.dx) <= 0.1) {
				this.dx = 0;
			}
		} else {
			this.dy += Gravity;
		}
		this.x += this.dx;
		if(this.x + radius >= ww || this.x - radius <= 0){
			this.dx = -this.dx;
		}
		this.draw();
	}
}

//var ball = new Ball(300, 300, 3, 50, 'deeppink');
//ball.update();

function animate() {
	ctx.clearRect(0, 0, ww, wh);
	if(ballArray) {
		for(var ball in ballArray) {
			ballArray[ball].update();
		}
	}
	//	ball.update();
	requestAnimationFrame(animate);
}

animate();