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
    fps: {
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
        type: Number,
        required: true,
        trim: true,
    },
    barrelid: {
        type: Number,
        required: true,
        trim: true,
    },
    barrellength: {
        type: Number,
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
    fps: doc.fps,
    blaster: doc.blaster, 
    spring: doc.spring,
    barrelid: doc.barrelid,
    barrellength: doc.barrellength,
    nerfer: doc.nerfer,
});

const BuildModel = mongoose.model('Build', BuildSchema);
module.exports = BuildModel;