export function GetQueryString(name) { 
	var after = window.location.hash.split("?")[1];
    if(after){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = after.match(reg);
        if(r != null)
        {
            return  decodeURIComponent(r[2]);
        }
        else
        {
            return null;
        }
    }  
}
export function clearNoNum(val) { 
	val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
  	val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的   
  	val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
  	val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
  	if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
   		val= parseFloat(val);  
  	}  
  	return val;
}