require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok', timestamp: new Date() });
});


// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
	console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
