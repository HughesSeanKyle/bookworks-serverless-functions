import firebase from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { serviceAccountKey, DATABASE_URL } from '../../serviceAccountKey.js';

const app = initializeApp({
	credential: firebase.credential.cert(serviceAccountKey),
	databaseURL: DATABASE_URL,
});

console.log('app', app);

// Create rate limiter
const limiter = new RateLimiterMemory({
	points: 3, // allow 3 requests
	duration: 24 * 60 * 60, // per 24 hours
});
