// import express from 'express';
const express = require('express');
const router = express.Router()
const authController=require('../controllers/auth.js') 
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/reset', authController.reset);

module.exports= router;