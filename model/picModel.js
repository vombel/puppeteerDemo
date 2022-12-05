const mongoose = require('mongoose');

const picSchema = new mongoose.Schema({
    title: {
        type:String,
        trim:true,
    },
    length:Number,
    picarray: {
        type:Array
    },
    createTime: Date
});

module.exports = picSchema;
