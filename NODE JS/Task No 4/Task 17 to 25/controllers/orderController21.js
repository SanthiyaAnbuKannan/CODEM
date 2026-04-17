let orders = [];

exports.getOrders = (req, res) => {
    console.log("Fetching orders");
    res.json(orders);
};

exports.createOrder = (req, res) => {
    const { product, quantity } = req.body;

    if (!product || !quantity) {
        return res.status(400).json({ message: "Invalid order" });
    }

    const newOrder = {
        id: orders.length + 5001,
        product,
        quantity
    };

    orders.push(newOrder);

    res.status(201).json(newOrder);
};