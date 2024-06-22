/*弹出框JS*/
console.log("弹出框JS已加载");
var i;
var mainnav = document.getElementsByClassName("mainnav");/*获取主导航子元素*/
var pop = document.getElementsByClassName("pop");/*获取弹出框*/
var pop_li = document.getElementsByClassName("pop_li");/*获取弹出框子元素*/


/*pop弹出框*/
function popin(pop){
		pop.firstElementChild.style.display = "block";
		pop.firstElementChild.style.animation = "popin 0.5s";
		pop.firstElementChild.style.animationFillMode="forwards";
		console.log("锵！");
	}

for(i = 0;i < mainnav.length;i++)
{		
		mainnav[i].onmouseleave = function(){this.firstElementChild.style.display = "none";}
}