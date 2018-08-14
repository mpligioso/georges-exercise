const express = require('express');

const Promo = require('../models/promo-model.js')

const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/add-promo-code', (req, res, next) => {
  res.render('add-promo');
})

router.get('/use-promo-code/:promoId', (req, res, next) => {
  const {promoId} = req.params;

  Promo.findById(promoId)
  .then((promoDoc) => {
    res.locals.promoDoc = promoDoc;
    res.render('use-promo');
  })
  .catch((err) => {
    next((err));
  })
})

router.get('/promo-codes', (req, res, next) => {
  Promo.find()
  .then((promos) => {
    res.locals.promos = promos;
    res.render("promos");
  })
  .catch((err) => {
    next(err);
  })
})

router.get('/promo-code/:promoId', (req, res, next) => {
  const { promoId } = req.params;

  Promo.findById(promoId)
  .then((promoDoc) => {
    res.locals.promoDoc = promoDoc;
    res.render('promo-details');
  })
  .catch((err) => {
    next(err);
  })
})

module.exports = router;
