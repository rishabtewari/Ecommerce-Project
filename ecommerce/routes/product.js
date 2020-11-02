const express=require("express");
const router=express.Router();

const {photo,update,create,read,remove,listBySearch,productById,list,relatedList,listCategories,listSearch }=require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const {userById} = require("../controllers/user");
router.get("/product/read/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/product/update/:productId/:userId", update);
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/products/related/:productId", relatedList);

router.get("/products/categories", listCategories);
router.post("/products/search", listSearch);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId",photo);
router.get('/products',list);
router.param('userId', userById);
router.param('productId', productById);
module.exports=router;