var Util = function () {
    var isEmail = function (emailStr) {
        var emailPat=/^(.+)@(.+)\.(.+)$/;
        //var matchArray=emailStr.match(emailPat);
        var matchArray2=emailPat.test(emailStr);
        return matchArray2;
        /*
        if (matchArray==null) {
            return false;
        }
        return true;*/
    };

	//验证身份证
	var isCardNo = function(cardNum){
		var cardPat = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
		return cardPat.test(cardNum);
	};

	//验证多少位数
	var isLenNum = function(arg, num){
		var reg = eval("/^\\d{"+num+"}$/");
		return reg.test(arg);
	};

	var isBankCard = function(arg){
		var reg = eval("/^\\d{15,20}$/");
		return reg.test(arg);
	};

    var isPhone = function(phone){
        return /^[1](\d{10})$/.test(phone);
    };

    var isSMSCode = function (code) {
        return code.match(/^\d{6}$/);
    };

	var isEmptyData = function(checkData) {
		if (checkData === '' || checkData === null || checkData === undefined || checkData === 'undefined'){
			return true;
		}
		else {
			return false;
		}
	};

	var getQueryString = function(url) { 
		if(url) { 
			url=url.substr(url.indexOf("?")+1); //字符串截取，比我之前的split()方法效率高 
		} 
		var result = {}, //创建一个对象，用于存name，和value 
			queryString = url || location.search.substring(1), //location.search设置或返回从问号 (?) 开始的 URL（查询部分）。 
			re = /([^&=]+)=([^&]*)/g, //正则，具体不会用 
			m; 
		while (m = re.exec(queryString)) { //exec()正则表达式的匹配，具体不会用 
			result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]); //使用 decodeURIComponent() 对编码后的 URI 进行解码 
		} 
		return result; 
	}; 

	var accMul = function(arg1, arg2) {
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		}
		catch (e) {
		}
		try {
			m += s2.split(".")[1].length;
		}
		catch (e) {
		}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	};

	var readFile = function(obj, cb){   
			var file = obj.files[0];      
			//判断类型是不是图片  
			if(!/image\/\w+/.test(file.type)){     
					alert("请确保文件为图像类型");   
					return false;   
			}   
			var reader = new FileReader();   
			reader.readAsDataURL(file);   
			reader.onload = function(e){   
				cb && cb(this.result); //就是base64 						   
			}   
	} 

	var getLocalTime = function(nS) {     
       return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    }  

    return {
        isEmail:isEmail,
        isPhone:isPhone,
        isSMSCode:isSMSCode,
		isCardNo: isCardNo,
		isLenNum: isLenNum,
		isEmptyData: isEmptyData,
		accMul: accMul,
		getQueryString: getQueryString,
		isBankCard:isBankCard,
		readFile: readFile,
		getLocalTime: getLocalTime
    };
};
