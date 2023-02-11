import { verifyCode } from 'email-verification-code';

export default async function verifyActionCode(req, res) {
	try {
		const { email, code } = req.body;

		const whitelist = [WHITELISTED_DOMAIN_ONE, WHITELISTED_DOMAIN_TWO];
		const origin = req.headers.origin;

		if (!whitelist.includes(origin)) {
			return res.status(403).json({ data: null, error: 'Forbidden' });
		}

		const response = await verifyCode(email, code);

		if (response.error) {
			return res.status(400).json({
				data: null,
				error: response.reason,
			});
		}

		return res
			.status(200)
			.json({ data: 'Code verified successfuly', error: null });
	} catch (error) {
		return res.status(500).json({
			data: null,
			error: error.message,
		});
	}
}
