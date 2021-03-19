import express from "express";
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import databaseConnection from './database.js';
import productsRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(mongoSanitize({
    replaceWith: '_'
}));

databaseConnection();

app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/promos", promoRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/users', userRoutes);

app.use((error, req, res, next) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    if (!error.status) {
        error.status = 'rejected';
    }

    res.status(error.statusCode).json({ message: error.message, status: error.status, statusCode: error.statusCode, });
});


app.listen(5000, () => console.log("server started"));