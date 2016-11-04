import $ from 'jquery'

$.ajaxSettings.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';

var Util = {
	ms2DateString: function(ms) {
		var datetime = new Date(Number(ms)),
			year = datetime.getFullYear(),
			month = (datetime.getMonth() + 1) >= 10 ? (datetime.getMonth() + 1) : '0' + (datetime.getMonth() + 1),
			date = datetime.getDate() >= 10 ? datetime.getDate() : '0' + datetime.getDate(),
			hours = datetime.getHours() >= 10 ? datetime.getHours() : '0' + datetime.getHours(),
			minutes = datetime.getMinutes() >= 10 ? datetime.getMinutes() : '0' + datetime.getMinutes(),
			seconds = datetime.getSeconds() >= 10 ? datetime.getSeconds() : '0' + datetime.getSeconds();

		return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

	},
	ajax: function(url, params, type) {
		var defer = $.Deferred();
		var options = {
			url: url,
			type: type || 'POST',
			dataType: 'json',
			data: $.param(params, true),
			async: true,
			success: function(result) {
				defer.resolve(result);
			},
			error: function(code, errorCode, res) {
				defer.reject(code, errorCode, res);
			}
		};
		$.ajax(options);
		return defer;
	}
}

export default Util;