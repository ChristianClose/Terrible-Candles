import express from "express";
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import databaseConnection from './database.js';
import productsRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(mongoSanitize());
app.use(mongoSanitize({
    replaceWith: '_'
}));

databaseConnection();

app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/promos", promoRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => console.log("server started"));