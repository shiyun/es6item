(function(doc, win) {
	var docEl = doc.documentElement,
		isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

	dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		if (width / dpr > 640) {
			width = 640 * dpr;
		}
		docEl.dataset.width = width;
		docEl.dataset.percent = 100 * (width / 640);
		docEl.style.fontSize = 100 * (width / 640) + 'px';
	};
	recalc();
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window);

Date.prototype.format = function(format){
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}