"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_if_authenticated_middleware_1 = require("../middleware/check-if-authenticated.middleware");
const check_if_admin_middleware_1 = require("../middleware/check-if-admin.middleware");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, user_controller_1.getAllUsers);
router.route('/:id')
    .delete(check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, user_controller_1.deleteUser)
    .get(check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, user_controller_1.getUserById);
exports.default = router;
