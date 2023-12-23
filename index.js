const express = require('express');
const secret_key = "sk_test_51N05z8SIxFF90szGLoDH1bTMJUaXMVXpefWVG3bET3bVVs5MnY3F0Kq1M3NMH1YsQtzBw4ZbZJhz2uFNW2R25eii00NxqnjVd6";
const stripe = require('stripe')(secret_key);
const path = require("path");
// const uuid = require('uuid/v4');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3001",
// }));
app.use(express.json());
app.use(cookieParser());
const authRouter = require('./Routes/authRoutes');
const productRouter = require('./Routes/productRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const orderRouter = require('./Routes/orderRoutes');
const cartRouter = require('./Routes/cartRoutes');
const sendMail = require('./Utility/sendMail');
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
    var filePath = "./client/build/index.html";
    var resolvedPath = path.resolve(filePath);
    res.sendFile(
        resolvedPath,
        function (err) {
            res.status(500).send(err);
        }
    );
});
app.post('/payment', (req, res) => {
    const { product, token } = req.body;
    // const idempotencyKey = uuid();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer) => {
        stripe.charges.create({
            ammount: product.price * 100,
            currency: "INR",
            customer: customer.id,
            description: "This is Payment"
        });
    }).then((result) => {
        console.log("Payment Success");
        res.status(200).json(result);
    }).catch(err => {
        console.log(err.message);
        res.status(401).json(err);
    })
});
app.post('/sendFeedback', (req, res) => {
    try {
        const { email, message, subject } = req.body;
        sendMail(email, message, subject);
        res.status(201).json({
            message: "Message Sent SuccessFully"
        })
    } catch (err) {
        res.status(401).json({
            message: "Unable To Send Message",
        })
    }
});

app.listen(3000, function () {
    console.log("Listening on Port 3000");
})