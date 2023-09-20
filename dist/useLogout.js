"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogout = void 0;
const react_1 = require("react");
const UserContext_1 = require("./UserContext");
const useLogout = () => {
    const { logOut } = (0, react_1.useContext)(UserContext_1.UserContext);
    const performLogout = () => {
        logOut();
    };
    return { performLogout };
};
exports.useLogout = useLogout;
