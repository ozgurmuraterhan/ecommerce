const router = require("express").Router();

const roleController = require("../controllers/roleController");

//@desc   GET all roles from db
//@route  GET /api/v1/role
//@access Public
router.get("/", roleController.getRoles);

//@desc   GET a role by id from db
//@route  GET /api/v1/role/:id
//@access Public
router.get("/:id", roleController.getRoleById);

//@desc   POST a role to db
//@route  POST /api/v1/role
//@access Admin, RolesManager
router.post("/", roleController.addRole);

//@desc   PUT(edit) a role from db
//@route  PUT(edit) /api/v1/role/:id
//@access Admin, RolesManager
router.put("/", roleController.editRole);

//@desc   DELETE a role by id from db
//@route  DELETE /api/v1/role/:id
//@access Admin
router.delete("/:id", roleController.deleteRole);

module.exports = router;
