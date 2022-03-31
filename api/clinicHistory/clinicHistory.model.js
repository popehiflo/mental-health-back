const mongoose = require ('mongoose');
const clinicHistory = new mongoose.Schema({
    //idpatient:{type: Number, required: true},
    //iddoctor:{type: Number, required: true},
    description: {type: String, required: true},
},
{
    timestamps: true,
    versionKey: false,
  })

module.exports = mongoose.model('clinicHistory', clinicHistory);