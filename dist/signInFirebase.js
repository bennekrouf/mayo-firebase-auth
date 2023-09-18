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
exports.signInFirebase = void 0;
const auth_1 = __importDefault(require("@react-native-firebase/auth"));
const firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const app_1 = __importDefault(require("@react-native-firebase/app"));
const customInitializeFirebase = (firebaseConfig) => {
    if (!app_1.default.apps.length) {
        console.log(`RN Init firebase app with : ${firebaseConfig}`);
        app_1.default.initializeApp(firebaseConfig);
    }
    else {
        console.log(`RN Found firebase app`);
        app_1.default.app();
    }
};
const signInFirebase = (firebaseConfig, app, googleCredential) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`RN firebaseConfig : ${JSON.stringify(firebaseConfig)} app : ${JSON.stringify(app)}`);
    customInitializeFirebase(firebaseConfig);
    // Sign in to Firebase
    const firebaseUserCredential = yield (0, auth_1.default)().signInWithCredential(googleCredential);
    // Save user to AsyncStorage
    yield async_storage_1.default.setItem('user', JSON.stringify(firebaseUserCredential.user));
    // Save the last connection date in Firestore
    const id = firebaseUserCredential.user.email || firebaseUserCredential.user.uid;
    const appCollection = app === null || app === void 0 ? void 0 : app.toLocaleLowerCase();
    console.log(`Try to persist in : ${appCollection}/${id}`);
    yield (0, firestore_1.default)()
        .collection(appCollection)
        .doc(id)
        .set({
        lastConnectionDate: new Date(),
    }, { merge: true });
    console.log('AFTER firestore()');
    return firebaseUserCredential.user;
});
exports.signInFirebase = signInFirebase;
