"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var CONNECTION_STRING = "mongodb+srv://dev:dev@cluster0-r6uvt.mongodb.net/test?retryWrites=true";
var Database = /** @class */ (function () {
    function Database() {
        mongoose_1.default.connect(CONNECTION_STRING, { useNewUrlParser: true }).then(function (x) {
            console.log('Connected to database');
        });
        this.User = mongoose_1.default.model('User', this.userSchema());
    }
    Database.prototype.userSchema = function () {
        return new mongoose_1.default.Schema({
            _id: mongoose_1.default.Schema.Types.ObjectId,
            username: { type: String, required: true },
            password: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true }
        });
    };
    return Database;
}());
var DB = new Database();
exports.default = DB;
