import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
}, { timestamps: true });

const productModel = mongoose.model("Product", productSchema);

export default productModel;