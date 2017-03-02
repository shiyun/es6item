'use strict';

const apiUrl = `http://waliwang.com/rg/nikeapi/getMessageList?limitCount=5`;
const _url = `/api/nikeapi`;

const bgArr = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8','bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8','bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8',];

const pageW=parseInt($(document).width());
const pageH=parseInt($(document).height());
const boxDom=$("#boxDom");
let  Top,Right, width, index = 0;
width=pageW;
let colorArr=["#cfaf12","#12af01","#981234","#adefsa","#db6be4","#f5264c","#d34a74"];

function auto(text, k){
    //let creSpan=$("<span class='string'></span>");
    //creSpan.text(text);
    Top=parseInt(pageH*(Math.random()));
    let num=parseInt(colorArr.length*(Math.random()));
    if(Top>pageH-300){
        Top=pageH-300;
    }
    //creSpan.css({"top":Top,"right":-300,"color":getRandomColor()});
    //creSpan.css({"top":Top, "color":getRandomColor()});
    //boxDom.append(creSpan);
    let spanDom=$("#boxDom>span:eq("+k+")");
    spanDom.css({"top":Top, "color":getRandomColor()}).text(text).addClass('strTrans').on('webkitAnimationEnd', () => {
	   	spanDom.removeClass('strTrans');
	});

    /*
    spanDom.stop().animate({"right":pageW+300},10000,"linear",function(){
        $(this).remove();
    });
    */
}

function getRandomColor(){
    return '#' + (function(h){
        return new Array(7 - h.length).join("0") + h
    })((Math.random() * 0x1000000 << 0).toString(16));
}

setInterval(() => {
	$.ajax({
	    type: 'GET',
	    url: _url,
	    dataType: "json",
	    success: res => {
	    	if(res.code == '1'){
	    		let data = res.data.mgslist, time = 0, t;
		    	if(Array.isArray(data)){
			    	data.map((v, k) => {
			    		time += 2000;
			    		t = setTimeout(() => {
			    			auto(v.content, index)
							index = index++ == 20 ? 0 : index;
			    		}, time);    		
			    		if(k === data.length - 1){
			    			clearTimeout(t);
			    			time = 0;
			    		}
			    	});	
		    	}
	    	}
	    },
	    error: err => {
	    	console.log(2)
	    }
	});	
}, 5000);

setInterval(() => {
	$('body').removeClass().addClass(bgArr[index]);
}, 10000)


/* 手风琴效果
const testData = [
	{cont: 11},
	{cont: 12},
	{cont: 13},
]

const getData = data => {
	let _html = `<li class="fadeIn animated"><ul class="list-photo">`;
	if(Array.isArray(data)){
		data.map(v => {
			_html += `
				<li>
					<img src="../images/loading.gif" class="leftImg">
					<div class="cont">
						<p class="contInfo">${v.cont}</p>
					</div>
				</li>
			`;
		});
		_html += `</ul></li>`;
	}else{
		alert('数据错误')
	}
	return _html;
}

setInterval(()=>{
	const $listItem = $('.list-item');
	if($listItem.find('>li').length >= 3){
		$listItem.animate({'margin-left': '-33.3%'}, 1000, ()=>{
			$listItem.css({'margin-left': 0}).find('>li:eq(0)').remove();
			$listItem.append(getData(testData));
		});
	}else{
		$listItem.append(getData(testData));
	}
}, 2000)

$.ajax({
    type: 'POST',
    url: 'http://www.bao.com',
    data: {id: 1},            
    dataType: "json",
    success: res => {
    	consoe.log(1);
    	let data = res || testData;
    	getData(data);
    },
    error: err => {
    	console.log(2)
    }
});
*/