window.onload = function(){
	/*弹出框*/
	var li_nav = document.getElementsByClassName('li-nav');
	var pop = document.getElementsByClassName('nav-pop');
	console.log(li_nav);
	li_nav[0].onmouseover = function(){
		pop[0].style.display = "block";
		pop[0].style.animation = "0.25s pop2"
		pop[0].style.animationFillMode = "forwards";
		
	}
	li_nav[0].onmouseleave = function(){
		pop[0].style.animation = "1s pop"
		window.setTimeout(function(){
			pop[0].style.display = "none";
		},1000)
	}
	li_nav[3].onmouseover = function(){
		pop[1].style.display = "block";
		pop[1].style.animation = "0.25s pop3"
		pop[1].style.animationFillMode = "forwards";
		pop[1].style.animationFillMode = "forwards";
	}
	li_nav[3].onmouseleave = function(){
		pop[1].style.animation = "0.5s pop"
		pop[1].style.animationFillMode = "forwards";
		window.setTimeout(function(){
			pop[1].style.display = "none";
		},500)
	}
/*地图*/
	var map_button = document.getElementById("map-button");
	var map = document.getElementById("map_container")
	var flag = true;
	map_button.onclick = function(){
		if(flag){
			map.style.display = "block";
			// mapSeter();
			flag = !flag;
			
		}else{
			map.style.display = "none";
			flag = !flag;
		}
}
	/*轮播*/
	var shu = document.getElementById("shuffling");
	var px = -1250; 
	var count = 1;
	function shuff(count){
		shu.style.left = count * px + "px";
	}
	shuff();
	setInterval(function(){
		shuff(count);
		count++;
		count %= 5
	},4000);
	/*logo*/
	var canvans = document.getElementById("logo");
	var pen = canvans.getContext("2d");
	pen.strokeStyle = "white"
	pen.beginPath();
	pen.arc(50,50,40,0,2*Math.PI);
	pen.stroke();
	pen.closePath();
	pen.fillStyle = "#FFFFFF";
	pen.font = "16px 微软雅黑";
	pen.fillText("西南大学",18,52);
}


