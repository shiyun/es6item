'use strict';

let counter = 0;
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