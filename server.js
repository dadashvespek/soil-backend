const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promoter = require('./Models/PromoterModel');
const app = express();
const Country = require('./Models/CountryModel'); 
mongoose.connect("mongodb+srv://test:test@cluster1.dqc2zmr.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const cors = require('cors');
app.use(cors());
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});


  
app.use(bodyParser.json());
const generateUniqueId = () => {
    
    return Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
  };
  
  app.post('/save-form', async (req, res) => {
    const formData = req.body;
  
    let promoter;
  
    try {
      promoter = await Promoter.findOne({ email: formData.email });
  
      if (promoter) {
        for (let key in formData) {
          promoter[key] = formData[key];
        }
      } else {
        formData.PromoterID = generateUniqueId();
        promoter = new Promoter(formData);
      }
  
      await promoter.save();
      res.status(200).json({
        status: 'success',
        message: 'Data processed successfully.'
      });
      
  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to process data.'
      });
      
    }
  });



  app.get('/get-application', async (req, res) => {
    const email = req.query.email;
  
    try {
      const application = await Promoter.findOne({ email: email }).lean();
      if (application) {
        if (application.replyDate !== null) {
          if (application.stage === 'Awaiting Reply') {
            application.stage = 'Awaiting New Information';
            await Promoter.findOneAndUpdate({ email: email }, { stage: 'Awaiting New Information' });
          }
          res.json(application);
        } else {
          res.json({
            status: 'pending',
            message: 'Application is pending or not found.',
            stage: application.stage || 'Unknown'
          });
        }
      } else {
        res.json({
          status: 'pending',
          message: 'Application not found.'
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch application.'
      });
    }
  });


  app.post('/update-application-status', async (req, res) => {
    const formData = req.body;
  
    if (!formData.email || !formData.stage) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and stage are required for updating.'
      });
    }
  
    try {
      const promoter = await Promoter.findOne({ email: formData.email });
  
      if (promoter) {
        // Update fields
        for (let key in formData) {
          promoter[key] = formData[key];
        }
  
        await promoter.save();
        res.status(200).json({
          status: 'success',
          message: 'Data updated successfully.'
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Promoter not found.'
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update data.'
      });
    }
  });
  


const PORT = 5000   ;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});