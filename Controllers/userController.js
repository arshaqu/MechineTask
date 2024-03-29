const { hash } = require('bcrypt');
const User = require('../Models/userModel')
const Product = require('../Models/productModels')
const Cart = require('../Models/cartModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const registration = async(req,res) => {
    try {
        
    const userExist = await User.findOne({email:req.body.email})
    if(userExist){
        return res.status(404)
        .send({message :"Already an User" , success:false})
    }
    else{
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await hash(password , salt)
        req.body.password = hashedpassword
        const newUser = new User(req.body)
        await newUser.save()
        res.status(200)
        .send({ message:'User Registered',success:true})
    }

    } catch (error) {
        console.log(error);
    }
}

const login = async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(400)
            .send({ message :"User is Not Found",success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password , user.password)
        if(!isMatch){
            return res.status(400)
            .send({ message: "Password you Entered is Incorrect",success:false })
        }
       else{
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })
        res.status(200)
        .send({ message:'User Login' ,success:true,data:token})
       }
        console.log("success");
    } catch (error) {
        console.log(error);
    }
}


const addProduct = async (req,res)=>{
    try {
        const images = req.files.map((file)=>file.filename)
        const newProduct = new Product({
            product : req.body.product,
            price:req.body.price,
            model:req.body.model,
            image:images,
            category:req.body.category,
            size:req.body.size,
            color:req.body.color,
            description:req.body.description
        })
        const productData = await newProduct.save()
        if(productData){
            res.status(200)
            .send({ message:'Product Added Successfully',success:true})
        }
        else{
            res.status(400)
            .send({ message:'Product Cannot not be added',success:false})
        }
    } catch (error) {
        console.log(error);
    }
}


const getProducts = async (req,res) => {
    try {
        const productslist = await Product.find({})
        if(productslist){
            res.status(200)
            .send({ message:'Product Fetched',productslist})
        }
    } catch (error) {
        console.log(error);
    }
}

const cartData = async (req,res) =>{
    try {
        const userId = req.body.userId
        const Products = await Cart.find({ userId:userId })
        if(Products){
            res.status(200)
            .send({ message:'Product find',Products})
        }
    } catch (error) {
        console.log(error);
    }
}

const addCart = async (req, res) => {
    const Pro_id = req.body.Pro_id;
    const userId = req.body.userId;

    try {
        const cartData = await Cart.findOne({ userId: userId, productid: Pro_id });
        if (!cartData) {
            const productData = await Product.findOne({ _id: Pro_id });
            const newCartProduct = new Cart({
                userId: userId,
                productid: Pro_id,
                product: productData.product,
                price: productData.price,
                model: productData.model,
                image: productData.image,
                category: productData.category,
                size: productData.size,
                color: productData.color,
                description: productData.description,
                count: 1  
            });
            await newCartProduct.save();
            return res.status(200).send({ message: "Product added to cart", success: true });
        } else {
            await Cart.updateOne(
                { userId: userId, productid: Pro_id },
                { $inc: { count: 1 } }
            );
            return res.status(200).send({ message: "Product count increased", success: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error adding product to cart", success: false });
    }
};

const getSingleProduct = async(req, res) => {
    try {
        const Pro_id = req.body.Pro_id;
        const productData = await Product.findOne({ _id: Pro_id });
        console.log(Pro_id, productData)
        if(productData) {
            return res.status(200).send(productData)
        }else{
            return res.status(400).send({message: "Product not found", success: false});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: "Error finding product", success: false})
    }   
}

const deleteCart = async(req,res) => {
    try {
        console.log(req.body);
        const userId =req.body.product.user_id
        const cartId = req.body.product._id
        await Cart.deleteOne({ user_id: userId, _id: cartId });
        
        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}

const addLocalcart = async (req,res) =>{
    try {
        console.log(req.body)
        const {userId, ...productDataArray} = req.body;
        const data = Object.values(productDataArray)
        for (const productData of data) {
            const newCartProduct = new Cart({
              userId: userId,
              productid: productData.productid,
              product: productData.product,
              price: productData.price,
              model: productData.model,
              image: productData.image,
              category: productData.category, 
              size: productData.size,
              color: productData.color,
              description: productData.description,
              count: productData.count
            });
            console.log(newCartProduct);
            await newCartProduct.save();
            res.status(200)
            .send( {message:'Data saved successfully',success:true } )
          }
    } catch (error) {
        console.error(error);
    }
}


module.exports =  {
    registration,
    login,
    addProduct,
    getProducts,
    cartData,
    addCart,
    deleteCart,
    getSingleProduct,
    addLocalcart
}