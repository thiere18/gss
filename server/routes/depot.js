// import express from 'express';
const express = require('express');
const router = express.Router()
const depotController=require('../controllers/depot') 
router.get('/', depotController.getDepot);
router.post('/delete', depotController.delete);
router.post('/add', depotController.addDepot);

module.exports= router;