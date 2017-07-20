const ListTemplate = require('../models/ListTemplate')

exports.getTemplates = (req, res) => {
  ListTemplate.find().sort('actions').exec((err, templates) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ templates })
  })
}