import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
    name: String,
    text: String,
    image: String,
}, { timestamps: true });

const promoModel = mongoose.model("Promo", promoSchema);

export default promoModel;