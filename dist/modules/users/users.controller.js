"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = exports.adminAuthentication = exports.updateUsersById = exports.deleteUsersById = exports.createNewUsers = exports.getUsersById = exports.getUsers = void 0;
const users_model_1 = require("./users.model");
const bcrypt = require('bcrypt');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield users_model_1.users.find({}, null);
        res.json(list);
    });
}
exports.getUsers = getUsers;
function getUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params;
        const one = yield users_model_1.users.findById({ _id: id });
        res.json(one);
    });
}
exports.getUsersById = getUsersById;
function createNewUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { formData } = req.body;
        const myPlaintextPassword = formData.password;
        bcrypt.hash(myPlaintextPassword, 10, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                formData.password = hash;
                console.log(formData);
                try {
                    yield users_model_1.users.create(formData);
                    res.sendStatus(200);
                }
                catch (error) {
                    res.status(400).json({ error });
                }
            });
        });
        res.sendStatus(200);
    });
}
exports.createNewUsers = createNewUsers;
function deleteUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield users_model_1.users.findByIdAndRemove({ _id: id });
        res.json({ removedId: id });
    });
}
exports.deleteUsersById = deleteUsersById;
function updateUsersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedFields = req.body;
        yield users_model_1.users.findByIdAndUpdate({ _id: id }, updatedFields);
        res.json({ updatedId: id });
    });
}
exports.updateUsersById = updateUsersById;
function userAuthentication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const one = yield users_model_1.users.findOne({ email });
        if (one) {
            bcrypt.compare(password, one.password, function (err, result) {
                if (result) {
                    res.status(200).json(one);
                }
                else {
                    res.status(400).json({ message: "Оруулсан мэдээлэл буруу байна" });
                }
            });
        }
        else {
            res.status(400).json({ message: "Оруулсан мэдээлэл буруу байна" });
        }
    });
}
exports.userAuthentication = userAuthentication;
//  login autherzation admin
function adminAuthentication(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const one = yield users_model_1.users.findOne({ email: email });
        console.log("one: ", one);
        console.log("password: ", password);
        if (one && one.password == password) {
            const token = jsonwebtoken_1.default.sign({ users_id: one._id, role: one.role }, `${process.env.JWT_SECRET}`);
            console.log(token);
            res.status(200).json({ token: token });
            //  bcrypt.compare(password, one.password, function (err : any, result : any) {
            //   console.log(result)
            //  if(result){
            //    const token = jwt.sign({users_id : one._id}, `${process.env.JWT_SECRET}`)
            //    console.log(token)
            //    res.status(200).json({token : token})
            //  } else {
            //    res.status(400).json({ message: "Something went wrong" });
            //  }
            //  })
            console.log("yes authenticated");
        }
        else {
            res.status(400).json({ message: "Something went wrong" });
        }
    });
}
exports.adminAuthentication = adminAuthentication;
