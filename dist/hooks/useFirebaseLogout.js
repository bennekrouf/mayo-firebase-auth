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
exports.useFirebaseLogout = void 0;
const react_1 = require("react");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const native_1 = require("@react-navigation/native");
const index_1 = require("../index");
const useFirebaseLogout = (backScreen) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const { authEvents } = (0, react_1.useContext)(index_1.UserContext);
    const navigation = (0, native_1.useNavigation)();
    const performLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        yield async_storage_1.default.removeItem('user');
        setUser(null);
        authEvents.emit('signedOut', true);
    });
    (0, react_1.useEffect)(() => {
        const onSignedOut = () => __awaiter(void 0, void 0, void 0, function* () {
            navigation.navigate(backScreen);
        });
        authEvents.on('signedOut', onSignedOut);
        return () => {
            authEvents.off('signedOut', onSignedOut);
        };
    }, []);
    return { performLogout };
};
exports.useFirebaseLogout = useFirebaseLogout;
