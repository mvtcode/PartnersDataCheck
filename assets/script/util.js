'use strict';
var util = {
	isOnlyNumber: function (s) {
		var pattern = /^\d$/;
		return pattern.test(s);  // returns a boolean
	},
	isNumber: function (s) {
		var pattern = /^(\-)?\d+(\.\d+)?$/;
		return pattern.test(s);  // returns a boolean
	},
	isInt: function (s) {
		var pattern = /^(\-)?\d+$/;
		return pattern.test(s);  // returns a boolean
	},
	isPhoneNumber: function (s) {
		var pattern = /^0(9\d{8}|1\d{9})$/;
		return pattern.test(s);  // returns a boolean
	},
	isEmail: function (s) {
		var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return pattern.test(s);  // returns a boolean
	},
	isUsername: function (s) {
		var pattern = /^[a-z][a-z0-9_]{5,29}$/;
		return pattern.test(s);  // returns a boolean
	},
	isPassword: function (s) {
		var pattern = /^.{6,30}$/;
		return pattern.test(s);  // returns a boolean
	},
	isNameVi: function (s) {
		var pattern = /[a-zA-Z áàảãạăâắằấầặẵẫậéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼÊỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵỷỹ]{2,30}/;
		return pattern.test(s);
	},

	// Validates that the input string is a valid date formatted as "dd/mm/yyyy"
	isValidDate: function (s) {
		// First check for the pattern
		if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s))
			return false;

		// Parse the date parts to integers
		var parts = s.split("/");
		var day = parseInt(parts[0], 10);
		var month = parseInt(parts[1], 10);
		var year = parseInt(parts[2], 10);

		// Check the ranges of month and year
		if (year < 1000 || year > 3000 || month == 0 || month > 12)
			return false;

		var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// Adjust for leap years
		if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
			monthLength[1] = 29;

		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	},

	// Validates that the input string is a valid date formatted as "yyyy-mm-dd"
	isValidDate2: function (s) {
		// First check for the pattern
		if (!/^\d{4}\-\d{2}\-\d{2}$/.test(s))
			return false;

		// Parse the date parts to integers
		var parts = s.split("-");
		var year = parseInt(parts[0], 10);
		var month = parseInt(parts[1], 10);
		var day = parseInt(parts[2], 10);

		// Check the ranges of month and year
		if (year < 1000 || year > 3000 || month == 0 || month > 12)
			return false;

		var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// Adjust for leap years
		if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
			monthLength[1] = 29;

		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	},

	replaceHtml: function (s) {
		if (s) return s.replace(/>/g, "&gt;").replace(/</g, "&lt;");
		return "";
	},

	StringFormat: function (s, arg) {
		if (s && arg && arg.length && arg.length > 0 && (typeof s === 'string')) {
			for (var i = 0; i < arg.length; i++) {
				s = s.replace('{' + i + '}', arg[i]);
			}
		}
		return s;
	},

	DateShow: function (s) {
		if (s && arg && arg.length && arg.length > 0 && (typeof s === 'string')) {
			for (var i = 0; i < arg.length; i++) {
				s = s.replace('{' + i + '}', arg[i]);
			}
		}
		return s;
	},

	//*********************parse data***********************//
	parseInt: function (s, defaul) {
		var pattern = /^(\-)?\d+(\.\d+)?$/;
		if (pattern.test(s)) return parseInt(s);
		else if (defaul) return defaul;
		return 0;
	},

	parseNumber: function (s, defaul) {
		var pattern = /^(\-)?\d+(\.\d+)?$/;
		if (pattern.test(s)) return parseFloat(s);
		else if (defaul)return defaul;
		return 0
	},

	parseJson: function (s) {
		try {
			return JSON.parse(s);
		}
		catch (e) {
			return null;
		}
	},

	toString: function (obj, defaul) {
		if (obj) {
			return String(obj);
		}
		else {
			if (defaul) return defaul;
			return "";
		}
	},

	//date format dd/mm/yyyy
	parseDate: function (s, defaul) {
		if (this.isValidDate(s)) {
			var parts = s.split("/");
			var day = parseInt(parts[0], 10);
			var month = parseInt(parts[1], 10);
			var year = parseInt(parts[2], 10);

			return new Date(year, month, day);
		}
		if (defaul)return defaul;
		return null;
	},

	//date show format dd/mm/yyyy
	dateShow: function (date) {
		if (date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			if (month < 10) month = '0' + month;
			if (day < 10) day = '0' + day;
			return day + '/' + month + '/' + year;
		}
		return '';
	},

	//yyyy-MM-dd HH:mm:ss
	date2String: function (date) {
		if (date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minutes = date.getMinutes();
			var second = date.getSeconds();
			if (month < 10) month = '0' + month;
			if (day < 10) day = '0' + day;
			if (hour < 10) hour = '0' + hour;
			if (minutes < 10) minutes = '0' + minutes;
			if (second < 10) second = '0' + second;
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second;
		}
		return '';
	},

	//yyyyMMddHHmmss
	date2String2: function (date) {
		if (date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minutes = date.getMinutes();
			var second = date.getSeconds();
			if (month < 10) month = '0' + month;
			if (day < 10) day = '0' + day;
			if (hour < 10) hour = '0' + hour;
			if (minutes < 10) minutes = '0' + minutes;
			if (second < 10) second = '0' + second;
			return year + '' + month + '' + day + '' + hour + '' + minutes + '' + second;
		}
		return '';
	},

	//yyyy-MM-dd HH:mm:ss
	date2String3: function (date) {
		if (date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			// var hour = date.getHours();
			// var minutes = date.getMinutes();
			// var second = date.getSeconds();
			if (month < 10) month = '0' + month;
			if (day < 10) day = '0' + day;
			// if(hour<10) hour='0'+hour;
			// if(minutes<10) minutes='0'+minutes;
			// if(second<10) second='0'+second;
			//return  year + '-' + month + '-' + day +' ' + hour + ':' + minutes + ':' + second;
			return day + '/' + month + '/' + year;
		}
		return '';
	},

	Second2Minute: function (t) {
		var minute = Math.floor(t / 60);
		var hour = 0;
		if (minute > 60) {
			hour = Math.floor(minute / 60);
			minute -= hour * 60;
		}
		var second = t - hour * 3600 - minute * 60;
		if (minute < 10) minute = '0' + minute;
		if (second < 10) second = '0' + second;
		return (hour > 0 ? hour + ':' : '') + minute + ':' + second;
	},

	randomString: function (n) {
		var patent = '0123456789abcdefghijklmnopqrstuvwxyz';
		var patent_length = patent.length;
		var s = '';
		for (var i = 0; i < n; i++) {
			s += patent[Math.round(Math.random() * patent_length)];
		}
		return s;
	},

	ReadLocalStore: function (key, val_default) {
		try {
			if (window.localStorage) {
				var value = window.localStorage.getItem(key);
				return value ? value : val_default;
			}
			else {
				console.log('localStorage not suport this web browser');
				return val_default ? val_default : null;
			}
		}
		catch (e) {
			console.log(e.task);
			return null;
		}
	},

	SaveLocalStore: function (key, value) {
		try {
			if (window.localStorage) {
				var value = JSON.stringify(value);
				window.localStorage.setItem(key, value);
			}
			else {
				console.log('localStorage not suport this web browser');
			}
		}
		catch (e) {
			console.log(e.task);
		}
	},

	DelLocalStore: function (key) {
		try {
			if (window.localStorage) {
				window.localStorage.removeItem(key);
			}
			else {
				console.log('localStorage not suport this web browser');
			}
		}
		catch (e) {
			console.log(e.task);
		}
	},

	RankScore: function (list_id, list_info) {
		if (list_id && list_info) {
			var arr_temp = [];
			for (var i = 0; i < list_id.length; i++) {
				for (var j = 0; j < list_info.length; j++) {
					var user_info = list_info[j];
					if (user_info._id == list_id[i]) {
						arr_temp.push(user_info);
						list_info.splice(j, 1);
						break;
					}
				}
			}
			return arr_temp;
		}
		else {
			return null;
		}
	},

	GenPageJs: function ($totalrecord, $irecordofpage, $pageindex, $className, $classActive, $rshow, $function_name, $category_id) {
		var $numberpage = 0;
		if ($totalrecord % $irecordofpage == 0)
			$numberpage = Math.floor($totalrecord / $irecordofpage);
		else
			$numberpage = Math.floor($totalrecord / $irecordofpage) + 1;

		if ($numberpage == 1)
			return "";

		var $loopend = 0;
		var $loopstart = 0;
		var $istart = false;
		var $iend = false;
		if ($pageindex == 0) {
			$loopstart = 0;
			$loopend = $numberpage > ($rshow - 1) ? $rshow : $numberpage;
			if ($numberpage > $rshow)
				$iend = true;
		}
		else {
			if ($pageindex < $numberpage - ($rshow - 1) && $pageindex != 0) {
				$loopstart = $pageindex - 1;
				$loopend = $pageindex + ($rshow - 1);
				$iend = true;
				if ($pageindex > 1)
					$istart = true;
			}
			else {
				if ($numberpage - $rshow > 0) {
					$loopstart = $numberpage - $rshow;
					$istart = true;
					$loopend = $numberpage;
				}
				else {
					$loopstart = 0;
					$loopend = $numberpage;
				}
			}
		}

		var $sPage = '<ul class="' + $className + '">';
		if ($istart)
			$sPage += '<li><a onclick="javascript:' + $function_name + '(0,' + $category_id + ')" href="javascript:void(0);"><i class="fa fa-fast-backward"></i></a></li>';
		if ($pageindex >= 1)
			$sPage += '<li><a onclick="javascript:' + $function_name + '(' + ($pageindex - 1) + ',' + $category_id + ')" href="javascript:void(0);"><i class="fa fa-step-backward"></i></a></li>';
		for (var $i = $loopstart; $i < $loopend; $i++) {
			if ($pageindex == $i)
				$sPage += '<li><a class="' + $classActive + '" href="javascript:void(0);">';
			else
				$sPage += '<li><a onclick="javascript:' + $function_name + '(' + $i + ',' + $category_id + ')" href="javascript:void(0);">';
			$sPage += ($i + 1) + '</a></li>';
		}
		if ($pageindex <= $numberpage - 2)
			$sPage += '<li><a onclick="javascript:' + $function_name + '(' + ($pageindex + 1) + ',' + $category_id + ')" href="javascript:void(0);" ><i class="fa fa-step-forward"></i></a></li>';
		if ($iend)
			$sPage += '<li><a onclick="javascript:' + $function_name + '(' + ($numberpage - 1) + ',' + $category_id + ')" href="javascript:void(0);" ><i class="fa fa-fast-forward"></i></a></li>';
		$sPage += '</ul>';

		return $sPage;
	},

	randomSelect: function (ddl) {
		var options = $(ddl + " > option");
		var index = Math.floor(Math.random() * options.length);
		options[index].selected = true;
		return index;
	},

	POST: function (path, params, method) {
		method = method || "post"; // Set method to post by default if not specified.
		var form = document.createElement("form");
		form.setAttribute("method", method);
		form.setAttribute("action", path);
		for (var key in params) {
			if (params.hasOwnProperty(key)) {
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", params[key]);
				form.appendChild(hiddenField);
			}
		}
		document.body.appendChild(form);
		form.submit();
	}
};