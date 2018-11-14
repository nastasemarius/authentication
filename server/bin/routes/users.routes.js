"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var database_1 = __importDefault(require("../database"));
var router = express_1.Router();
router.get('/:username', function (req, res) {
    database_1.default.User.findOne({ username: req.params.username })
        .exec()
        .then(function (user) {
        if (user) {
            console.log(user.username + " EXISTS");
        }
        res.json({ username: user ? user.username : '' });
    });
});
var UserRoutes = router;
exports.default = UserRoutes;
