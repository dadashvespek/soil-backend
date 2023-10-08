const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  CountryID: {
    type: Number,
    required: true,
    unique: true
  },
  CountryName: {
    type: String,
    required: true
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
