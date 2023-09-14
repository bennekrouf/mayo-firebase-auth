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
exports.signIn = void 0;
const auth_1 = __importDefault(require("@react-native-firebase/auth"));
const firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const google_signin_1 = require("@react-native-google-signin/google-signin");
const signIn = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield google_signin_1.GoogleSignin.hasPlayServices();
        const result = yield google_signin_1.GoogleSignin.signIn();
        const googleCredential = auth_1.default.GoogleAuthProvider.credential(result.idToken);
        // Sign in to Firebase
        const firebaseUserCredential = yield (0, auth_1.default)().signInWithCredential(googleCredential);
        // Save user to AsyncStorage
        yield async_storage_1.default.setItem('user', JSON.stringify(firebaseUserCredential.user));
        // Save the last connection date in Firestore
        yield (0, firestore_1.default)()
            .collection('users')
            .doc(firebaseUserCredential.user.uid)
            .collection('apps')
            .doc('abjad')
            .set({
            lastConnectionDate: new Date(),
        }, { merge: true });
        return firebaseUserCredential.user;
    }
    catch (error) {
        console.log(error);
        if (error.code === google_signin_1.statusCodes.SIGN_IN_CANCELLED) {
            // User cancelled the login flow
        }
        else {
            // Some other error
        }
    }
});
exports.signIn = signIn;
