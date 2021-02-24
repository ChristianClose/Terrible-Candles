let orders = [];
export const getOrders = (req, res) => res.send(orders);
export const receiveOrders = (req, res) => {
    req.body._id = req.body.orderId;
    console.log(req.body);
    orders.push(req.body);
};