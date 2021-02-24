import express from "express";
import productsRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
const app = express();

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/promos", promoRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(5000, () => console.log("server started"));