var Util = {
	ms2DateString: function(ms) {
		var datetime = new Date(ms),
			year = datetime.getFullYear(),
			month = (datetime.getMonth() + 1) >= 10 ? (datetime.getMonth() + 1) : '0' + (datetime.getMonth() + 1),
			date = datetime.getDate() >= 10 ? datetime.getDate() : '0' + datetime.getDate(),
			hours = datetime.getHours() >= 10 ? datetime.getHours() : '0' + datetime.getHours(),
			minutes = datetime.getMinutes() >= 10 ? datetime.getMinutes() : '0' + datetime.getMinutes(),
			seconds = datetime.getSeconds() >= 10 ? datetime.getSeconds() : '0' + datetime.getSeconds();

		return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

	}
}

export default Util;