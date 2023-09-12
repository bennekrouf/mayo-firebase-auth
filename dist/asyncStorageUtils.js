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
exports.readAllFromAsyncStorage = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const readAllFromAsyncStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    let allKeys = [];
    let allData = {};
    try {
        allKeys = yield async_storage_1.default.getAllKeys();
    }
    catch (e) {
        console.error('Failed to fetch all keys from AsyncStorage:', e);
        return {};
    }
    try {
        const resultArray = yield async_storage_1.default.multiGet(allKeys);
        allData = resultArray.reduce((acc, [key, value]) => {
            if (key !== null && value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});
    }
    catch (e) {
        console.error('Failed to fetch values for all keys:', e);
    }
    return allData;
});
exports.readAllFromAsyncStorage = readAllFromAsyncStorage;
