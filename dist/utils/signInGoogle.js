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
exports.signInGoogle = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const auth_1 = __importDefault(require("@react-native-firebase/auth"));
const google_signin_1 = require("@react-native-google-signin/google-signin");
const signInGoogle = (webClientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`RNA - 0 - GoogleSignin.configure with params ${JSON.stringify({ webClientId: webClientId })}`);
        google_signin_1.GoogleSignin.configure({ webClientId: webClientId });
        const res = yield google_signin_1.GoogleSignin.hasPlayServices();
        console.log(`RNA - 1 - GoogleSignin.hasPlayServices : ${JSON.stringify(res)}`);
        const result = yield google_signin_1.GoogleSignin.signIn();
        console.log(`RNA - 2 - GoogleSignin.signIn : ${JSON.stringify(result)}`);
        yield async_storage_1.default.setItem('webClientId', webClientId); // Used for convenience of the logout
        return auth_1.default.GoogleAuthProvider.credential(result.idToken);
    }
    catch (error) {
        if (error.code === google_signin_1.statusCodes.SIGN_IN_CANCELLED) {
            console.log('SIGN_IN_CANCELLED');
        }
        else {
            console.log('RNA - X - GoogleSignin.hasPlayServices: ', error.message, error.code);
        }
    }
});
exports.signInGoogle = signInGoogle;
