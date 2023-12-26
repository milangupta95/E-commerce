const cartModel = require("../Model/cartModel");

module.exports.addToCart = async function (req, res) {
    try {
        let user_id = req.user_id;
        console.log(user_id);
        let product_id = req.params.id;
        let { quantity,pname,productPic,price} = req.body;
        let cartproduct = await cartModel.create({
            userId: user_id,
            productId: product_id,
            quantity: quantity,
            pname: pname,
            productPic: productPic,
            price:price
        });
        // cartproduct.userId = undefined;
        if (cartproduct) {
            res.status(201).json({
                message: "SuccessFully Added To Cart",
                data: cartproduct
            });
        } else {
            res.status(401).json({
                message: "Can't be Added to the Cart"
            })
        }
    } catch (err) {
        console.log(err.message);
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.getAllCartProduct = async function (req, res) {
    try {
        let cartProducts = await cartModel.find();
        if (cartProducts) {
            res.status(200).json({
                message: "Product Found SuccessFully",
                data: cartProducts
            })
            console.log(cartProducts);
        } else {
            console.log(cartProducts);
            res.status(404).json({
                message: "No Data Found"
            })
        }
    } catch (err) {
        console.log(err.message);
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.getAllCustomerProductCart = async function (req, res) {
    try {
        const user_id = req.user_id;
        const cartProducts = await cartModel.find({ userId: user_id });
        if (cartProducts) {
            res.status(200).json({
                message: "Cart Products Fetched SuccessFully",
                data: cartProducts
            });
            console.log(cartProducts);
        } else {
            console.log("Not Found");
            res.status(404).json({
                message: "Data Not Found"
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.getOneCartProduct = async function (req, res) {
    try {
        const cartId = req.params.id;
        const cartProduct = await cartModel.findById(cartId);
        if (cartProduct) {
            res.status(200).json({
                message: "Found",
                data: cartProduct
            })
        } else {
            res.status(404).json({
                message: "Not Found"
            })
        }
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.updateCart = async function (req, res) {
    try {
        let id = req.params.id;
        let cartProduct = await cartModel.findById(id);
        let DataToBeUpdated = req.body;
        if (cartProduct) {
            for (let key in DataToBeUpdated) {
                cartProduct[key] = DataToBeUpdated[key];
            }
            await cartProduct.save();
            res.status(201).json({
                message: "Cart Updated SuccesFully"
            })
        } else {
            res.status(404).json({
                message: "Cart Product Not Found"
            })
        }
    } catch (err) {
        res.status(501).json({
            message: "Not Found"
        })
    }
}

module.exports.deleteProductFromCart = async function (req, res) {
    try {
        const id = req.params.id;
        const deleteProduct = await cartModel.findByIdAndDelete(id);
        if (deleteProduct) {
            res.status(201).json({
                message: "Product Deleted"
            })
        } else {
            res.status(404).json({
                message: "Product Not Found"
            });
        }
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
}