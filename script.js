function balance(grnz) {
	const https = require('https');
	let data = '', reg = /:value="(.+)"  r/;
	https.get(
		'https://spos.kz/t/zhol?account=' + grnz + '&check=1',
		res => {
			res.on('data', ch => data += ch);
			res.on('end', () => console.log( data.match(reg)[1] ));
		}
	);
}
