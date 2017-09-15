var ISO8583 = require('../');
var assert = require('assert');

function TestMessage() {
	return this;
}

TestMessage.prototype.packed1993 = function() {
	return [
		"11", "00", "D0", "30", "00", "00", "02", "C0", "00", "00", "00", "00", "00", "00", "00", "00", "00", "08", "16", "12", "34", "56", "78", "90", "12", "34", "56", "00", "00", "00", "00", "56", "99", "00", "02", "34", "17","11","22","11","22","33","00", "04", "31", "32", "33", "34", "35", "20", "20", "20", "36", "37", "38", "39", "30", "31", "32", "33", "34", "20", "20", "20", "20", "20", "20", "00", "09", "42", "4C", "41", "48", "20", "42", "4C", "41", "48"
	];
};

TestMessage.prototype.unpacked1993 = function() {
	return [
		[0, "1100"],
		[2, "1234567890123456"],
		[4, "000000005699"],
		[11, "000234"],
        [12, "171122112233"],
		[39, "004"],
		[41, "12345"],
		[42, "678901234"],
		[125, "BLAH BLAH"]
	];
};

TestMessage.prototype.packed1987 = function() {
    return [
        "01", "00", "D0", "38", "00", "00", "02", "C0", "00", "00", "00", "00", "00", "00", "00", "00", "00", "08", "16", "12", "34", "56", "78", "90", "12", "34", "56", "00", "00", "00", "00", "56", "99", "00", "02", "34", "11","22","33","11","22","30","34", "31", "32", "33", "34", "35", "20", "20", "20", "36", "37", "38", "39", "30", "31", "32", "33", "34", "20", "20", "20", "20", "20", "20", "00", "09", "42", "4C", "41", "48", "20", "42", "4C", "41", "48"
    ];
};

TestMessage.prototype.unpacked1987 = function() {
    return [
        [0, "0100"],
        [2, "1234567890123456"],
        [4, "000000005699"],
        [11, "000234"],
        [12, "112233"],
		[13, "1122"],
        [39, "04"],
        [41, "12345"],
        [42, "678901234"],
        [125, "BLAH BLAH"]
    ];
};

TestMessage.prototype.packedPrivateData = function() {
    return [
        "08", "00", "20", "20", "01", "00", "00", "C1", "00", "00", "99", "00", "00", "14", "09", "84", "00", "19", "30", "30", "30", "30", "30", "30", "32", "33", "30", "30", "30", "30", "30", "30", "30", "30", "30", "30", "35", "32", "32", "34", "38", "00", "91", "54", "01", "08", "02", "02", "30", "30", "30", "30", "30", "30", "32", "33", "88", "31", "36", "49", "4D", "50", "39", "30", "34", "30", "30", "30", "33", "41", "20", "30", "30", "30", "30", "92", "00", "34", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "31", "36", "33", "32", "38", "36", "39", "33", "33", "30", "35", "31", "30", "33", "35", "30", "30", "35", "30", "32", "36", "32", "39", "31", "93", "00", "19", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "58"
    ];
};

TestMessage.prototype.unpackedPrivateData = function() {
    return [
        [0, '0800'],
        [3, '990000'],
        [11, '140984'],
        [24, '019'],
        [41, '00000023'],
        [42, '000000000052248'],
        [48, new Buffer('54010802023030303030303233883136494D50393034303030334120303030309200342020202020202020202031363332383639333330353130333530303530323632393193001920202020202020202020202020202020202058', 'hex')]
    ];
};

var testMessage = new TestMessage();

describe('native extension', function() {
	it('should export a wrapped object', function() {
		var message = new ISO8583.Message();

		assert.equal(typeof(message.packSync), "function");
		assert.equal(typeof(message.unpackSync), "function");
	});
});

describe('pack iso8583 1993 message', function() {
	it('should pack message values and return an Array of HEX values', function() {

		var msg = testMessage.unpacked1993();
		var message = new ISO8583.Message();
		var packedMessage = message.packSync(msg);

		assert.equal(packedMessage.join(" "), testMessage.packed1993().join(" "));
	});
});

describe('pack iso8583 1993 message asynchronous', function() {
	it('should pack message values and return an Array of HEX values', function(done) {

		var msg = testMessage.unpacked1993();
		var message = new ISO8583.Message();
		var callback = function(a,b){
			// assert.equal(packedMessage.join(" "), testMessage.packed().join(" "));
			assert.equal(b, 1.75);
			done();
		};
		var packedMessage = message.packAsync(msg, callback);
		//assert.equal(packedMessage, 1.75);
	});
});

describe('parse and unpack iso8583 1993 message', function() {
	it('should parse and unpack a message and return an Array of values', function() {
		var msg = testMessage.packed1993().join("");
		var message = new ISO8583.Message();
		var unpackedMessage = message.parseSync(msg);

		assert.deepEqual(unpackedMessage, testMessage.unpacked1993());
	});
});


describe('pack iso8583 1987 message', function() {
    it('should pack message values and return an Array of HEX values', function() {

        var msg = testMessage.unpacked1987();
        var message = new ISO8583.Message();
        var packedMessage = message.packSync(msg);

        assert.equal(packedMessage.join(" "), testMessage.packed1987().join(" "));
    });
});

describe('pack iso8583 1987 message asynchronous', function() {
    it('should pack message values and return an Array of HEX values', function(done) {

        var msg = testMessage.unpacked1987();
        var message = new ISO8583.Message();
        var callback = function(a,b){
            // assert.equal(packedMessage.join(" "), testMessage.packed().join(" "));
            assert.equal(b, 1.75);
            done();
        };
        var packedMessage = message.packAsync(msg, callback);
        //assert.equal(packedMessage, 1.75);
    });
});

describe('parse and unpack iso8583 1987 message', function() {
    it('should parse and unpack a message and return an Array of values', function() {
        var msg = testMessage.packed1987().join("");
        var message = new ISO8583.Message();
        var unpackedMessage = message.parseSync(msg);

        assert.deepEqual(unpackedMessage, testMessage.unpacked1987());
    });
});

describe('parse message with private data in bit 48 containing invalid chars', function() {
    it('should parse a message and return an Array of values', function() {
        var msg = testMessage.packedPrivateData().join("");
        var message = new ISO8583.Message();
        var unpackedMessage = message.parseSync(msg);

        assert.deepEqual(unpackedMessage, testMessage.unpackedPrivateData());
    });
});

describe('parse and unpack message with private data in bit 48 containing invalid chars', function() {
    it('should parse and unpack a message and return an Array of HEX values', function() {
        var msg = testMessage.unpackedPrivateData();
        var message = new ISO8583.Message();
        var packedMessage = message.packSync(msg);

        assert.deepEqual(packedMessage.join(" "), testMessage.packedPrivateData().join(" "));
    });
});