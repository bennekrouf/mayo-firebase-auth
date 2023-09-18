"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInScreen = exports.authEvents = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const signInGoogle_1 = require("./signInGoogle");
const UserContext_1 = require("./UserContext");
const events_1 = require("events");
const signInFirebase_1 = require("./signInFirebase");
exports.authEvents = new events_1.EventEmitter();
const SignInScreen = (paramsObj) => {
    const firebaseConfig = paramsObj.route.params.firebaseConf;
    const app = paramsObj.route.params.app;
    const { user, setUser } = (0, react_1.useContext)(UserContext_1.UserContext);
    console.log("UserContext:", user);
    const handleSignIn = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('RN AUTH - BEFORE SIGN IN GOOGLE');
        const googleCredential = yield (0, signInGoogle_1.signInGoogle)();
        console.log('RN AUTH - BEFORE SIGN IN FIREBASE');
        const newUser = (0, signInFirebase_1.signInFirebase)(firebaseConfig, app, googleCredential);
        setUser(newUser);
        exports.authEvents.emit('signedIn', newUser);
    });
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleSignIn },
            react_1.default.createElement(react_native_1.Image, { source: require('../assets/google_button.png'), style: { width: 192, height: 48 } }))));
};
exports.SignInScreen = SignInScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
