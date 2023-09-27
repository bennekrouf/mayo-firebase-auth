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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirebaseLogout = void 0;
const react_1 = require("react");
const native_1 = require("@react-navigation/native");
const index_1 = require("../index");
const useLogout_1 = require("./useLogout");
const useFirebaseLogout = (backScreen) => {
    const { performLogout } = (0, useLogout_1.useLogout)();
    const { authEvents } = (0, react_1.useContext)(index_1.UserContext);
    const navigation = (0, native_1.useNavigation)();
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
