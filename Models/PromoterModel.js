const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const promoterSchema = new Schema({
  PromoterID: {
    type: Number,
    required: true,
    unique: true
  },
  DateOfRegistration: {
    type: Date,
    default: Date.now
  },
  PromoterStatus: String,
  email: {
    type: String,
    required: true
  },
  contactName: String, 
  contactPreference: String, 
  contactPosition: String,  
  region: String,  
  country: String, 
  // countryID: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Country'  // Assuming you have a Country model
  // },
  municipality: String,
  orgName: String,  
  orgType: String, 
  ongoingProgram: String, 
  soilTopics: String,  
  implementationScale: String,
  involveInstitutions: String, 
  targetCommunitySize: String,  
  developedMaterials: String,  
  accessToFunds: String,  
  agreementWithToR: String,  
  feedback: String,
  preferredContactMeans: String,
  replyDate: Date,
  replyContent: String,
  actorType: String,
  mapInstitutionName: String,
  registeredInMap: Boolean,
  registeredInMapDesc: String,
  comments: String,
  stage:String
});

const Promoter = mongoose.model('Promoter', promoterSchema);

module.exports = Promoter;
