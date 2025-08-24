require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDb = require('./config/db')
const authRoutes = require('./routes/auth.routes')
const cookieParser = require("cookie-parser");
const blogRoutes = require('./routes/blog.routes')
const messageRoutes = require('./routes/messages.routes')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({origin: 'http://localhost:5173', credentials: true})); // Enable CORS

// Explicit CORS headers for credentialed requests
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok', timestamp: new Date() });
});
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/messages', messageRoutes);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  connectDb();
	console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
