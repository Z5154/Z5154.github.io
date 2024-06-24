var canvas = document.getElementById("mycanvas");
ww = window.innerWidth;
wh = window.innerHeight;
canvas.width = ww;
canvas.height = wh;
var body = document.getElementById('body');
//body.height = ww;
//body.width = wh;
//body.style.backgroundColor = "deepskyblue";
//创建画笔
var ctx = canvas.getContext("2d");

var x = 0;

function Ball(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.reRadius = this.radius;
	this.maxRadius = this.radius * 3;
	this.color = color;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	this.update = function() {
		if(this.x + this.radius >= ww || this.x - this.radius <= 0) {
			this.dx = -this.dx;
		}
		if(this.y + this.radius >= wh || this.y - this.radius <= 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		//鼠标交互
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if(this.radius < this.maxRadius) {
				this.radius++;
			}
		} else {
			if(this.radius > this.reRadius) {
				this.radius--;
			}
		}

		this.draw();
	}
}
var ballArray = [];
var colorArray = [
	"#f0932b",
	"#eb4d4b",
	"#6ab04c",
	"#c7ecee",
	"#e056fd"
]

var mouse = {
	x: Number,
	y: Number
}
window.addEventListener("mousemove", function(e) {
	mouse.x = e.x;
	mouse.y = e.y;
})
//当窗口大小调整时
window.addEventListener('resize', function(e) {
	ww = window.innerWidth;
	wh = window.innerHeight;
	canvas.width = ww;
	canvas.height = wh;
	init();
})
window.addEventListener("click",function(e){
	console.log(e);
})
function init() {
	ballArray = [];
	for(var i = 0; i < 100; i++) {
		var radius = Math.ceil(Math.random() * 4 + 2);
		var x = Math.floor(Math.random() * (ww - 2 * radius) + radius);
		var y = Math.floor(Math.random() * (wh - 2 * radius) + radius);
		var dx = (Math.random() - 0.5) * 2;
		var dy = (Math.random() - 0.5) * 2;
		var color = Math.floor(Math.random() * 5);
		ballArray.push(new Ball(x, y, dx, dy, radius, colorArray[color]));
	}
}
//动画
function animate() {
	x++;
	ctx.clearRect(0, 0, ww, wh);
	requestAnimationFrame(animate);
	for(var ball in ballArray) {
		ballArray[ball].update();
	}
}
init();
animate();