
import axios from 'axios';
const protocol=location.protocol;
var oproto = Object.prototype;
var serialize = oproto.toString;
var Rxports = {
	/**
	  * 封装axios，方便自定义拓展
	  * @param {Object} headers			自定义请求headers
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数data形式
	  * @param {Object} params			请求参数params形式
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
	  * @param {Function} error		发送请求前
	  * @param return
	*/
	// 对axios封装，赞未开放
	axios(opt){//全局ajax方法，封装成和jquery的ajax方法差不多。
		var opts = opt || {};
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		axios({
			headers: opts.headers || {
				'Content-Type':'application/x-www-form-urlencoded'
			},
			async:opts.async || false,
			method: opts.method || 'post',
			// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。本项目统一使用绝对路径的url
            //线上环境使用
            // baseURL:`${protocol}//${location.host}`,
            // baseURL:`https://sui.work.com`,
            //开发环境使用
			// baseURL:`http://172.22.41.80:8880`,
			url: opts.url,
			timeout: opts.timeout || 15000,
			responseType: opts.responseType || 'json',
			data:opts.data||{},
			params:opts.params||{}
		}).then(function(res){
			if(res.status == 200 ){
				if(opts.success){
					opts.success(res.data,res);
				}
			}else{
				if (data.error) {
					opts.error(error);
				}else{
					console.log('好多人在访问呀，请重新试试[timeout]');
				}
			}
		}).catch(function (error){
			console.log(error);
			if (opts.error) {
				opts.error(error);
			}else{
				console.log('好多人在访问呀，请重新试试[timeout]');
			}
		});
	},
	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	isArrayLike:function(obj) {
	    if (!obj)
	        return false
	    var n = obj.length
	    if (n === (n >>> 0)) { //检测length属性是否为非负整数
	        var type = serialize.call(obj).slice(8, -1)
	        if (/(?:regexp|string|function|window|global)$/i.test(type))
	            return false
	        if (type === "Array")
	            return true
	        try {
	            if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
	                return /^\s?function/.test(obj.item || obj.callee)
	            }
	            return true
	        } catch (e) { //IE的NodeList直接抛错
	            return !obj.window //IE6-8 window
	        }
	    }
	    return false
	},
	/*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
    each: function (obj, fn) {
    	var That = this;
        if (obj) { //排除null, undefined
            var i = 0
            if (That.isArrayLike(obj)) {
                for (var n = obj.length; i < n; i++) {
                    if (fn(i, obj[i]) === false)
                        break
                }
            } else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
                        break
                    }
                }
            }
        }
    },
	/**
	  * 获取url传过来的参数
	  * @param name 	获取的参数
	  * @param Url 		自定义获取参数的链接
	  * @param return
	*/
	getUrlQuery:function (name,Url){//获取url内的参数。
	   //URL GET 获取值
　　   const reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"),
             url = Url || location.href;
　　     if (reg.test(url))
		 //console.log(decodeURI(RegExp.$2.replace(/\+/g, " ")).slice('?')[0]);
　　     return decodeURI(RegExp.$2.replace(/\+/g, " ").split("#")[0].split("?")[0]);
　　     return "";
	},
	//字数过滤器
	filterString : function (str,len) {//字数过滤器，超出字数显示“...”。
		if(str==null){
			return ' ';
		}else{
			if(str.length>len){
				return str.substring(0,len)+"...";
			}else if(!str.length){
				return '无';
			}else{
				return str;
			}
		}
	},
	// 去除html标签样式
	removeHTMLTag:function (str) {
        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
        str = str.replace(/(^\s*)|(\s*$)/g, "");//去掉前后所有空格的字符串
        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
        return str;
	},
    //过滤掉html代码中的img标签
    filterImg:function(str){
        var reTag = /<img(?:.|\s)*?>/g;
        var filterResult = str.replace(reTag,"");
        return filterResult
    },
	baseFn:function () {//全局事件，不需要DOM渲染完成后执行的全局方法。
		// document.documentElement.style.fontSize = document.documentElement.clientWidth < 768 ? document.documentElement.clientWidth / 7.5 + 'px': 100 + 'px';
		// sid是跟踪来源信息
		let sid=this.getUrlQuery('sid');
		if(sid){
			sessionStorage.setItem('sid',sid);
		}
	},
	baseDomFn:function () {//全局事件，需要在DOM渲染完成后再执行的全局方法。
		const topBtn = document.querySelectorAll(".top_back");
		if (topBtn) {
			for (let i = 0; i < topBtn.length; i++) {
				topBtn[i].onclick = function () {
					if (history.length >= 2) {
						history.back(-2);
					} else if (history.length == 1 && document.referrer.length > 0) {
						history.back(-1);
					} else {
						location.href = '/index.html';
					}
				}
			}
		}

		const closeBtn=document.querySelectorAll(".top_close");
		if(closeBtn.length){
			let ua = navigator.userAgent.toLowerCase();
			for(let i=0;i<closeBtn.length;i++){
				closeBtn[i].onclick=function () {
					if(ua.indexOf('micromessenger') != -1){
						WeixinJSBridge.call('closeWindow');
					}else{
						location.href="/";
					}
				}
			}
		};
		
	},
	addHandler: function (element, type, handler) {//添加事件监听器。
       if (element.addEventListener) {
           element.addEventListener(type, handler, false);
       } else if (element.attachEvent) {
           element.attachEvent("on" + type, handler);
       } else {
           element["on" + type] = handler;
       }
	},
	getCookie:function (name){//获取cookie
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	},
	isLogin:function () {//判断用户是否登录，获取user对象，对象属性uid,token。
		if(localStorage.login_user){
			let login_user=JSON.parse(localStorage.login_user);
			return login_user;
		}else{
			let login_user={
				uid:'0',
				token:'0'
			}
			return login_user;
			//alert("请登录后继续访问！")
			// if(type){
			// 	return false;
			// }
			// location.href="/login/login.html";
		}
	},
	checkPhone:function(phone,error=false,type=0){ //正则检测手机号格式  默认返回true，type=1时返回false
	  if(!(/^1[3|4|5|7|8|9][0-9]{9}$/.test(phone))){
	    return error;
	  }else if(type==1){
	   	return false;
	  }else{
	  	return true;
	  }
	},
	isCardNo:function(idCard,error){//正则检测身份证格式
	   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	   let reg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
	   if(reg.test(idCard) === false){
	        return  error;
	   }else{
	   		return false;
	   }
	},
	compare:function(val,type='desc'){ //type等于desc的时候为降序,默认是降序。 排序方法
		return function (obj1,obj2) {
			const val1=obj1[val],val2=obj2[val];
			if(type=='desc'){
				return val1 <= val2?1:-1;
			}else{
				return val1 <= val2?-1:1;
			}
		}
	},
	setSeoFn(title='精益看板',keywords='精益看板',description='精益看板'){
		let head=document.getElementsByTagName('head')[0];
		let oTitle=document.getElementsByTagName('title')[0];
		let oKeywords=document.createElement('meta');
		let oDescription=document.createElement('meta');
		oKeywords['name']='keywords';
		oKeywords['content']=keywords;
		oDescription['name']='description';
		oDescription['content']=description;
		oTitle.innerText=title;
		head.appendChild(oKeywords);
		head.appendChild(oDescription);
	},
	getSource(){
		let sid=sessionStorage.getItem('sid');
		if(window.__wxjs_environment === 'miniprogram'&&!sid){
			return 'miniprogram';
		}
		console.log('sid：'+sid);
		return  sid;
	},

	checkBack(){
	  if(history.length>=2){
	    const topBtn=document.querySelectorAll(".top_back");
	    if(topBtn){
	    	for(let i=0;i<topBtn.length;i++){
	    		topBtn[i].onclick=function () {
	    			if(history.length>=2){
	    				history.back(-2);
	    			}else if(history.length==1&&document.referrer.length>0){
	    				history.back(-1);
	    			}else{
	    				location.href='/index.html';
	    			}
	    		}
	    	}
	    	return true;
	    }else{
	    	return false;
	    }

	  }
	},
    rsaString(){ //登陆注册用到的rsa加密
        let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDfiIhWoRZffHs/cedr1MnBKzl36aQPiaZCfQp88Ydfs1b7Mgd63wpSEkQSZlWn9L6aCNgBYw+54b1IaErilSH/M/xRi2FimBG+LXiOUD7+myY14Fkus3fkEwm4EDRqkqs02aZ277IAD1IA0Oq72Z8mITiCgNcx5fFKUKHi7xI1fwIDAQAB';
        return publicKey
	},
	userAgent:{
		ifIos(){  //判断是否苹果手机
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS){
				return true
			}else{
				return false
			}
		},
		ifAndroid(){  //判断是否安卓手机
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isAndroid){
				return true
			}else{
				return false
			}
		},
		ifWeiXin(){
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if (isWeixin) {
				return true;
			}else{
				return false;
			}
		}
	},

    getTopTitle:function (title) {   //自定义设置头部标题(待完善)
        document.title = title;
		let ios = this.ifIos();
        if(ios){
        	let t = title;
            document.setTitle = function(t) {
                document.title = t;
                var iframe = document.createElement('iframe');
                iframe.style.visibility = 'hidden';
                iframe.setAttribute('src', 'loading.png');
                var iframeCallback = function() {
                    setTimeout(function() {
                        iframe.removeEventListener('load', iframeCallback);
                        document.body.removeChild(iframe);
                    }, 0);
                };
                iframe.addEventListener('load', iframeCallback);
                document.body.appendChild(iframe);
            }
        }
    },
	// 图片预加载
	preloadImages(str){
		let loadedImage = 0;
		let newImages = [];
		let arr = str.match(/src="(.+)"\s{1}/g)
		console.log('arr:'+JSON.stringify(arr));
		return new Promise((resolve,reject)=>{
			for(let i=0;i<arr.length;i++){
				newImages[i] = new Image();
				newImages[i].src = arr[i].slice(5,-2);
				newImages[i].onload = ()=>{
					loadedImage++
					if(loadedImage === arr.length){
						resolve();
					}
				}
				newImages[i].onerror=()=>{
					reject();
				}
			}
		})
	},
    /**
     * JS日期格式化函数
     */
    timeFormat(sj){
        let now = new Date(sj);
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        let date=now.getDate();
            // let   hour=now.getHours();
            // let   minute=now.getMinutes();
            // let   second=now.getSeconds();
            // return   year+"."+month+"."+date+"   "+hour+":"+minute+":"+second;
        return   year + "." + month + "." + date
    },
    /**
     * 剔除富文本html标签，留下纯文本
     */
    getSimpleText(html){
		let re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
		let msg = html.replace(re1,'');//执行替换成空字符
		return msg;
	},
	/**
     * 防抖方法--延迟一段时间再执行函数
     */
	debounce(fn, wait) {
		var timer = null;
		return function () {
			var context = this
			var args = arguments
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(function () {
				fn.apply(context, args)
			}, wait)
		}
	},
		/**
	 * 存储localStorage
	 */
	setStore(name, content){
		if (!name) return
		if (typeof content !== 'string') {
		content = JSON.stringify(content)
		}
		window.localStorage.setItem(name, content)
	},
	/**
	 * 获取localStorage
	 */
	getStore(name){
		if (!name) return
		let parseValue
		let value = window.localStorage.getItem(name)
		// json.stringify/json.parse 转数字，当超过18位，尾数会变0
		if (!isNaN(value)) {
		value = '"' + value + '"'
		}
		try {
		parseValue = JSON.parse(value)
		} catch (error) {
		parseValue = value
		}
		return parseValue
	},
	getDate(){
		//日期时间处理
			function conver(s) {
			return s < 10 ? '0' + s : s;
		}
		var myDate = new Date();
	 
		 //获取当前年
		var year = myDate.getFullYear();
	 
		//获取当前月
		var month = myDate.getMonth() + 1;
	 
		 //获取当前日
		 var date = myDate.getDate();
		 var h = myDate.getHours(); //获取当前小时数(0-23)
		 var m = myDate.getMinutes(); //获取当前分钟数(0-59)
		 var s = myDate.getSeconds();
	 
		//获取当前时间
		return  year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
	 },
	//  限制中英文皆可输入的文本框长度
	 checkLength (str, max){
		   console.log(typeof max)
		   var reg = /[\u4e00-\u9fa5]/g;	
	　　　　var num = 0;    //用以计算当前字符串是否超过max
	　　　　var oStr = '';    //将没有超过max的字符保存
	　　　　var outNum = 0;    //最终计算没有超过max的字符
	　　　　for(var i = 0,len = str.length; i < len; i++){   //遍历字符串
	　　　　　　if(reg.test(str[i])){          //如果匹配中文正则的，num累加3，否则累加1
	　　　　　　　　num += 2;
	　　　　　　}else{
	　　　　　　　　num += 1;
	　　　　　　}
	　　　　　　if(num > max){        //如果num超过max，跳出循环
	　　　　　　　　console.log(num);
	　　　　　　　　break;
	　　　　　　}else{             //如果num不超过max，将此时的字符累加到oStr中，将此时的字节数赋值给outNum
	　　　　　　　　oStr += str[i];
	　　　　　　　　outNum = num;
	　　　　　　}
	　　　　}
	　　　　var obj = {
	　　　　　　text: oStr,
	　　　　　　sum: outNum
	　　　　}
	　　　　return obj;     //返回
	}
	 
	 
};
export default Rxports;