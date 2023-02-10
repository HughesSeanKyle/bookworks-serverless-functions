const nodemailer = require('nodemailer');
const {
	sendCode,
	verifyCode,
	verifyToken,
	verifyBoth,
} = require('email-verification-code');
require('dotenv').config();

async function sendMail() {
	// Create a transporter object
	let transporter = nodemailer.createTransport({
		host: `smtp.gmail.com`,
		port: 465,
		secure: true,
		auth: {
			user: process.env.TEST_EMAIL_ADDRESS,
			pass: process.env.TEST_APP_PASSWORD,
		},
	});

	// Define the email options
	let mailOptions = {
		from: process.env.TEST_EMAIL_ADDRESS,
		to: 'khughessean@yahoo.com',
		subject: 'Personalized Email Subject',
		text: 'Personalized Email Message',
	};

	// Send the email
	let info = await transporter.sendMail(mailOptions);

	console.log('Message sent: %s', info.messageId);
}

// (async () => {
// 	await sendMail();
// })();

async function sendMailWithCode(recipient) {
	try {
		const data = {
			smtpInfo: {
				host: 'smtp.gmail.com',
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
					return `The Confirmation Code is: ${code}`;
				},
				html(code, token) {
					return `<p>The Confirmation Code is: ${code}`;
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
// 	await sendMailWithCode('khughessean@yahoo.com');
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

(async () => {
	await verifyActionCode('khughessean@yahoo.com', '359861');
})();
