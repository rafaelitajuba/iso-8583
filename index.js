var NativeExtension = require('bindings')('ISO8583');

NativeExtension.Message.prototype.parseSync = function(data) {
	var result = [];
	var msg = new Buffer(data, "hex");
	var len = msg.length;
  	var unpackedMessage = this.unpackSync(msg, len);

	for (var i = 0; i < unpackedMessage.length; i++) {
		var u = unpackedMessage[i];
		if (u){
			if (typeof(u.value.trim) === "function") {
				result.push([parseInt(u.key, 10), u.value.trim()]);
			} else {
				result.push([parseInt(u.key, 10), u.value]);
			}
		}
	}

	return result;
};

module.exports = NativeExtension;
