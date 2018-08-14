const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const promoSchema = new Schema ({
  name: {type: String, unique: true, required: true},
  advantage: {
    percent: {type: Number, required: true}
  },
  restrictions: {
    age: {
      minAge: {type: Number},
      maxAge: {type: Number}
    },
    date: {
      after: {type: Date, required: true},
      before: {type: Date, required: true},
    },
    weather: {
      is: {type: String},
      temp: {type: Number},
    }
  }
},
{
  timestamps: true,
})

const Promo = mongoose.model("Promo", promoSchema);

module.exports = Promo;