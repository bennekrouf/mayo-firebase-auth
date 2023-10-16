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
const rn_logging_1 = require("rn-logging");
const signInGoogle = (webClientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        rn_logging_1.Logger.info("Configuring GoogleSignin with webClientId.", { webClientId });
        google_signin_1.GoogleSignin.configure({ webClientId: webClientId });
        const playServicesAvailable = yield google_signin_1.GoogleSignin.hasPlayServices();
        rn_logging_1.Logger.info("Checking availability of Google Play Services.", { playServicesAvailable });
        const signInResult = yield google_signin_1.GoogleSignin.signIn();
        rn_logging_1.Logger.info("User signed in using Google.", { userId: signInResult.user.id }); // Log only user ID for privacy reasons
        if (webClientId) {
            yield async_storage_1.default.setItem('webClientId', webClientId); // Store webClientId for convenience during logout
            rn_logging_1.Logger.info("Stored webClientId in AsyncStorage.");
        }
        return auth_1.default.GoogleAuthProvider.credential(signInResult.idToken);
    }
    catch (error) {
        if (error.code === google_signin_1.statusCodes.SIGN_IN_CANCELLED) {
            rn_logging_1.Logger.warn("User cancelled the Google sign-in process.");
        }
        else {
            rn_logging_1.Logger.error("Error during Google sign-in.", { message: error.message, errorCode: error.code });
        }
    }
});
exports.signInGoogle = signInGoogle;
