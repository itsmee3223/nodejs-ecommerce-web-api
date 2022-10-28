const router = require("express").Router()

const userContrller = require("../controllers/userController")

router.get("/", userContrller.getUsers);

router.post("/login", userContrller.loginUser);
router.post("/register", userContrller.createUser);

router
  .route("/:id")
  .get(userContrller.getUser)
  .put(userContrller.updateUser)
  .delete(userContrller.deleteUser);

module.exports = router