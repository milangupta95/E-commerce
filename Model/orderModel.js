const mongoose = require('mongoose');
const userModel = require('./userModel');
const productModel = require('./productModel');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            required: [true,"Quantity is Required"],
            min: [1,"Quantity can't be less than 1"]
        }
    }],
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dateBought: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["bought","dispatched","on the way","delivered","cancelled"],
        default: "bought"
    }
});
const orderModel = new mongoose.model('Orders',orderSchema);
module.exports = orderModel;