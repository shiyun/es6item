'use strict';

const apiUrl = `http://prod.waliwang.com/rg/nikeapi/getMessageList?limitCount=5`;
const _url = `/api/nikeapi`;

const bgArr = ['1', '2', '3', '4', '5', '6', '7', '8','9','10','1', '2', '3', '4', '5', '6', '7', '8','9','10',];

const pageW=parseInt($(document).width());
const pageH=parseInt($(document).height());
const boxDom=$("#boxDom");
let Top,Right, width=pageW, index = 0, n = 0, hn = parseInt(pageH / 70), auton = 1;
let colorArr=["#cfaf12","#12af01","#981234","#adefsa","#db6be4","#f5264c","#d34a74"];

let arr1 = [1, 3], arr2 = [0, 2, 4];
/*
 *按照屏幕高度计算
 *
 let arr1 = [], arr2 = [];
 for(let i=0; i<hn; i++){
	if(i%2 == 0){
		arr1.push(i);
	}else{
		arr2.push(i);
	}
}
*/
//console.log(`arr1: ${arr1}`)
//console.log(`arr2: ${arr2}`)
//arr1 = arr1.sort((a,b) => Math.random()-0.5);
//arr2 = arr2.sort((a,b) => Math.random()-0.5);
let n1 = arr1.length - 1, n2 = 0;
function auto(text, k){
    //let creSpan=$("<span class='string'></span>");
    //creSpan.text(text);
    /*let n = parseInt(Math.random()*hn);
    if(tmpn != n){
    	tmpn = n;
    }else{
    	tmpn = parseInt(Math.random()*hn) == n ? (parseInt(Math.random()*hn) == n ?  (parseInt(Math.random()*hn) == n ? parseInt(Math.random()*hn) : 1) : 1) : 1;
    }*/
    let n;
    if(auton % 2 == 1){
    	n = arr1[n1];
    	n1 = n1-- == 0 ? arr1.length -1 : n1;
    	//let a = arr1[parseInt(Math.random()*arr1.length)];
    	//n = a == tmp1 ? arr1[parseInt(Math.random()*arr1.length)] : a;
    	//tmp1 = n;
    	//n = tmpcur == tmp1 ? arr1[parseInt(Math.random()*arr1.length)] : tmp1;
    }else{
    	n = arr2[n2];
    	n2 = n2++ == arr2.length-1 ? 0 : n2;
    	//let a = arr2[parseInt(Math.random()*arr2.length)];
    	//n = a == tmp2 ? arr2[parseInt(Math.random()*arr2.length)] : a;
    	//tmp2 = n;
    	//n = tmpcur == tmp2 ? arr2[parseInt(Math.random()*arr2.length)] : tmp2;
    }
    //console.log(`n: ${n}`)
    auton ++;
    Top = 70 * n + parseInt(boxDom.offset().top);
    //let num=parseInt(colorArr.length*(Math.random()));
    /*if(Top>pageH-300){
        Top=pageH-300;
    }*/
    //creSpan.css({"top":Top,"right":-300,"color":getRandomColor()});
    //creSpan.css({"top":Top, "color":getRandomColor()});
    //boxDom.append(creSpan);
    let spanDom=$("#boxDom>span:eq("+k+")");
    //spanDom.css({"top":Top, "color":getRandomColor()}).text(text).addClass('strTrans').on('webkitAnimationEnd', () => {
    spanDom.css({"top":Top}).text(text).addClass('strTrans').on('webkitAnimationEnd', () => {
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
	    url: apiUrl,
	    dataType: "json",
	    success: res => {
	    	if(res.code == '1'){
	    		let data = res.data.msglist, time = 0, t;
		    	if(Object.prototype.toString.call(data).indexOf('Array') > -1){
			    	data.map((v, k) => {
			    		time += 2000;
			    		t = setTimeout(() => {
			    			auto(v, index)
							index = index++ == 20 ? 0 : index;
			    		}, time);    		
			    		if(k === data.length){
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
	n = n++ == 19 ? 0 : n;
	$('.bgImg').removeClass('opa');
	$(`.bg${bgArr[n]}`).addClass('opa');
}, 5000)


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