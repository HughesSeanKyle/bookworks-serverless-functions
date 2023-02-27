import { RateLimiterMemory } from 'rate-limiter-flexible';

/*
    1. First check user existence 
    2. If no user then return "User not found"
    3. If user then continue to rate limit 
*/

export async function limitUserRequestRate(email) {
	const limiter = new RateLimiterMemory({
		points: 3,
		duration: 24 * 60 * 60,
	});

	const key = `update-password-${email}`;

	const result = await limiter.consume(key);
	console.log('result', result);

	const remainingAttempts = result.remainingPoints;
	console.log('remainingAttempts', remainingAttempts);

	if (remainingAttempts < 0) {
		const retryAfterSeconds = Math.round(result.msBeforeNext / 1000);
		console.log('retryAfterSeconds', retryAfterSeconds);

		// res.setHeader('Retry-After', retryAfterSeconds);
		// return res.status(429).json({ message: 'Too Many Requests' });

		return {
			data: null,
			error: 'Status 429 - Too Many Requests',
		};
	}

	return {
		data: {
			result: result,
			remainingAttempts: remainingAttempts,
		},
		error: null,
	};
}

(async () => {
	const rateResult = await limitUserRequestRate(
		'myUniqueFireBaseEmail@test-firebase.com'
	);

	console.log('rateResult', rateResult);

	const rateResult2 = await limitUserRequestRate(
		'myUniqueFireBaseEmail@test-firebase.com'
	);

	console.log('rateResult2', rateResult2);

	const rateResult3 = await limitUserRequestRate(
		'myUniqueFireBaseEmail@test-firebase.com'
	);

	console.log('rateResult3', rateResult3);
})();
