const router = require("express").Router();
const helloRoute = require("../helloworld/helloworld.js");
const testRoute = require("../test/testRoutes.js");
const stockRoute = require("../stock/stockRoute.js");

//const exampleRoutes = require('./exampleRoutes');

//const testController = require('../controllers/testController')

//router.use('/example', exampleRoutes);
router.use("/hello", helloRoute);
router.use("/test", testRoute);
router.use("/stock", stockRoute);

module.exports = router;
