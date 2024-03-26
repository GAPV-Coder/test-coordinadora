import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config.js';
import sequelize from './database/database.js';
import routes from './routes/index.js';

const PORT = config?.PORT || 8080;

const app = express();

// Middlewares
app.use(cors());
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE',
    );
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// Limit hourly requests
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Database connection
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Error connecting the database', error);
    });

// Routes
app.use('/api/v1', routes);

// Port listening
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
