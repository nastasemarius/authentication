"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var users_routes_1 = __importDefault(require("./routes/users.routes"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.config();
    }
    App.prototype.config = function () {
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.configureRoutes();
    };
    App.prototype.configureRoutes = function () {
        this.app.use('/auth', auth_routes_1.default);
        this.app.use('/users', users_routes_1.default);
    };
    return App;
}());
var app = new App().app;
exports.default = app;
