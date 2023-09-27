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
exports.SignInScreen = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const signInGoogle_1 = require("../utils/signInGoogle");
const authEvents_1 = __importDefault(require("../authEvents"));
const img = require('../assets/google_button.png');
const SignInScreen = () => {
    const handleSignIn = () => __awaiter(void 0, void 0, void 0, function* () {
        const googleCredential = yield (0, signInGoogle_1.signInGoogle)();
        // console.log('RN EMIT signedIn : ', googleCredential);
        authEvents_1.default.emit('signedIn', googleCredential);
    });
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_1.StatusBar, { hidden: true }),
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleSignIn },
            react_1.default.createElement(react_native_1.Image, { source: img, style: { width: 192, height: 48 } }))));
};
exports.SignInScreen = SignInScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
