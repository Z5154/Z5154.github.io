/*
 * 2019年11月11日08:42:52
 *作者：@346935060
 * 练手代码，顺便完成期末项目
 * 
 */
/*鼠标样式*/
window.onload = function(){
	//函数区
	//设置鼠标指针图片的函数
	//设置单个元素
	console.log("鼠标样式JS已加载");
	//三个参数分别代表传入的元素、指针样式和默认样式
	function mousePointer(Id,pointer,defaultPointer){		
		Id.style.cursor = "url('" + pointer + "')" + "," + defaultPointer;
	}
	//设置多个元素
	function mousePointers(elements,pointer,defaultPointer){
		for(var i = 0;i < elements.length;i++)
		{
			elements[i].style.cursor = "url('" + pointer + "')" + "," + defaultPointer;
		}
	}
	/*
	 * 结构区，利用已实现的函数实现效果
	 * 
	 */
	/*var uesrname = document.getElementById("user_name");*/
/*	mousePointer(uesrname,"css/pointer/Glows_Normal.cur","text");*/
//鼠标在input上的表现
	var user = document.getElementsByTagName("input");
	for(var i in user)
	{
		user[i].onfocus = function(){mousePointers(user,"css/pointer/Glows Handwriting (1).cur","text");};
		user[i].onblur = function(){mousePointers(user,"css/pointer/Glows Handwriting (2).cur","text");};
	}
//鼠标在textarea上的表现
	var textarea = document.getElementsByTagName("textarea");
	for(var i in textarea)
	{
		textarea[i].onfocus = function(){mousePointers(textarea,"css/pointer/Glows Handwriting (1).cur","text");};
		textarea[i].onblur = function(){mousePointers(textarea,"css/pointer/Glows Handwriting (2).cur","text");};
	}
//鼠标指针在.mainnav上面的表现
	var mainnav = document.getElementsByClassName("mainnav");
	for(var i in mainnav)
	{
		mainnav[i].onmouseover = function(){mousePointers(mainnav,"css/pointer/Glows_Link.cur","pointer");popin(this)};
	}
//鼠标在body上的表现
	var body = document.getElementsByTagName("body");
	body[0] = function(){mousePointers(body,"css/pointer/Glows_Normal.cur","default")};
	body[0].onmousedown =function(){mousePointers(body,"css/pointer/Glows Unavailable.cur","default")};
	body[0].onmouseup =function(){mousePointers(body,"css/pointer/Glows_Normal.cur","default")};
//鼠标在P文本上的表现
	var p = document.getElementsByTagName("p");
	mousePointers(p,"css/pointer/Glows Text (1).cur","text");
//鼠标在搜索上的表现
	var search = document.getElementById("search");
	mousePointer(search,"css/pointer/Glows_Link.cur","pointer");
//鼠标指针在a标签上面的表现
	var a = document.getElementsByTagName("a");
	/*for(var j=0;j<a.length;j++){
		a[j].style.color = "deeppink";
		console.log("a",j);
	}*/
	for(var j in a)
	{
		a[j].onmouseover = function(){mousePointers(a,"css/pointer/Glows_Link.cur","pointer")};
		
	}
}

	
	
/*var s = [1, 2, 3, 4, 5];
var use = document.getElementsByTagName("input");
for(var i = 0;i < use.length;i++)
{
	use[i].onfocus = function(){
		use[i].style.cursor = "url('css/pointer/Glows Handwriting (1).cur'),text";
	}
	use[i].onblur = function(){
		use[i].style.cursor = "url('css/pointer/Glows Handwriting (2).cur'),text";
	}
}*/
/*use.onfocus = function(){
	use.style.cursor = "url('css/pointer/Glows Handwriting (1).cur'),text";
}
use.onblur = function(){
	use.style.cursor = "url('css/pointer/Glows Handwriting (2).cur'),text";
}*/