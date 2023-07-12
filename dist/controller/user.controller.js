"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginController = void 0;
const user_service_1 = require("../services/user.service");
const userLoginController = (req, res, next) => (0, user_service_1.userLoginService)(req, res, next);
exports.userLoginController = userLoginController;
//# sourceMappingURL=user.controller.js.map