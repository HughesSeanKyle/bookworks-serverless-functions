import { sendCode } from 'email-verification-code';
import dotenv from 'dotenv';

dotenv.config();

export default async function sendMailWithCode(req, res) {
	try {
		const { recipient, message } = req.body;

		const whitelist = [WHITELISTED_DOMAIN_ONE, WHITELISTED_DOMAIN_TWO];
		const origin = req.headers.origin;

		if (!whitelist.includes(origin)) {
			return res.status(403).json({ data: null, error: 'Forbidden' });
		}

		const data = {
			smtpInfo: {
				host: process.env.MAIL_HOST,
				port: 465,
				user: process.env.TEST_EMAIL_ADDRESS,
				pass: process.env.TEST_APP_PASSWORD,
			},
			company: {
				name: 'BookWorks',
				email: process.env.TEST_EMAIL_ADDRESS,
			},
			mailInfo: {
				emailReceiver: recipient,
				subject: 'Code Confirmation',
				text(code, token) {
					return `${message}. The Confirmation Code is: ${code}`;
				},
				html(code, token) {
					return `<p>${message}. The Confirmation Code is: ${code}</p>`;
				},
			},
		};

		const sendResult = await sendCode(data);

		return res.status(200).json({
			data: 'Email sent successfully. Please enter your confirmation code',
			error: null,
		});
	} catch (error) {
		return res.status(500).json({
			data: null,
			error: error.message,
		});
	}
}
