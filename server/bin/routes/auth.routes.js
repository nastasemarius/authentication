"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var database_1 = __importDefault(require("../database"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = express_1.Router();
router.post('/signup', function (req, res) {
    bcryptjs_1.default.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        else {
            var user = new database_1.default.User(__assign({}, req.body, { _id: new mongoose_1.Types.ObjectId(), password: hash }));
            user.save()
                .then(function (result) {
                res.status(200).json({
                    success: 'New user has been created'
                });
            })
                .catch(function (error) {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
        }
    });
});
router.post('/login', function (req, res) {
    database_1.default.User.findOne({ username: req.body.username })
        .exec()
        .then(function (user) {
        if (user) {
            bcryptjs_1.default.compare(req.body.password, user.password)
                .then(function () {
                var token = jsonwebtoken_1.default.sign({
                    permissions: ["read", "write"],
                    username: user.username,
                    firstName: user.firstname,
                    lastName: user.lastName
                }, 'secret', { expiresIn: '24h' });
                res.send({
                    success: 'User password matches',
                    token: token
                });
            })
                .catch(function (err) {
                res.sendStatus(401).json({
                    error: err
                });
            });
        }
        else {
            res.sendStatus(401).json({
                error: 'User does not exist'
            });
        }
    });
});
var AuthController = router;
exports.default = AuthController;
