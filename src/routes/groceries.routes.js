/*jshint esversion: 6 */
const { Router } = require('express');
const groceriesCtrl = require('../controllers/groceries.controller');
const router = Router();


router.get('/', groceriesCtrl.getGroceries);
router.post('/', groceriesCtrl.createGrocery);
router.get('/:id', groceriesCtrl.getGrocery);
router.put('/:id', groceriesCtrl.updateGrocery);
router.delete('/:id', groceriesCtrl.deleteGrocery);



module.exports = router;