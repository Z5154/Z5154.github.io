/*模态框*/
//2020-06-03
var help = document.getElementById("help");
var modal_help = document.getElementById("modal_help");
var $modal_help = $("#modal_help");
help.addEventListener("click",function(){$modal_help.modal("show")});
//$modal_help.modal("show")

/*********************
 ***用于显示图片的div***
 *********************/
var works_scale = document.getElementsByClassName("works_scale");	/*获取放大图片按钮*/
var works_img = document.getElementsByClassName("works_img");		/*获取用于放大的图片*/
var show_works = document.getElementById("show_works");             /*获取用于展示图片的img元素*/
var check_work = document.getElementById("check_work");             /*获取用于容纳展示图片的div*/
//var isShow = false;													/*保存用于容纳展示图片的div的状态*/

for(var i in works_scale){
	if(!isNaN(i)){
		works_scale[i].addEventListener("click",function(){
			var index = [].indexOf.call(works_scale,this);
			console.log(index);
			showWorks(index)
			});
	}
}
function setImg(index){
	var src = works_img[index].getAttribute("src");
	show_works.setAttribute("src",src);
}
function openWorks(){
	check_work.style.display = "block";	
}
function showWorks(index){						/*用于展示出展示图片容器的函数*/
	setImg(index);
	openWorks();
	setTimeout(document.addEventListener("click",closeWorks,1));
}
function closeWorks(){
	if(check_work.style.display != "block") return;
	check_work.style.display = "none";
	document.removeEventListener("click",closeWorks());			/*解绑这个事件*/
}
