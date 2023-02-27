import express from 'express';
import { updateUserPassword } from '../modules/firebase/updatePassword.js';
import { body, validationResult } from 'express-validator';
const router = express.Router();

router.post(
	'/user/update-password',
	[
		body('newPassword')
			.matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
			.withMessage(
				'Password must contain minimum 8 characters, atleast one lowercase letter, uppercase letter, one number and one special character.'
			),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ data: null, error: errors.array() });
			}

			const { recipient, newPassword } = req.body;

			const result = await updateUserPassword(recipient, newPassword);

			if (
				result.error &&
				result.error ===
					'There is no user record corresponding to the provided identifier.'
			) {
				return res.status(404).json({
					data: null,
					error:
						'There is no user record corresponding to the provided identifier.',
				});
			}

			return res.status(200).json({ data: result, error: null });
		} catch (error) {
			return (
				res.status(500),
				json({
					data: null,
					error: error,
				})
			);
		}
	}
);

export default router;
