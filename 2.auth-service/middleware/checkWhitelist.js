const whitelist = [
	'http://example.com',
	'http://localhost:5174',
	'http://localhost:5000',
];

export const checkWhitelist = (req, res, next) => {
	const origin = req.headers.origin;

	console.log('Origin', origin);

	if (!whitelist.includes(origin)) {
		res.statusCode = 403;
		return res.json({ error: 'Forbidden' });
	}

	next();
};
