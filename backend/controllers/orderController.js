let orders = [
    {
        items: [
            {
                _id: '3',
                name: 'Peach Candle',
                image: 'https://cdn.pixabay.com/photo/2016/12/05/12/52/advent-1883840_960_720.jpg',
                price: 4.99,
                description: 'Crafted from the finest peaches from 25 years ago!',
                qty: 1
            },
            {
                _id: '1',
                name: 'Trash Candle',
                image: 'https://cdn.pixabay.com/photo/2017/02/04/23/02/candle-2038736_960_720.jpg',
                price: 4.99,
                description: 'Crafted from the finest dumpsters of New York!',
                qty: 1
            }
        ],
        shipping: {
            firstName: "Bob",
            lastName: "Johnson",
            address: '1234 Main St',
            city: 'Nowhere',
            state: 'Arkansas',
            zip: '72712',
            address2: 'Apt B',
            hasShipped: false,
            isDelivered: false,
        },
        payer: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'sb-roluu1217154@personal.example.com'
        },
        time: '12:43:23 PM CST',
        status: 'COMPLETED',
        orderId: '0BX22315FD894133X',
        _id: '0BX22315FD894133X',
        total: 10.98
    }
];
export const getOrders = (req, res) => res.send(orders);
export const getOrder = (req, res) => res.send(orders.find((ord) => ord._id === req.params.id));
export const receiveOrders = (req, res) => {
    req.body._id = req.body.orderId;
    req.body.shipping.hasShipped = false;
    req.body.shipping.isDelivered = false;
    orders.push(req.body);
};