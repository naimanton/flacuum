// function balance(grnz) {
// 	const https = require('https');
// 	let data = '', reg = /:value="(.+)"  r/;
// 	https.get(
// 		'https://spos.kz/t/zhol?account=' + grnz + '&check=1',
// 		res => {
// 			res.on('data', ch => data += ch);
// 			res.on('end', () => console.log( data.match(reg)[1] ));
// 		}
// 	);
// }
var r = m.remoteScript;

Object.assign(r, {
	intervals: {},
	assert(assertion, description='') {
		if (!assertion) {
			throw new Error(description);
		}
	},
	run(config) {
		r.config = config;
		r.setEmptyCallbackInterval();
		r.Slimbot = require('slimbot');
		r.telegramBot = new r.Slimbot(
			m.loconfig.telegramBotToken
		);
		r.telegramBot.on('message', message => {
			r.telegramBot.sendMessage(message.chat.id, 'Message received');
		});
		r.telegramBot.startPolling();
	},
	clearAllIntervals() {
		// for ()
	},
	setEmptyCallbackInterval() {
		r.intervals.emptyCallback = ( 
			setInterval(
				function () {}, 
				r.config.emptyCallbackIntervalPeriod
			)
		)
	}
});


r.run({
	emptyCallbackIntervalPeriod: 10000
});
