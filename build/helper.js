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
exports.readFromCollection = exports.writeToCollection = exports.fileExists = exports.ERR = exports.LOG = void 0;
const debug = require("debug");
const global_1 = require("./global");
const fs_1 = require("fs");
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
            return contents;
        }
        catch (error) {
            exports.ERR.log(global_1.MESSAGES.ERROR.GEN + error);
            return null;
        }
    });
}
exports.readFromCollection = readFromCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFFL0IscUNBQW9DO0FBQ3BDLDJCQUE4QjtBQUVqQixRQUFBLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsUUFBQSxHQUFHLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBR3pDLFNBQXNCLFVBQVUsQ0FBQyxJQUFZOztRQUMzQyxJQUFJO1lBQ0YsTUFBTSxhQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLFdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0NBQUE7QUFSRCxnQ0FRQztBQUVELFNBQXNCLGlCQUFpQixDQUNyQyxJQUFZLEVBQ1osUUFBZ0I7O1FBRWhCLElBQUk7WUFDRixNQUFNLGFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLFdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0NBQUE7QUFYRCw4Q0FXQztBQUVELFNBQXNCLGtCQUFrQixDQUFDLElBQVk7O1FBQ25ELElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxXQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNwQyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztDQUFBO0FBUkQsZ0RBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5cbmltcG9ydCB7IE1FU1NBR0VTIH0gZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgcHJvbWlzZXMgfSBmcm9tICdmcyc7XG5cbmV4cG9ydCBjb25zdCBMT0cgPSBkZWJ1ZygnZGlza2RiJyk7XG5leHBvcnQgY29uc3QgRVJSID0gZGVidWcoJ2Rpc2tkYjplcnJvcicpO1xuXG4vLyBGaWxlIEhlbHBlcnNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxlRXhpc3RzKGZpbGU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICB0cnkge1xuICAgIGF3YWl0IHByb21pc2VzLmFjY2VzcyhmaWxlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBFUlIubG9nKE1FU1NBR0VTLkVSUk9SLkdFTiArIGVycm9yKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdyaXRlVG9Db2xsZWN0aW9uKFxuICBmaWxlOiBzdHJpbmcsXG4gIGNvbnRlbnRzOiBzdHJpbmdcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICB0cnkge1xuICAgIGF3YWl0IHByb21pc2VzLndyaXRlRmlsZShmaWxlLCBjb250ZW50cyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgRVJSLmxvZyhNRVNTQUdFUy5FUlJPUi5HRU4gKyBlcnJvcik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkRnJvbUNvbGxlY3Rpb24oZmlsZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29udGVudHMgPSBhd2FpdCBwcm9taXNlcy5yZWFkRmlsZShmaWxlLCAndXRmOCcpO1xuICAgIHJldHVybiBjb250ZW50cztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBFUlIubG9nKE1FU1NBR0VTLkVSUk9SLkdFTiArIGVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19