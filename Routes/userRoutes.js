const express = require('express');
const router = express .Router();
const userControllers = require('../Controllers/userController');
const { upload } = require('../confiq/multer');
const authmiddleware = require('../Middleware/authMiddleware')

router.post('/register',userControllers.registration)
router.post('/login',userControllers.login)
router.post('/getProducts',userControllers.getProducts)
router.post('/addProduct', upload.array('image', 10), userControllers.addProduct)
router.post('/getcartdata',authmiddleware,userControllers.cartData)
router.post('/addCart',authmiddleware,userControllers.addCart)
router.post('/delete',authmiddleware,userControllers.deleteCart)
router.post('/getProduct', userControllers.getSingleProduct)
router.post('/localCart', authmiddleware,userControllers.addLocalcart)




module.exports = router