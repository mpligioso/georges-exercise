const express = require('express');
const Promo = require("../models/promo-model.js")

const router  = express.Router();


//ADD A DISCOUNT
router.post("/promos", (req, res, next) => {
  const {
    name,
    percent,
    minAge,
    maxAge,
    startDate,
    endDate,
    weatherType,
    weatherTemp
  } = req.body;

  const advantage = { percent };

  const restrictions =
    {
      age: {minAge, maxAge},
      date: {after: startDate, before: endDate },
      weather: {is: weatherType, temp: weatherTemp}
    };

  Promo.create({
    name, advantage, restrictions
  })
  .then((promoDoc) => {
    const promoId = promoDoc._id;
    res.redirect(`/promo-code/${promoId}`)
  })
  .catch((err) => {
    next(err);
  })
})

//CHECK ELIGIBILITY
router.post("/promo/:promoId", (req, res, next) => {

  const {promoId} = req.params;

  const {userAge} = req.body;

  const currentDate = new Date();

  Promo.findById(promoId)
    .then((promoDoc) => {
      res.locals.promoDoc = promoDoc;
      const {percent} = promoDoc.advantage;

      const {minAge, maxAge} = promoDoc.restrictions.age;
      const {startDate, endDate} = promoDoc.restrictions.date;
      const {weatherType, weatherTemp} = promoDoc.restrictions.weather;

      if ((userAge >= minAge) && (userAge <= maxAge)){
        res.json({name: promoDoc.name,
        status: "Accepted",
        advantage: percent
        })
        return;
      }
      else {
        res.json({
          name: promoDoc.name,
          status: "Denied",
        })
        return;
      }
    })
    .catch((err) => {
      next(err);
    })
})




module.exports = router;
