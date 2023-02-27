import firebase from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { serviceAccountKey, DATABASE_URL } from '../../serviceAccountKey.js';

const app = initializeApp({
	credential: firebase.credential.cert(serviceAccountKey),
	databaseURL: DATABASE_URL,
});

export async function updateUserPassword(email, newPassword) {
	try {
		const userRecord = await firebase.auth().getUserByEmail(email);

		const updatePasswordResult = await firebase
			.auth()
			.updateUser(userRecord.uid, {
				newPassword,
			});

		return {
			data: updatePasswordResult,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error.message,
		};
	}
}

// (async () => {
// 	const result = await updateUserPassword(
// 		'khughessean1@yahoo.com',
// 		'@Test12345'
// 	);

// 	console.log('result', result);
// })();
