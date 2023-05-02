const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const BuildSchema = new mongoose.Schema({
    buildName: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    cost: {
        type: Number,
        min: 0,
        required: true,
    },
    blaster: {
        type: String,
        required: true,
        trim: true,
    },
    spring: {
        type: String,
        required: true,
        trim: true,
    },
    barrel: {
        type: String,
        required: true,
        trim: true,
    },
    additional: {
        type: String,
        required: true,
        trim: true,
    },
    nerfer: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

BuildSchema.statics.toAPI = (doc) => ({
    buildName: doc.buildName,
    cost: doc.cost,
    blaster: doc.blaster, 
    spring: doc.spring,
    barrel: doc.barrel,
    additional: doc.additional,
    nerfer: doc.nerfer,
});

const BuildModel = mongoose.model('Build', BuildSchema);
module.exports = BuildModel;