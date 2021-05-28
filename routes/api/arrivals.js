const express = require('express');
const router = express.Router();
const controller = require('../../controllers/arrivalsController');

router.get('/', controller.getArrivals);
router.post('/',controller.createArrival);
router.put('/:id',controller.updateArrivalById);
router.delete('/:id',controller.deleteArrivalById);

module.exports = router;