import { sendCode, verifyCode } from 'email-verification-code';
import dotenv from 'dotenv';

dotenv.config();

async function sendMailWithCode(recipient, message) {
	try {
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

		console.log('sendResult', sendResult);

		return {
			data: 'Email sent successfully. Please enter your confirmation code',
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
}

// (async () => {
// 	await sendMailWithCode(
// 		'khughessean@yahoo.com',
// 		'Congratulations on Signing up with BookWorks! Please enter the provided code to verify your email'
// 	);
// })();

async function verifyActionCode(email, code) {
	try {
		const response = await verifyCode(email, code);

		console.log('response', response);

		if (response.error) {
			return {
				data: null,
				error: response.reason,
			};
		}

		return {
			data: 'Code verified successfuly',
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
}

// (async () => {
// 	await verifyActionCode('khughessean@yahoo.com', '385915');
// })();
