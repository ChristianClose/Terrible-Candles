import Promo from '../models/promoModel.js';


export const getPromos = async (req, res) => {
    const promos = await Promo.find({});
    res.json(promos);
};
