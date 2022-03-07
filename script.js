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
	Slimbot: require('slimbot'),
	
	run(config) {
		r.config = config;
		r.createTelegramBot();
		r.telegramBot.startPolling();
		r.setEmptyCallbackInterval();
	},
	createTelegramBot() {
		r.telegramBot = new r.Slimbot(
			m.loconfig.telegramBot.token
		);

		r.telegramBot.on('message', message => {
			if (m.loconfig.telegramBot.adminChatId !== message.chat.id) {
				r.telegramBot.sendMessage(m.loconfig.telegramBot.adminChatId, JSON.stringify(message, false, 2));			
				return;
			}

			try { 
				eval(message.text);
				r.telegramBot.sendMessage(
					message.chat.id, 
					r.config.messages.successEval
				);
			}
			catch (error) {
				r.telegramBot.sendMessage(message.chat.id, error.stack);			
			}
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
	emptyCallbackIntervalPeriod: 60000,
	messages: {
		successEval: 'success.'
	},
});
