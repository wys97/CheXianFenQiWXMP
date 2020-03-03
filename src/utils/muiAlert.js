
export function $resError(mes){//请求后台api 弹出返回的错误信息
	mui.toast(
	'<div  class="toast_content" >'+
	'<i class="mui-icon iconfont icon-roundclose"></i>'+
	'<div class="toast_text">'+mes+'</div>'+
	'</div>');
}
export function $subError(mes){//前端效验表单提交得弹窗提示
	mui.toast(
	'<div  class="toast_content" >'+
	'<div class="toast_text">'+mes+'</div>'+
	'</div>');
}