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
const app_1 = __importDefault(require("./app"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app_1.default === null || app_1.default === void 0 ? void 0 : app_1.default.listen(process.env.PORT || 8000, () => {
            console.log(`Listening: http://localhost:${process.env.PORT || 8000}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
//establish connection
start();
//# sourceMappingURL=server.js.map