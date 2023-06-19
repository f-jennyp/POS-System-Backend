const express = require("express");
const route = express.Router();
const { VerifyToken } = require("../middlewares/token.validate");

//PRODUCT
const { createProduct } = require("../controllers/products/create_product");
const { validator_product, productSchema } = require("../middlewares/createproduct.validate");
const { getProducts, getOne, countProducts, getOneCategory, getAllCategory, getProductDate } = require("../controllers/products/get_product");
const { deleteOneProduct } = require("../controllers/products/delete_product");
const { updateProduct } = require("../controllers/products/update_product");
const { upload } = require("../middlewares/upload.image");
const { uploadCSV } = require("../middlewares/upload.cvs")
const { uploadProductCSV } = require("../controllers/products/upload_product_csv")

route.post("/product/create", VerifyToken, upload.single('image'), validator_product.body(productSchema), createProduct);
route.post("/product/uploadCSV", VerifyToken, uploadCSV.single('file'), uploadProductCSV);
route.get("/product/getAll", VerifyToken, getProducts);
route.get("/product/getOne/:product_id", VerifyToken, getOne);
route.get("/product/getCategory/:product_category", VerifyToken, getOneCategory);
route.get("/product/getAllCategory", VerifyToken, getAllCategory);
route.get("/product/getDate/:start/:end", VerifyToken, getProductDate);
route.get("/product/countProducts", VerifyToken, countProducts);
route.delete("/product/deleteOne/:product_id", VerifyToken, deleteOneProduct);
route.put("/product/update", VerifyToken, upload.single('image'), updateProduct);
//route.put("/product/updateImage", VerifyToken, upload.single('image'), updateProduct);

//USERS
const { createUser } = require("../controllers/user/create_user");
const { loginUser } = require("../controllers/user/login_user");
const { getUsers, getOneUser, countUsers, getBatch, getAllBatch } = require("../controllers/user/get_user");
const { validator_user, userSchema } = require("../middlewares/createuser.validate");
const { deleteOneUser } = require("../controllers/user/delete_user");
const { updateUser } = require("../controllers/user/update_user");
const { uploadUserCSV } = require("../controllers/user/upload_user_csv");
const { parseCSV } = require("../middlewares/parseCSV")

route.post("/user/create", VerifyToken, validator_user.body(userSchema), createUser);
route.post("/user/login", loginUser);
route.post("/user/uploadCSV", VerifyToken, uploadCSV.single('file'), parseCSV, uploadUserCSV);
route.get("/user/getOne/:user_id", VerifyToken, getOneUser);
route.get("/user/countUsers", VerifyToken, countUsers);
route.get("/user/getAll", VerifyToken, getUsers);
route.get("/user/batch/:batch", VerifyToken, getBatch);
route.get("/user/getAllBatch", VerifyToken, getAllBatch);
route.delete("/user/deleteOne/:user_id", VerifyToken, deleteOneUser);
route.put("/user/update", VerifyToken, updateUser);

//USERLOGS
const { getUserlogs, getOneUserlog, countUserlogs, getUserlogsDate } = require("../controllers/userlogs/get_logs");
const { getLoginUsers, getUserUploadMemberCSV, getUserUploadProductCSV, getUserCreateProduct,
    getUserDeleteProduct, getUserUpdateProduct, getUsernames } = require("../controllers/userlogs/get_activity_logs");

route.get("/userlogs/getAll", VerifyToken, getUserlogs);
route.get("/userlogs/getOne/:user_id", VerifyToken, getOneUserlog);
route.get("/userlogs/countUserlogs", VerifyToken, countUserlogs);
route.get("/userlogs/getUserlogsDate/:start/:end", VerifyToken, getUserlogsDate);

//get userlogs by activity
route.get("/userlogs/loginUsers", VerifyToken, getLoginUsers);
route.get("/userlogs/firstname/:first_name", VerifyToken, getUsernames);
route.get("/userlogs/uploadMemberCSV", VerifyToken, getUserUploadMemberCSV);
route.get("/userlogs/uploadProductCSV", VerifyToken, getUserUploadProductCSV);
route.get("/userlogs/createProduct", VerifyToken, getUserCreateProduct);
route.get("/userlogs/deleteProduct", VerifyToken, getUserDeleteProduct);
route.get("/userlogs/updateProduct", VerifyToken, getUserUpdateProduct);

//TRANSACTIONS
const { validator_transactions, transactionSchema } = require("../middlewares/createtransactions.validate");
const { createOrders } = require("../controllers/transactions/create_transactions")

route.post("/transactions/create", validator_transactions.body(transactionSchema), createOrders)


module.exports = route;

