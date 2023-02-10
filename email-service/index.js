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

async function sendMailWithCode() {
	// Send the code to the User Email.

	const data = {
		smtpInfo: {
			host: 'smtp.gmail.com',
			port: 465,
			user: process.env.TEST_EMAIL_ADDRESS,
			pass: process.env.TEST_APP_PASSWORD,
		},
		company: {
			name: 'BookWorks.',
			email: process.env.TEST_EMAIL_ADDRESS,
		},
		mailInfo: {
			emailReceiver: 'khughessean@yahoo.com',
			subject: 'Code Confirmation',
			text(code, token) {
				return `The Confirmation Code is: ${code} or click in this link: www.test.com/?token=${token}`;
			},
			html(code, token) {
				return `<p>The Confirmation Code is: ${code} or click in this link: www.test.com/?token=${token}</p>`;
			},
		},
	};

	await sendCode(data);
}

// (async () => {
// 	await sendMailWithCode();
// })();

async function verifyActionCode(email, code) {
	const response = await verifyCode(email, code);

	console.log('response', response);
}

(async () => {
	await verifyActionCode('khughessean@yahoo.com', '292753 ');
})();
