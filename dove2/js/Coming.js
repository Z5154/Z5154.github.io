window.onload = function(){
	//倒计时
	var coming = new Date();
	coming.setFullYear(2020,10,1);
	coming.setHours(0,0,0);
	/*2020-1-1上线*/
	var daytxt = document.getElementById("day");
	var hourtxt = document.getElementById("hour");
	var minutetxt = document.getElementById("minute");
	var secondtxt = document.getElementById("second");
	function countdown(){ 
		var date = new Date();
		var day = Math.floor(coming.getTime()/1000/60/60/24-date.getTime()/1000/60/60/24);
		var hour = Math.floor(coming.getTime()/1000/60/60-date.getTime()/1000/60/60-day*24);
		var minute = Math.floor(coming.getTime()/1000/60-date.getTime()/1000/60-day*24*60-hour*60);
		var second = Math.floor(coming.getTime()/1000-date.getTime()/1000-day*24*60*60-hour*60*60-minute*60);
		daytxt.innerHTML = day;
		hourtxt.innerHTML = hour;
		minutetxt.innerHTML = minute;
		secondtxt.innerHTML = second;
	};
	setInterval(countdown,1000);
	//点击submit，弹出网页上线时间的模态框
	var modal_help = document.getElementById("modal_help");
	var $modal_help = $("#modal_help");
	var submit = document.getElementById("submit");
	submit.onclick = function(){
		if(this.value == "Play"){
			window.open(email.value,false);
		}else{
			$modal_help.modal("show");
		}
	};
	//flag用于记录文本框是否曾获得焦点
	var flag = false;
	//当输入框获得焦点时，改变背景的颜色、输入框的颜色、输入框字体和submit的颜色
	var email = document.getElementById("email");
	var body = document.getElementById("body");
	var color = document.getElementById("color");
	//设置蒙版的宽高为当前窗口的宽高
	var w = window.innerWidth;
	var h = window.innerHeight;
	color.height = h;
	color.width = w;
	email.onfocus = function(){
		//改变蒙版的透明度
		color.style.opacity = 1;
		email.style.color = "#EE5A24";
		submit.style.backgroundColor = "#EE5A24";
		submit.onmouseover = function(){
			submit.style.backgroundColor = "#FFC312";
		}
		submit.onmouseleave = function(){
			submit.style.backgroundColor = "#EE5A24";
		}
		//当输入框获得焦点时，改变输入框内的文本和按钮的文本
		email.value = "snack.html";
		submit.value = "Play";
	}
	email.onblur = function(){
		//改变蒙版的透明度
		color.style.opacity = 0;
		email.style.color = "rgba(15, 188, 249,1.0)";
		submit.style.backgroundColor = "deepskyblue";
		submit.onmouseover = function(){		//当鼠标移到按钮上时会改变样式
			submit.style.backgroundColor = "dodgerblue";
		}
		submit.onmouseleave = function(){
			submit.style.backgroundColor = "deepskyblue";
		}
		/*email.value = "346935060@qq.com";
		submit.value = "SUBMIT";*/
	}
	
}
/*setInterval(console.log(1),1000);*/