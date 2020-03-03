(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
            	docEl.style.fontSize = '116px';
            }else
            if(clientWidth>=720){
            	docEl.style.fontSize = '112.5px';
            }else
            if(clientWidth>=680){
            	docEl.style.fontSize = '106.25px';
            }else
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    setTimeout(showPage,200);
    function showPage(){
    	document.getElementsByTagName("body")[0].style.visibility='visible';
    }
})(document, window);
