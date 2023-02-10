const nodemailer = require('nodemailer');
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

(async () => {
	await sendMail();
})();
