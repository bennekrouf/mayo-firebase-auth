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
exports.useLogout = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const google_signin_1 = require("@react-native-google-signin/google-signin");
const authEvents_1 = __importDefault(require("../authEvents"));
const useLogout = () => {
    const performLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield google_signin_1.GoogleSignin.revokeAccess();
            yield google_signin_1.GoogleSignin.signOut();
            yield async_storage_1.default.removeItem('user');
            authEvents_1.default.emit('signedOut', true);
        }
        catch (error) {
            console.error(error);
        }
    });
    return { performLogout };
};
exports.useLogout = useLogout;
