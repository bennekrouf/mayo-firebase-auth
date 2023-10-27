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
const mayo_firebase_config_1 = require("mayo-firebase-config");
const signInGoogle_1 = require("../utils/signInGoogle");
const authEvents_1 = __importDefault(require("../authEvents"));
const mayo_logger_1 = require("mayo-logger");
const img = require('../../assets/google_button.png');
const SignInScreen = ({}) => {
    var _a;
    const firebaseConfig = (0, mayo_firebase_config_1.extractFirebaseConfig)();
    const webClientId = (_a = firebaseConfig === null || firebaseConfig === void 0 ? void 0 : firebaseConfig.webClientId) !== null && _a !== void 0 ? _a : "";
    const handleSignIn = () => __awaiter(void 0, void 0, void 0, function* () {
        mayo_logger_1.Logger.info("Initiating Google sign-in.");
        try {
            if (react_native_1.Platform.OS === 'android' && !webClientId) {
                mayo_logger_1.Logger.warn("webClientId is not provided for Android.");
                throw Error(`RN SignInScreen - webClientId is not provided for Android`);
            }
            else {
                mayo_logger_1.Logger.info(`Requesting authentication with webclientId: ${webClientId}`);
                const googleCredential = yield (0, signInGoogle_1.signInGoogle)(webClientId);
                if (!googleCredential) {
                    const errorMsg = `signInGoogle did not return any user for webClientId ${webClientId}`;
                    mayo_logger_1.Logger.error(errorMsg);
                    throw Error(`RN SignInScreen - ${errorMsg}`);
                }
                mayo_logger_1.Logger.info("User signed in successfully.", { googleCredential });
                authEvents_1.default.emit('signedIn', googleCredential);
            }
        }
        catch (error) {
            mayo_logger_1.Logger.error(`Authentication error: ${JSON.stringify(error)}`, error);
            return error;
        }
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
