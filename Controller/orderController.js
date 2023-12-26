const orderModel = require("../Model/orderModel");

module.exports.makeOrder = async function (req, res) {
    console.log("Make Order Called");
    try {
        const user_id = req.user_id;
        const { items, address, phone } = req.body;
        const order = await orderModel.create({
            userId: user_id,
            items: items,
            address: address,
            phone: phone
        });
        order.user_id = undefined;
        if (order) {
            res.status(201).json({
                message: "Order Placed SuccesFully",
                data: order
            })
        } else {
            res.status(401).json({
                message: "This Order Can't Be Placed"
            });
        }
    } catch (err) {
        res.status(501).json({
            message: "We can't Process This time"
        });
    }
}

module.exports.getAllOrders = async function (req, res) {
    try {
        const orders = await orderModel.find();
        if (orders) {
            res.status(201).json({
                message: "Fetched Data SuccesFully",
                data: orders
            })
        } else {
            res.status(404).json({
                message: "Sorry The Page you are requesting is Not Found"
            });
        }
    } catch (err) {
        res.status(501).json({
            message: "There is Some Error"
        })
    }
}

module.exports.getCustomerOrder = async function (req, res) {
    try {
        const user_id = req.user_id;
        const orders = await orderModel.find({ userId: user_id })
            .populate({
                path: 'items',
                populate: {
                    path: 'productId',
                    model: 'product'
                }
            });
        if (orders) {
            res.status(200).json({
                message: "Orders found SucessFully",
                data: orders
            });
        } else {
            res.status(404).json({
                message: "No Data Found"
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.getOneOrder = async function (req, res) {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);
        if (order) {
            res.status(201).json({
                message: "Data is Found",
                data: order
            });
        } else {
            res.status(404).json({
                message: "Data is Not Found"
            });
        }
    } catch (err) {
        res.status(501).json({
            message: err.message
        });
    }
}

module.exports.markOrderShipped = async function(req,res) {
    try {
        console.log("API Hit");
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);
        if (order) {
            if(order.status === 'bought') {
                order.status = 'dispatched';
                let savedOrder = await order.save();
                console.log(savedOrder);
                res.status(200).json({
                    message: "Dispatched",
                    data: savedOrder
                });
            } else {
                res.status(200).json({
                    message: "Already Dispatched",
                    data: order
                });
            } 
        } else {
            res.status(404).json({
                message: "Data is Not Found"
            });
        }
    } catch(err) {
        res.status(501).json({
            message: err.message
        })
    }
}