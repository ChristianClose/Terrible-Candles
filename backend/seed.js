import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import products from './data/products.js';
import Promo from './models/promoModel.js';
import promos from './data/promos.js';
import Review from './models/reviewModel.js';
import reviews from './data/reviews.js';

dotenv.config();
const { DB_SCHEME, DB_HOST, DB_USER, DB_PASS } = process.env;

try {
    await mongoose.connect(`${DB_SCHEME + DB_USER}:${DB_PASS}@${DB_HOST}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log("Connected to Mongo Database successfully");
} catch (error) {
    console.log(error);
}

const seedProducts = async () => {
    try {
        await Product.remove({});
        await Product.create(products);
        console.log("Products successfully seeded");
    } catch (error) {
        console.log(error);
    }
};

const seedPromos = async () => {
    try {
        await Promo.remove({});
        await Promo.create(promos);
        console.log("Promos successfully seeded");
    } catch (error) {
        console.log(error);
    }
};

const seedReviews = async () => {
    try {
        await Review.remove({});
        await Review.create(reviews);
        console.log("Reviews successfully seeded");
    } catch (error) {
        console.log(error);
    }
};

switch (process.argv.slice(2)[0]) {
    case "products":
        await seedProducts();
        break;
    case "promos":
        await seedPromos();
        break;
    case "reviews":
        await seedReviews();
        break;

    default:
        seedProducts();
        seedPromos();
}

process.exit();
