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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProvider = exports.UserContext = void 0;
const react_1 = __importStar(require("react"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const authEvents_1 = __importDefault(require("./authEvents"));
const useLogout_1 = require("./useLogout");
exports.UserContext = (0, react_1.createContext)(null);
const UserProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchUser = () => __awaiter(void 0, void 0, void 0, function* () {
            const storedUser = yield async_storage_1.default.getItem('user');
            console.log('RN AUTH - Stored user :', storedUser);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        });
        fetchUser();
    }, []);
    return (react_1.default.createElement(exports.UserContext.Provider, { value: { user, setUser, useLogout: useLogout_1.useLogout, authEvents: authEvents_1.default } }, children));
};
exports.UserProvider = UserProvider;
