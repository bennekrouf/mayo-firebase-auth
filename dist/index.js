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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirebaseLogout = exports.SignInScreen = exports.signInGoogle = void 0;
var signInGoogle_1 = require("./utils/signInGoogle");
Object.defineProperty(exports, "signInGoogle", { enumerable: true, get: function () { return signInGoogle_1.signInGoogle; } });
var SignInScreen_1 = require("./screens/SignInScreen");
Object.defineProperty(exports, "SignInScreen", { enumerable: true, get: function () { return SignInScreen_1.SignInScreen; } });
var useFirebaseLogout_1 = require("./hooks/useFirebaseLogout");
Object.defineProperty(exports, "useFirebaseLogout", { enumerable: true, get: function () { return useFirebaseLogout_1.useFirebaseLogout; } });
__exportStar(require("./screens/UserContext"), exports);
