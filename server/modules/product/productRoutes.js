const router = require('express').Router();
const productController = require('./productController');
const authantication = require('../../middlewares/auth');


router.put("/add-product", authantication, productController.createProduct);
router.get("/get-all-products", authantication, productController.getAllProduct);
router.get("/", authantication, productController.getAllProduct);
router.get("/one-product/:id", authantication, productController.getProduct);
router.put("/update/:id", authantication, productController.updateProduct);
router.delete("/delete/:id", authantication, productController.deleteProduct);



module.exports = router;