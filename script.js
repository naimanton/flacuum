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
m.l('- - - - - - - -');
var r = m.remoteScript;

Object.assign(r, {
	intervals: {},
	run(config) {
		r.config = config;
		r.createTelegramBot();
		r.telegramBot.startPolling();
		r.setEmptyCallbackInterval();
	},
	createTelegramBot() {
		r.Slimbot = require('slimbot');
		r.telegramBot = new r.Slimbot(
			m.loconfig.telegramBotToken
		);

		r.telegramBot.on('message', message => {
			m.l(message);
			r.telegramBot.sendMessage(message.chat.id, 'Message received');
		});
	},
	setEmptyCallbackInterval() {
		r.intervals.emptyCallback = ( 
			setInterval(
				function () {}, 
				r.config.emptyCallbackIntervalPeriod
			)
		)
	},
	clearAllIntervals() {
		for (var k in r.intervals) {
			clearInterval(r.intervals[k]);
		}
	},
});


r.run({
	emptyCallbackIntervalPeriod: 10000
});
