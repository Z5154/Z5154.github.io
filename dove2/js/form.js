/*翟维-表单验证*/
//2020-06-04
var username = document.getElementById("username");
var $username = $("#username");
var email = document.getElementById("email");
var $email = $('#email');
var textarea = document.getElementById("textarea");
var $textarea = $("#textarea");
var phone = document.getElementById("phone");
var $phone = $("#phone");
var submit = document.getElementById("submit");
var contact = [username,email,textarea,phone];		//一个存储了联系表单中需要验证的表单项的数组
var $contact = [$username,$email,$textarea,$phone];

var nameForHelp = document.getElementById("nameForHelp");
var $nameForHelp = $("#nameForHelp");
var emailForHelp = document.getElementById("emailForHelp");
var $emailForHelp = $("#emailForHelp");
var textareaForHelp = document.getElementById("textareaForHelp");
var $textareaForHelp = $("#textareaForHelp");
var submitForHelp = document.getElementById("submitForHelp");
var help = [nameForHelp,emailForHelp,textareaForHelp];		//一个存储了帮助表单中需要验证的表单项的数组
var $help = [$nameForHelp,$emailForHelp,$textareaForHelp];

var toopTip = [$username,$email,$textarea,$phone,$nameForHelp,$emailForHelp,$textareaForHelp];		//一个存储了所有表单中需要工具提示的表单项的数组

var success = true;		//用于记录表单是否验证成功
//非空验证
function checkNull(domArray,$domArray){
	for(var i in domArray){
		if(domArray[i].value){
			console.log(domArray[i].id + "：" + domArray[i].value);
		}else{
			setToolTitle($domArray[i],$domArray[i].attr("data-title") + "不能为空！");
			console.log("这个元素的标题是：" + $domArray[i].attr("data-title"));
			setToolTip($domArray[i]);
			domArray[i].isNull = true;
			success =  false;
		}
	}
}
//姓名验证
function checkName(dom,$dom){
	if(dom.isNull) return;
	var name = dom.value;
	var nameCheck = new RegExp(/^[A-Za-z\u4E00-\u9FA5]{2,15}$/);
	if(nameCheck.test(name)) return
	success =  false;
	if($dom){
		setToolTitle($dom,"请输入至少两位字母或者汉字");	
		setToolTip($dom);
		return
	}
	alert("请输入至少两位字母或者汉字");
}
//电话号码验证
function checkPhone(dom,$dom){
	if(dom.isNull) return;			//如果这个dom元素已经判断为空的话，退出函数
	var phoneNumber = dom.value;
	var phoneCheck = new RegExp(/^1[3456789]\d{9}$/);
	console.log(dom.value);
	console.log(phoneCheck.test(phoneNumber));
	if(phoneCheck.test(phoneNumber)) return;		//如果输入正确则不触发提示直接返回
	success =  false;
	if($dom){
		setToolTitle($dom,"请输入正确格式的11位手机号码");	
		setToolTip($dom);
		return;
	}
	alert("请输入正确格式的13位手机号码");
}
//邮箱验证
function checkEmail(dom,$dom){
	if(dom.isNull) return;
	var email = dom.value;
	var emailCheck = new RegExp(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/);
	if(emailCheck.test(email)) return;
	success =  false;
	if($dom){
		setToolTitle($dom,"请输入正确的邮箱格式");	
		setToolTip($dom);
		return
	}
		alert("请输入正确的邮箱格式");
}
//文本验证
function checkText(dom,$dom){
	if(dom.isNull) return;
	var text = dom.value;
	var textCheck = new RegExp(/^[\s\S]*.*[^\s][\s\S]*$/);
	if(textCheck.test(text)) return;
	success =  false;
	if($dom){
		setToolTitle($dom,"请确认文本中有可用字符");	
		setToolTip($dom);
		return
	}
	alert("请确认文本中有可用字符");
}
//设置所有元素开始时的状态
function reSetDom(domArray){
	for(var i in domArray){
		domArray[i].isNull = false;
	}
}

//用于联系验证
function contactVa(domArray){
	success = true;
	reSetDom(domArray);
	checkNull(domArray,$contact);
	checkPhone(phone,$phone);
	checkEmail(email,$email);
	checkName(username,$username);
	checkText(textarea,$textarea);
	console.log(success);
}
//帮助模态框的验证
function helpVa(domArray){
	reSetDom(domArray);
	checkNull(domArray,$help);
	checkName(nameForHelp,$nameForHelp);
	checkEmail(emailForHelp,$emailForHelp);
	checkText(textareaForHelp,$textareaForHelp);
}
submit.addEventListener("click",function(){
	contactVa(contact);
	if(success){
		window.open("Coming.html",true);
	}
	});
submitForHelp.addEventListener("click",function(){helpVa(help)});
/*********************
 ******工具提示********
 *********************/
function setToolTitle($dom,string){			//用于设置工具提示的文本内容，第一个参数是绑定工具提示的jquery对象，第二个参数是显示的文本内容
	$dom.attr("data-original-title",string);
}
function setToolTip($dom){					//用于绑定工具提示，第一个参数是绑定工具提示的jquery对象
	$dom.tooltip('show');
	setTimeout(function(){$dom.tooltip('hide')},5000);
}
//setToolTip($username);