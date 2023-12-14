const https = require('https');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
	const X = req.cookies.X;
	if (Date.now() < parseInt(X.substr(24, 12), 16)) return next();

	https.request('https://app.spotplayer.ir/', {method: 'HEAD', headers: {Cookie: 'X=' + X}}, r => {
		const [X] = headers['set-cookie'].join('').match(/X=([a-f0-9]+);/);
		res.cookie('X', X, {maxAge: 3600*24*365*100, domain: 'localhost', secure: true, httpOnly: false});
		next();
	}).end();
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
