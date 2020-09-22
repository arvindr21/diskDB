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
exports.getMeta = exports.readFromCollection = exports.writeToCollection = exports.fileExists = exports.ERR = exports.LOG = void 0;
const debug = require("debug");
const fs_1 = require("fs");
const global_1 = require("./global");
exports.LOG = debug('diskdb');
exports.ERR = debug('diskdb:error');
function fileExists(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.access(file);
            return true;
        }
        catch (error) {
            exports.ERR.log(global_1.MESSAGES.ERROR.GEN + error);
            return false;
        }
    });
}
exports.fileExists = fileExists;
function writeToCollection(file, contents) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.writeFile(file, contents);
            return true;
        }
        catch (error) {
            exports.ERR.log(global_1.MESSAGES.ERROR.GEN + error);
            return false;
        }
    });
}
exports.writeToCollection = writeToCollection;
function readFromCollection(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contents = yield fs_1.promises.readFile(file, 'utf8');
            return JSON.parse(contents);
        }
        catch (error) {
            exports.ERR.log(global_1.MESSAGES.ERROR.GEN + error);
            return null;
        }
    });
}
exports.readFromCollection = readFromCollection;
function getMeta() {
    return {
        timestamp: +new Date(),
        version: 0,
    };
}
exports.getMeta = getMeta;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFJL0IsMkJBQThCO0FBQzlCLHFDQUFvQztBQUV2QixRQUFBLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsUUFBQSxHQUFHLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBR3pDLFNBQXNCLFVBQVUsQ0FBQyxJQUFZOztRQUMzQyxJQUFJO1lBQ0YsTUFBTSxhQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLFdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0NBQUE7QUFSRCxnQ0FRQztBQUVELFNBQXNCLGlCQUFpQixDQUNyQyxJQUFZLEVBQ1osUUFBZ0I7O1FBRWhCLElBQUk7WUFDRixNQUFNLGFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLFdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0NBQUE7QUFYRCw4Q0FXQztBQUVELFNBQXNCLGtCQUFrQixDQUN0QyxJQUFZOztRQUVaLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDcEMsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7Q0FBQTtBQVZELGdEQVVDO0FBRUQsU0FBZ0IsT0FBTztJQUNyQixPQUFPO1FBQ0wsU0FBUyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUU7UUFDdEIsT0FBTyxFQUFFLENBQUM7S0FDWCxDQUFDO0FBQ0osQ0FBQztBQUxELDBCQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZGVidWcgZnJvbSAnZGVidWcnO1xuXG5pbXBvcnQgeyBJQ29sbGVjdGlvbiwgSURvY3VtZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgcHJvbWlzZXMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBNRVNTQUdFUyB9IGZyb20gJy4vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IExPRyA9IGRlYnVnKCdkaXNrZGInKTtcbmV4cG9ydCBjb25zdCBFUlIgPSBkZWJ1ZygnZGlza2RiOmVycm9yJyk7XG5cbi8vIEZpbGUgSGVscGVyc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGVFeGlzdHMoZmlsZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgcHJvbWlzZXMuYWNjZXNzKGZpbGUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIEVSUi5sb2coTUVTU0FHRVMuRVJST1IuR0VOICsgZXJyb3IpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JpdGVUb0NvbGxlY3Rpb24oXG4gIGZpbGU6IHN0cmluZyxcbiAgY29udGVudHM6IHN0cmluZ1xuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgcHJvbWlzZXMud3JpdGVGaWxlKGZpbGUsIGNvbnRlbnRzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBFUlIubG9nKE1FU1NBR0VTLkVSUk9SLkdFTiArIGVycm9yKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWRGcm9tQ29sbGVjdGlvbihcbiAgZmlsZTogc3RyaW5nXG4pOiBQcm9taXNlPElDb2xsZWN0aW9uWydkb2N1bWVudHMnXSB8IG51bGw+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb250ZW50cyA9IGF3YWl0IHByb21pc2VzLnJlYWRGaWxlKGZpbGUsICd1dGY4Jyk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIEVSUi5sb2coTUVTU0FHRVMuRVJST1IuR0VOICsgZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXRhKCk6IElEb2N1bWVudFsnbWV0YSddIHtcbiAgcmV0dXJuIHtcbiAgICB0aW1lc3RhbXA6ICtuZXcgRGF0ZSgpLFxuICAgIHZlcnNpb246IDAsXG4gIH07XG59XG4iXX0=