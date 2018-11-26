const express = require('express');
const router = express.Router();
var excel = require('../js/excel');  

/* GET api listing. */
/**Routing should happen from here */

router.get('/excel', (req, res) => {
  res.send(excel);
});

router.get('/applicantlist',(req,res)=>{
  console.log("request : ",excel.readCsv().json);
  res.send(excel.readCsv().json);
});


// Get it from the data base in here for upload table
router.get('/upload', (req, res) => {
  res.send(JSON.stringify('murshidthis is working'));
});



module.exports = router;