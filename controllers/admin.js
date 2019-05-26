const User = require('../models/user');
const Resume = require('../models/resume');
const Lookup = require('../models/lookup');

const getValues = require('../getValues');

exports.getHome = (req, res) => {
    res.render('admin/search-candidate', { pageTitle: 'Administrator', path: '/admin/', 
    phd            : getValues.phd,
    professional   : getValues.professional,
    diploma        : getValues.diploma,
    masters        : getValues.masters,
    bachelors      : getValues.bachelors,
    jobSector      : getValues.jobSector,
    educationLevel : getValues.educationLevel
  });
}

exports.postSearch = (req,res)=>{
    console.log(req.body)
}