const mongoose = require ('mongoose')

const ProductSchema = new mongoose.Schema({
    product :{
        type : String,
        required : true
    },
    price:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    image:{
        type:[String],
    },
    category:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})

    module.exports = mongoose.model('Product',ProductSchema);