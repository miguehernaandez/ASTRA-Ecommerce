const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./Category');
const userRouter = require('./User.js');
const userOrder = require('./order.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/products', categoryRouter);
router.use('/user', userRouter);
router.use('/order', userOrder);

module.exports = router;
