import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

// import emailServiceRouter from './routes/emailService.js';

import { checkWhitelist } from './middleware/checkWhitelist.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

// Middleware
app.use(checkWhitelist);

// Routes
// app.use(emailServiceRouter);

// Test route
app.get('/test-get', (req, res) => {
	res.send('Hello from the root route. Update, Two three four ');
});

app.listen(PORT, () => {
	console.log(`Serving from port ${PORT}.`);
});
