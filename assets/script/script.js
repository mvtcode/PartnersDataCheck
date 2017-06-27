'use strict';
var spinner;
$(function(){
	spinner = $('#spinner');
});

function Alert(msg,title,callback){
	bootbox.alert({
		message:msg,
		size: 'small',
		title: title || 'Thông báo',
		className: 'modal-alert',
		callback: function() {
			if(callback && typeof callback == 'function') callback();
		}
	});
}
function Confirm(msg,title,callback){
	bootbox.confirm({
		message:msg,
		size: 'small',
		title: title || 'Xác nhận',
		callback: function(result) {
			if(callback && typeof callback == 'function') callback(result);
		}
	});
}
function Prompt(title,value,callback){
	bootbox.prompt({
		title: title,
		value: value,
		callback: function(result) {
			if (result === null) callback(null);
			else callback(result);
		}
	});
}

$.ajaxSetup({
	//url: '/ajax',
	type: 'GET',
	//cache: true,//false
	timeout: 30000,
	//async: true,
	//dataType: 'json',
	//data: {param1: 'value1'},
	beforeSend: function(xhr){
		if(spinner) spinner.show();
	},
	statusCode:{
		200:function(){
			//console.log(200);
		},
		404:function(){
			//console.log(404);
		},
		500:function(){
			//console.log(500);
		}
	},
	error:function(xhr,status,error){
		console.log(xhr,status,error);
		ShowMessError(error);
	},
	success:function(result,status,xhr){
		//console.log(result,status,xhr);
	},
	complete: function(xhr,status){
		if(spinner) spinner.hide();
	}
});

function ShowMessError(s){
	var toast = $('.div_msg_error');
	if(s=='') $('.div_msg_error .content').text('Timeout');
	else $('.div_msg_error .content').text(s);
	toast.fadeIn("slow");
	var t = setTime();
	toast.mouseover(function(){
		if(t) clearTimeout(t);
	});
	toast.mouseout(function(){
		t = setTime();
	});
	function setTime(){
		return setTimeout(function(){
			toast.fadeOut("slow");
		},5000);
	}
}

function goToByScroll(id){
	id = id.replace("link", "");
	$('html,body').animate({scrollTop: $(id).offset().top},'slow');
}

jQuery.fn.ForceNumericOnly = function(){
	return this.each(function(){
		$(this).keydown(function(e){
			var key = e.charCode || e.keyCode || 0;
			// allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
			// home, end, period, and numpad decimal
			return (
				key == 8 ||
				key == 9 ||
				key == 13 ||
				key == 46 ||
				key == 110 ||
				key == 190 ||
				(key >= 35 && key <= 40) ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));
		});
	});
};

function SortArray(arr,field,asc){
	if(arr && arr.length>0){
		var length = arr.length;
		var arr_temp = [];
		for(var i=0;i<length;i++){
			var val=arr[0][field];
			var index=0;
			for(var j=1;j<length-i;j++){
				var item = arr[j];
				if(asc){
					if(val>item[field]){
						val = item[field];
						index = j;
					}
				}
				else{
					if(val<item[field]){
						val = item[field];
						index = j;
					}
				}
			}
			arr_temp.push(arr[index]);
			arr.splice(index,1);
		}
		return arr_temp;
	}
	return null;
}

var Urllib = {
	encode: function(a) {
		return encodeURIComponent(a);
	},
	decode: function(a) {
		return decodeURIComponent(a);
	},
	GetQueryString: function() {
		var a = [],hash;
		var b = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < b.length; i++) {
			hash = b[i].split('=');
			a.push(hash[0]);
			a[hash[0]] = unescape(hash[1]);
		}
		return a;
	},
	getIsMobileClient: function(a) {
		var b = navigator.userAgent.toLowerCase();
		var c = ['android', "windows ce", 'blackberry', 'palm', 'mobile'];
		for (var i = 0; i < c.length; i++) {
			if (b.indexOf(c[i]) > -1) {
				return (a) ? (c[i].toUpperCase() == a.toUpperCase()) : true;
			}
		}
		return false;
	}
};

$(document).on("keydown", function (e) {
	if (e.which === 8 && !$(e.target).is("input, textarea")) {
		e.preventDefault();
	}
});

Number.prototype.format = function(n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}