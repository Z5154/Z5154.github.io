$(function(){
	//这是本打算隐藏在网页中的一个贪吃蛇小游戏，因为技术和时间的限制已经无法完成
	var $body = $("body");
	//获取窗口大小
	var H = window.innerHeight;
	var W = window.innerWidth;
	//蛇的尺寸
	var snack_body = 10;
	//设置body尺寸
	$body.css({"height":H,"width":W});
	/*$body.css("width",W);*/
	console.log(W,H);
	var stop;
	//设置贪吃蛇地图的列宽
	var $map = $("#wall");
	var mapHeight = $map.height();
	var mapWidth = $map.width();
	var column = mapHeight/10;
	var row = mapWidth/10;
	//控制方向的全局变量
	var L=R=T=B = 0;
	console.log("四个方向的初始值是:L,R,T,B",L,R,T,B);
	console.log("地图有",column,"行，",row,"列");
	var decoration = 0;		//表明方向和计数器状态
	//分数和其他数据
	var score = 0;
	//速度speed
	var speed = 200;
	//是否死亡
	var died = false;
	//死亡函数
	function die(){
		alert("收获死亡");
		window.location.reload();
	}
	//获取分数容器
	var $score = $("#score");
	//获取按钮组
	var $li = $("#container li");
	var $content = $(".content");
	//音乐
	var $background_music = $("#bacMusic");		//获取背景音乐
	var $eatFood = $("#eatFood");			//获取食物的音乐
	var $boom = $("#boom");					//获取撞击或者咬到自己的音乐
	var $goal = $("#goal");                  //获取得分的分数
	var $bac = $(".bac");
	//改变背景颜色
	function change(color,color2,color3,color4){		//第一个参数控制背景和外廓线，第二个参数边框颜色，第三个参数控制地图背景色，第四个参数文字颜色
		$body.css("background-color",color);
		$map.css("outline",color + " double 4px");
		$li.css("background-color",color);
		$score.css({"background-color":color,"border":color2 + " 2px solid","color":color4});
		$enemy.css({"background-color":color,"border":color2 + " 2px solid","color":color4});
		$content.css("background-color",color);
	}
	//对话框
	var $enemy = $("#enemy");		//对话框容器
	var $enemy_talk = $("#enemy_talk");   //对话内容
	var $me = $("#enemy_me");
	//一个对话框消失的函数，用于平滑两个对话框之间的过渡
	function talk(obj){
		var obj = obj;
		obj.css({"transition":"0.2s","opacity":"0","top":"530px"});		//让对话框往上移动20像素，然后消失
		setTimeout(function(){
			obj.css({"transition":"0s","top":"800px"});			//偷偷将对话框移到最下面
			setTimeout(function(){
				obj.css({"transition":"0.5s","opacity":"1","top":"550px"});		//然后再次将对话框返回	
			},40);
		},200);
	}
	//成就栏
	var $ach = $("#achievement");
	function ach(str){
		$goal[0].play();
		$ach.css({"top":"180px","opacity":"1"});
		$ach.html("获得成就-" + str);
		setTimeout(function(){
			$ach.css({"top":"160px","opacity":"0"});
			setTimeout(function(){
				$ach.css({"top":"200px"});
			},540);				//三百四十毫秒后将成就栏归位
		},4000);										//两秒后消除成就
	}
	//让元素抖动的动画
	//判断分数改变游戏进度的函数
	function mScore(score){
		var $snack = $(".snack");
		switch(score){
			case 1:
			$score.css({"opacity":"1","top":"200px"});		//计分板出现
			$goal[0].play();				//阶段音乐
			$enemy.css({"opacity":"1","top":"550px"});	    //弹出第一个对话框
			$enemy_talk.html("欢迎来到这个游戏，你刚才拿到了你的第一分！你可以看到右上角的得分栏吗？");
			ach("初见");
			break;
			case 2:
			talk($enemy);
			$enemy_talk.html("对了，请在全屏模式下游玩本作");
			break;
			case 10:
			$snack.css("background-color","rgba(235, 77, 75,1.0)");
			$goal[0].play();
			talk($enemy);   //调用talk函数，营造对话框动画效果
			$me.attr("src","me/smile.png");
			$enemy_talk.html("你现在获得了10分了哟，随着分数的提高游戏会发生阶段性的事件，通常这会在游戏中有所体现");
			break;
			case 15:
			talk($enemy);   //调用talk函数，营造对话框动画效果
			$enemy_talk.html("在下的名字是34255，也可以叫我5154");
			ach("你的名字");
			break;
			case 20:
			$snack.css("background-color","rgba(72, 52, 212,1.0)");
			$goal[0].play();
			talk($enemy);
			$me.attr("src","me/formality.png");
			$enemy_talk.html("其实由于编者水平有限所以游戏里依然存在一些不愉快的BUG，但是如果你能玩得开心就好了！");
			break;
			case 21:
			talk($enemy);
			$me.attr("src","me/smile.png");
			$enemy_talk.html("接下来我会告诉你一些会影响游戏的BUG，请注意听讲");
			ach("引路人");
			break;
			case 22:
			talk($enemy);
			$enemy_talk.html("不要过快的改变自己的方向，这可能会导致移动速度过快的异常，需要尽可能的避免精细操作");
			break;
			case 23:
			talk($enemy);
			$enemy_talk.html("食物偶尔会生成在与你身体同样的位置上，不过只有蛇头才具有吃到它的能力");
			break;
			case 24:
			talk($enemy);
			$enemy_talk.html("如果咬到自己或者是撞上墙壁的话就Game Over了，这是贪吃蛇的通用法则");
			break;
			case 25:
			talk($enemy);
			$enemy_talk.html("其实不会啦");
			break;
			case 26:
			talk($enemy);
			$me.attr("src","me/formality.png");
			$enemy_talk.html("因为这个我最后懒得加入这个功能了");
			break;
			case 27:
			talk($enemy);
			$me.attr("src","me/smile.png");
			$enemy_talk.html("所以就算是因为失误撞到墙上或者咬到自己的话也只会弹出个警告框而已，点掉就可以换个方向继续玩了");
			break;
			case 28:
			talk($enemy);
			$enemy_talk.html("如果想增加挑戰性的話就在挂后用f5自裁吧");
			break;
			case 29:
			talk($enemy);
			$enemy_talk.html("你注意到蛇身颜色的变化了吗？");
			break;
			case 30:
			$snack.css("background-color","rgba(190, 46, 221,1.0)");
			$goal[0].play();
			talk($enemy);
			$enemy_talk.html("新的color");
			break;
			case 35:
			talk($enemy);
			$enemy_talk.html("感觉渐渐上手了呢");
			ach("渐入佳境");
			break;
			case 36:
			talk($enemy);
			$enemy_talk.html("第一个贪吃蛇是谁写的呢");
			break;
			case 40:
			$snack.css("background-color","#e84393");
			$goal[0].play();
			talk($enemy);
			$enemy_talk.html("你已经拿到40分了，还不错");
			break;
			case 44:
			talk($enemy);
			$me.attr("src","me/indifference.png");
			$enemy_talk.html("真冷啊，感觉一年比一年冷了");
			break;
			case 46:
			talk($enemy);
			$enemy_talk.html("ヽ冷(´ー`)ﾉ");
			break;
			case 48:
			talk($enemy);
			$me.attr("src","me/smile.png");
			$enemy_talk.html("");
			break;
			case 50:
			$goal[0].play();
			$snack.css("background-color","rgba(106, 176, 76,1.0)");
			talk($enemy);
			$me.attr("src","me/formality.png");
			$enemy_talk.html("哦，50分了！");
			break;
			case 55:
			talk($enemy);
			$enemy_talk.html("稍微提醒一下，如果之前确实撞到墙了的话现在的分数可算是掺水的哟");
			break;
			case 60:
			$goal[0].play();
			$snack.css("background-color","rgba(240, 147, 43,1.0)");
			talk($enemy);
			$me.attr("src","me/smile.png");
			$enemy_talk.html("60分了");
			break;
			case 63:
			talk($enemy);
			$me.attr("src","me/indifference.png");
			$enemy_talk.html("63分...");
			break;
			case 64:
			talk($enemy);
			$enemy_talk.html("了不起");
			break;
			case 65:
			talk($enemy);
			$me.attr("src","me/formality.png");
			$enemy_talk.html("第一次有人走到这里，应该奖励一下");
			break;
			case 66:
			talk($enemy);
			$me.attr("src","me/smile.png");
			$enemy_talk.html("要我给阁下加点分吗？这对我来说很简单的");
			break;
			case 69:
			talk($enemy);
			$enemy_talk.html("才不帮你作弊");
			break;
			case 70:
			$goal[0].play();
			$snack.css("background-color","#6c5ce7");
			talk($enemy);
			$enemy_talk.html("一直都是我在自说自话来着......");
			ach("孤独");
			break;
			case 71:
			talk($enemy);
			$enemy_talk.html("话说，阁下觉得这个游戏有通关的说法吗");
			ach("讲述者");
			break;
			case 72:
			talk($enemy);
			$enemy_talk.html("哈哈，不可能的吧，通常来说贪吃蛇这种游戏都只是单纯的得分得分挑战新纪录而已");
			break;
			case 73:
			talk($enemy);
			$enemy_talk.html("什么，阁下不信？");
			break;
			case 74:
			talk($enemy);
			$enemy_talk.html("是觉得我在骗阁下吗，阁下觉得这个游戏会有通关这种说法吗，难道我会是友好NPC之类的吗，没有啦");
			break;
			case 75:
			talk($enemy);
			$enemy_talk.html("毕竟这游戏里面连失败都没有");
			$background_music[0].pause();
			break;
			case 77:
			talk($enemy);
			$enemy_talk.html("就算有...也没人可以做到的");
			break;
			case 78:
			talk($enemy);
			$enemy_talk.html("因为如果真的有人相信这个游戏有通关的可能的话");
			break;
			case 79:
			talk($enemy);
			$enemy_talk.html("那我就成不了友好NPC了");
			break;
			case 80:
			$goal[0].play();
			$snack.css("background-color","rgba(75, 75, 75,1.0)");
			talk($enemy);
			$enemy_talk.html("我会是魔王");
			ach("RPG游戏");
			speed = 100;		//改变蛇的速度
			$background_music.children("source")[0].src = "audio/cheating.mp3";
			$background_music.children("source")[1].src = "audio/cheating.wav";		//改变BGM
			$background_music[0].load();		//重新加载音频
			$background_music[0].play();		//播放加载后的新音频
			break;
			case 82:
			/*talk($enemy);*/					//这里就不用加入动画了，直接改变文本
			$me.attr("src","me/Laugh.png");
			$me.css("animation","jitter 0.1s 3 linear");	//给头像加一个抖动动画
			setTimeout(function(){
				$me.css("animation","");					//消除动画
			},650);								
			$enemy_talk.html("别死了哦");
			break;
			case 84:
			talk($enemy);
			$me.attr("src","me/smile.png");
			$enemy_talk.html("觉得依仗着没有死亡系统就像通关是不可能的");
			break;
			case 86:
			talk($enemy);
			$me.attr("src","me/Laugh.png");
			$enemy_talk.html("哈哈哈哈很久没有当过BOSS了！！心情舒畅啊");
			talk($enemy)
			break;
			case 88:
			talk($enemy);
			$me.attr("src","me/smile.png");
			$enemy_talk.html("哦，阁下还能撑啊");
			break;
			case 89:
			talk($enemy);
			$enemy_talk.html("是因為怎麼玩都不會死嗎");
			break;
			case 90:
			$goal[0].play();
			talk($enemy);
			$me.attr("src","me/Laugh.png");
			$enemy_talk.html("那現在呢");
			died = true;				//开启死亡
			change("black","white","#636e72","white");		//改变背景颜色风格
			$snack.css("background-color","black");
			ach("拥抱死亡 & 灾变");
			break;
			case 92:
			talk($enemy);
			$enemy_talk.html("去死去死去死去死");
			break;
			case 93:
			talk($enemy);
			$enemy_talk.html("木大木大木大！！！");
			break;
			case 94:
			/*talk($enemy);*/
			$me.css("animation","jitter 0.1s 21 linear");	//给头像加一个抖动动画		一个长长的wryyyyyyyyyy!!!!
			setTimeout(function(){
				$me.css("animation","");					//消除动画
			},2100);
			$enemy_talk.html("wryyyyyyyy!");
			ach("吸血鬼");
			break;
			case 95:
			talk($enemy);
			$me.attr("src","me/pain.jpg")
			$enemy_talk.html("痛！！！！");
			break;
			case 98:
			talk($enemy);
			$me.attr("src","me/indifference.png");
			$enemy_talk.html("可恶");
			break;
			case 99:
			talk($enemy);
			$me.attr("src","me/pain.jpg");
			$enemy_talk.html("我错了！！！");
			break;
			case 100:
			$goal[0].play();
			$me.css("animation","jitter 0.1s 6 linear");	//给头像加一个抖动动画
			setTimeout(function(){
				$me.css("animation","");					//消除动画
			},650);
			$enemy_talk.html("AWSL！！！");
			$snack.css("background-color","rgba(237, 76, 103,1.0)");$goal[0].play();
			ach("通关者");
			change("deeppink","white","white","white");		//修改颜色
			break;
			case 101:
			talk($enemy);
			break;
			default:break;
		}
	}
	//告知玩家当前分数
	function callScore($dom){
		$dom.html("SCORE:" + score);
	}
	//随机生成一个“食物”
	var $food = $("#food");
	var foodx = foody = 0;	//初始化食物坐标
	function food(){
		/*$map.append("<div id='food'></div>");*/
		//食物出现的x轴随机
		$food.css("left",Math.floor(Math.random()*column)*snack_body);
		foodx = $food.css("left");
		console.log(foodx);
		//食物出现的Y轴随机
		$food.css("top",Math.floor(Math.random()*row)*snack_body);
		foody = $food.css("top");
		console.log(foody);
	};
	food();
	//碰撞检测，看蛇是否成功吃到了食物
	function crash(x,y,obj2){
		/*console.log(parseInt(x));*/
		//Math.abs(parseInt(y) - parseInt(obj2.style.top) <=10) && Math.abs(parseInt(x) - parseInt(obj2.style.left)) <= 10
		//
		//isDead($snack);//在此之前看蛇是否咬到了自身
		if(y == obj2.style.top && x == obj2.style.left){	//如果对象和对象2的top值和left值相等
			$eatFood[0].play(); //播放吃到食物的音频
			return true;
		}
		return false;
	}
	//产生一条“蛇”
	$snack = $(".snack");
	function drawSnack(){
		$snack[0].style.left = Math.floor(column/2) * 10 + "px";
		$snack[0].style.top = Math.floor(column/2) * 10 + "px";
	}
	drawSnack();
	//控制蛇尾的位置
	function tail(select){		//传入一个选择器，将蛇尾的位置设置为上一个蛇尾的位置
		var $obj = $(select);
		/*console.log($obj,$obj.length);*/
		for(var i = $obj.length - 1;i > 0;i --){
			$obj[i].style.left = $obj[i-1].style.left;
			$obj[i].style.top = $obj[i-1].style.top;
		}
	}
	//控制蛇的移动
	function toLeft(item){
		item.style.left = parseInt(item.style.left) - L*snack_body + "px";
		/*console.log("目前蛇的X轴坐标是",item.style.left);
		console.log("目前蛇的Y轴坐标是",item.style.top);*/
	}
	function toRight(item){
		item.style.left = parseInt(item.style.left) + R*snack_body + "px";
		/*console.log("目前蛇的X轴坐标是",item.style.left);
		console.log("目前蛇的Y轴坐标是",item.style.top);*/
	}
	function toUp(item){
		item.style.top = parseInt(item.style.top) - T*snack_body + "px";
		/*console.log("目前蛇的X轴坐标是",item.style.left);
		console.log("目前蛇的Y轴坐标是",item.style.top);*/
	}
	function toBottom(item){
		item.style.top = parseInt(item.style.top) + B*snack_body + "px";
		/*console.log("目前蛇的X轴坐标是",item.style.left);
		console.log("目前蛇的Y轴坐标是",item.style.top);*/
	}
	//判断蛇是否撞上了墙壁,如果如果撞上墙壁，则返回true，没有撞上墙壁返回false,这里的参数是一个DOM对象
	function isWall(item){
		if(parseInt(item.style.left) < 0 || parseInt(item.style.left) > 490 || parseInt(item.style.top) < 0 || parseInt(item.style.top) > 490 ){
			$boom[0].play();
			alert("撞墙了");
			if(died){
				die();
			}		//如果满足死亡条件，达成死亡
			return true;
		}
		return false;
	}
	//判断蛇是否撞上了自身,传入一个选择器
	function isDead(select){
		var $ele = $(select);		//将这个选择器变成一个jQuery对象
		/*$ele.each(function(i){
			
		});*/
		for(var i = 0;i<$ele.length;i++){
			console.log($ele.length);
			if(i > 2 && $ele[0].style.top == $ele[i].style.top && $ele[0].style.left == $ele[i].style.left)		//当满足蛇身任意部位与蛇头重合
			{
				$boom[0].play();
				alert("吃到了自己");
				if(died){
					die();
				}		//如果满足死亡条件，达成死亡
				return true;
			}
		}
		/*console.log("还没死");*/
		return false;
	}

	//让蛇持续移动
	/*function toMove(decoration,boolean){
		console.log("toMove()的decoration是",decoration);
		var dec = decoration;
		stopMove = setInterval(function(decoration){	
			decoration = dec;
			console.log("stopMove的decoration是",decoration);
			switch(decoration){
				case "L":toUp($snack[0]);break;
				case "R":toRight($snack[0]);break;
				case "T":toUp($snack[0]);break;
				case "B":toBottom($snack[0]);break;
			}
			if(isWall($snack[0])){
				clearInterval(stopMove);
			}
		},200);
	}*/
	/*function toMove(fn,time){	//传入一个函数，一个时间，让这个函数按指定的时间调用
		console.log("正在运行")
		var fn = fn;
		var time = time;
		var interval = setInterval(function(fn){
			console.log("正在运行1")
			fn();
			if(isWall($snack[0])){		//如果撞上墙了的话，就停止计时器的运行
				clearInterval(interval);
			}
		},time);
	}*/
	var mode = 4;		//表明当前方向，上下左右分别对应0 、1、2、3
	//键盘监听,蛇的移动控制
	$(window).keydown(function(event){
		switch(event.keyCode){
			case 87:
			if(mode != 1 && T != 1){			//不允许出现反方向移动,不允许在一个方向多次输出
				mode = 0;			//调整方向状态
				L=R=B=0;T=1;//改变各个方向的属性
				tail(".snack");
				toUp($snack[0]);
				/*console.log($food.offsetTop,$food.offsetLeft);*/
				/*toMove()*/
				if(decoration !=1 ){
					var interval = setInterval(function(){
						isDead(".snack");
						tail(".snack");
						toUp($snack[0]);
						if(crash(foodx,foody,$snack[0])){
							/*console.log("吃到了");*/
							/*$("div").remove("#food");*/	//移除这个元素	
							food();                         //重新设定食物的位置
							$map.append("<div class='snack'></div>");  //添加蛇尾
							tail(".snack");  //控制蛇尾的位置
							score += 1;						//加一分
							mScore(score);						//判断状态
							callScore($score);   //更新分数面板
						}
					if(isWall($snack[0]) || T==0){		//如果撞上墙了的话，就停止计时器的运行,同时只能存在一个计数器
						clearInterval(interval);
					}
					/*console.log("decoration的值是",decoration);*/
				},speed);
			}
			decoration = 1;		//改变状态，表明此时已经有一个计数器
			/*toMove(toUp($snack[0]),200);*/
			}
			break;
			case 83:
			if(mode != 0 && B != 1){
				mode = 1;		//调整方向状态
				L=R=T=0;B=1;
				tail(".snack");
				toBottom($snack[0]);
				if(decoration != 2){
					var interval = setInterval(function(){
					isDead(".snack");
					tail(".snack");
					toBottom($snack[0]);
					if(crash(foodx,foody,$snack[0])){
						/*console.log("吃到了");*/
						/*$("div").remove("#food");*/	//移除这个元素	
						food();                         //重新设定食物的位置
						$map.append("<div class='snack'></div>");  //添加蛇尾
						tail($snack);  //控制蛇尾的位置
						score += 1;						//加一分
						mScore(score);						//判断状态
						callScore($score);   //更新分数面板
					}
						if(isWall($snack[0]) || B==0){		//如果撞上墙了的话，就停止计时器的运行,同时只能存在一个计数器
							clearInterval(interval);
						}
					/*console.log("decoration的值是",decoration);*/
				},speed);
			}
			decoration = 2;
			}
			break;
			case 65:
			if(mode != 3 && L != 1){
				mode = 2;		//调整方向状态
				B=R=T=0;L=1;
				isDead(".snack");
				tail(".snack");
				toLeft($snack[0]);
				if(decoration != 3){
					var interval = setInterval(function(){
					isDead(".snack");
					tail(".snack");
					toLeft($snack[0]);
					if(crash(foodx,foody,$snack[0])){
						/*console.log("吃到了");*/
						/*console.log("食物与蛇的坐标",foodx,foody,$snack[0].style.left,$snack[0].style.top);*/
						/*$("div").remove("#food");*/	//移除这个元素	
						food();                         //重新设定食物的位置
						$map.append("<div class='snack'></div>");  //添加蛇尾
						tail($snack);  //控制蛇尾的位置
						score += 1;						//加一分
						mScore(score);						//判断状态
						callScore($score);   //更新分数面板
					}
					if(isWall($snack[0]) || L == 0){		//如果撞上墙了的话，就停止计时器的运行,同时只能存在一个计数器
						clearInterval(interval);
					}
						/*console.log("decoration的值是",decoration);*/
					},speed);
				}
			decoration = 3;
			/*toMove(toLeft($snack[0]),200);*/
			}
			break;
			case 68:
			if(mode != 2 && R!=1){
				mode = 3;		//调整方向状态
				L=B=T=0;R=1;
				console.log(score);
				tail(".snack");
				toRight($snack[0]);
				if(decoration != 4){
					var interval = setInterval(function(){
						isDead(".snack");
						tail(".snack");
						toRight($snack[0]);
						if(crash(foodx,foody,$snack[0])){
							/*console.log("吃到了");*/
							/*$("div").remove("#food");*/	//移除这个元素	
							food();                         //重新设定食物的位置
							$map.append("<div class='snack'></div>");  //添加蛇尾
							tail($snack);  //控制蛇尾的位置
							score += 1;						//加一分
							mScore(score);						//判断状态
							callScore($score);   //更新分数面板
					}
					if(isWall($snack[0]) || R == 0){		//如果撞上墙了的话，就停止计时器的运行,同时只能存在一个计数器
						clearInterval(interval);
					}
					/*console.log("decoration的值是",decoration);*/
					},speed);
				}
			decoration = 4;
			}
			break;
			default:console.log("未录入此键盘事件");
		}
	})
	//碰撞检测
});