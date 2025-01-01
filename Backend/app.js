import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import connectToDb from './db/db.js';
import userRoutes from './routes/userRoute.js';
import captainRoutes from './routes/captainRoutes.js';

const app = express();

// Apply CORS middleware first
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies or authentication headers
}));

// Allow preflight requests for all routes
app.options('*', cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Connect to the database
connectToDb();

// Define routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

// Default route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is listening at 3000");
});

export default app;
