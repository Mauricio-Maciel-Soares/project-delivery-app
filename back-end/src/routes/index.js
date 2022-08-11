const express = require('express');

const loginRouter = require('./login/index');
const productsRouter = require('./products');
const registerRouter = require('./register');
const usersRouter = require('./users');
const salesRouter = require('./sales');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/login/validate', loginRouter);
router.use('/register', registerRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/sales', salesRouter);

module.exports = router;
