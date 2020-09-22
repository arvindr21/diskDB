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
exports.DiskDB = void 0;
const global_1 = require("./global");
const helper_1 = require("./helper");
const async_1 = require("async");
const path_1 = require("path");
const nanoid_1 = require("nanoid");
class DiskDB {
    constructor(options) {
        this.store = new Map();
        options.path = options.path || __dirname;
        if (options.collections.length === 0) {
            helper_1.ERR.log(global_1.MESSAGES.ERROR.COLL_MT);
            throw new Error(global_1.MESSAGES.ERROR.COLL_MT);
        }
        this.options = options;
    }
    addDocumentToCollection(collectionName, doc) {
        const coll = this.findOneCollection(collectionName);
        if (!coll) {
            helper_1.ERR.log(global_1.MESSAGES.ERROR.COLL_NF + collectionName);
            return false;
        }
        const _doc = {
            data: doc,
            meta: {
                _id: nanoid_1.nanoid(),
                timestamp: +new Date
            }
        };
        coll.documents = coll.documents || [];
        coll.documents.push(_doc);
        return true;
    }
    findCollections() {
        return this.store;
    }
    findOneCollection(collectionName) {
        return this.store.get(collectionName);
    }
    loadCollections() {
        return new Promise((resolve, reject) => {
            async_1.each(this.options.collections, (collectionName, callback) => __awaiter(this, void 0, void 0, function* () {
                helper_1.LOG.log(global_1.MESSAGES.INFO.PRCG + collectionName);
                if (!collectionName.includes(global_1.EXT_JSON)) {
                    collectionName = `${collectionName}${global_1.EXT_JSON}`;
                }
                const collectionFile = path_1.join(this.options.path, collectionName);
                const fsExists = yield helper_1.fileExists(collectionFile);
                let fileContents = global_1.EMPTY_ARRAY;
                if (!fsExists) {
                    yield helper_1.writeToCollection(collectionFile, JSON.parse(fileContents));
                }
                else {
                    fileContents = yield helper_1.readFromCollection(collectionFile);
                }
                const coll = {
                    documents: fileContents,
                    name: collectionName.replace(global_1.EXT_JSON, ''),
                    path: collectionFile,
                };
                this.store.set(coll.name, coll);
                callback();
            }), err => {
                if (err) {
                    helper_1.ERR.log(global_1.MESSAGES.ERROR.LOAD_FL + err.message);
                    reject(global_1.MESSAGES.ERROR.LOAD_FL);
                    throw new Error(global_1.MESSAGES.ERROR.LOAD_FL + err.message);
                }
                else {
                    helper_1.LOG.log(global_1.MESSAGES.INFO.COLL_LD_DONE);
                    resolve(this.store);
                }
            });
        });
    }
    removeCollection(collectionName) {
        return this.store.delete(collectionName);
    }
}
exports.DiskDB = DiskDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTJEO0FBQzNELHFDQU1rQjtBQUdsQixpQ0FBNkI7QUFDN0IsK0JBQTRCO0FBQzVCLG1DQUErQjtBQUsvQixNQUFhLE1BQU07SUFJakIsWUFBWSxPQUFtQjtRQUZ4QixVQUFLLEdBQWlCLElBQUksR0FBRyxFQUFrQixDQUFDO1FBR3JELE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7UUFFekMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDcEMsWUFBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVNLHVCQUF1QixDQUFDLGNBQXNCLEVBQUUsR0FBUTtRQUM3RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULFlBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLElBQUksR0FBRztZQUNYLElBQUksRUFBRSxHQUFHO1lBQ1QsSUFBSSxFQUFFO2dCQUNKLEdBQUcsRUFBRSxlQUFNLEVBQUU7Z0JBQ2IsU0FBUyxFQUFFLENBQUMsSUFBSSxJQUFJO2FBQ3JCO1NBQ0YsQ0FBQTtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sZUFBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLGlCQUFpQixDQUFDLGNBQXNCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGVBQWU7UUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxZQUFJLENBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQ3hCLENBQU8sY0FBc0IsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDekMsWUFBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUM7Z0JBRTdDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLGlCQUFRLENBQUMsRUFBRTtvQkFDdEMsY0FBYyxHQUFHLEdBQUcsY0FBYyxHQUFHLGlCQUFRLEVBQUUsQ0FBQztpQkFDakQ7Z0JBRUQsTUFBTSxjQUFjLEdBQUcsV0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLFFBQVEsR0FBWSxNQUFNLG1CQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzNELElBQUksWUFBWSxHQUFrQixvQkFBVyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLE1BQU0sMEJBQWlCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDbkU7cUJBQU07b0JBQ0wsWUFBWSxHQUFHLE1BQU0sMkJBQWtCLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ3pEO2dCQUVELE1BQU0sSUFBSSxHQUFnQjtvQkFDeEIsU0FBUyxFQUFFLFlBQVk7b0JBQ3ZCLElBQUksRUFBRSxjQUFjLENBQUMsT0FBTyxDQUFDLGlCQUFRLEVBQUUsRUFBRSxDQUFDO29CQUMxQyxJQUFJLEVBQUUsY0FBYztpQkFDckIsQ0FBQztnQkFFRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUVoQyxRQUFRLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQSxFQUNELEdBQUcsQ0FBQyxFQUFFO2dCQUNKLElBQUksR0FBRyxFQUFFO29CQUNQLFlBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDLGlCQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZEO3FCQUFNO29CQUNMLFlBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JCO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxjQUFzQjtRQUM1QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FFRjtBQTNGRCx3QkEyRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTVBUWV9BUlJBWSwgRVhUX0pTT04sIE1FU1NBR0VTIH0gZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHtcbiAgRVJSLFxuICBMT0csXG4gIGZpbGVFeGlzdHMsXG4gIHJlYWRGcm9tQ29sbGVjdGlvbixcbiAgd3JpdGVUb0NvbGxlY3Rpb24sXG59IGZyb20gJy4vaGVscGVyJztcbmltcG9ydCB7IElDb2xsZWN0aW9uLCBJREJPcHRpb25zLCBUQ29sbGVjdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgbmFub2lkIH0gZnJvbSAnbmFub2lkJ1xuXG4vLyBDb2xsZWN0aW9uID09IEZpbGUuanNvblxuLy8gRG9jdW1lbnQgPT0gRmlsZS5PYmpbMF0uanNvblxuXG5leHBvcnQgY2xhc3MgRGlza0RCIHtcbiAgcHVibGljIG9wdGlvbnM6IElEQk9wdGlvbnM7XG4gIHB1YmxpYyBzdG9yZTogVENvbGxlY3Rpb25zID0gbmV3IE1hcCgpIGFzIFRDb2xsZWN0aW9ucztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJREJPcHRpb25zKSB7XG4gICAgb3B0aW9ucy5wYXRoID0gb3B0aW9ucy5wYXRoIHx8IF9fZGlybmFtZTtcblxuICAgIGlmIChvcHRpb25zLmNvbGxlY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgRVJSLmxvZyhNRVNTQUdFUy5FUlJPUi5DT0xMX01UKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihNRVNTQUdFUy5FUlJPUi5DT0xMX01UKTtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBhZGREb2N1bWVudFRvQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBkb2M6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNvbGwgPSB0aGlzLmZpbmRPbmVDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lKTtcblxuICAgIGlmICghY29sbCkge1xuICAgICAgRVJSLmxvZyhNRVNTQUdFUy5FUlJPUi5DT0xMX05GICsgY29sbGVjdGlvbk5hbWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF9kb2MgPSB7XG4gICAgICBkYXRhOiBkb2MsXG4gICAgICBtZXRhOiB7XG4gICAgICAgIF9pZDogbmFub2lkKCksXG4gICAgICAgIHRpbWVzdGFtcDogK25ldyBEYXRlXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29sbC5kb2N1bWVudHMgPSBjb2xsLmRvY3VtZW50cyB8fCBbXTtcbiAgICBjb2xsLmRvY3VtZW50cy5wdXNoKF9kb2MpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGZpbmRDb2xsZWN0aW9ucygpOiBUQ29sbGVjdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnN0b3JlO1xuICB9XG5cbiAgcHVibGljIGZpbmRPbmVDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBJQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0KGNvbGxlY3Rpb25OYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkQ29sbGVjdGlvbnMoKTogUHJvbWlzZTxUQ29sbGVjdGlvbnMgfCBzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZWFjaChcbiAgICAgICAgdGhpcy5vcHRpb25zLmNvbGxlY3Rpb25zLFxuICAgICAgICBhc3luYyAoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICBMT0cubG9nKE1FU1NBR0VTLklORk8uUFJDRyArIGNvbGxlY3Rpb25OYW1lKTtcblxuICAgICAgICAgIGlmICghY29sbGVjdGlvbk5hbWUuaW5jbHVkZXMoRVhUX0pTT04pKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uTmFtZSA9IGAke2NvbGxlY3Rpb25OYW1lfSR7RVhUX0pTT059YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uRmlsZSA9IGpvaW4odGhpcy5vcHRpb25zLnBhdGgsIGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgICAgICBjb25zdCBmc0V4aXN0czogYm9vbGVhbiA9IGF3YWl0IGZpbGVFeGlzdHMoY29sbGVjdGlvbkZpbGUpO1xuICAgICAgICAgIGxldCBmaWxlQ29udGVudHM6IHN0cmluZyB8IG51bGwgPSBFTVBUWV9BUlJBWTtcbiAgICAgICAgICBpZiAoIWZzRXhpc3RzKSB7XG4gICAgICAgICAgICBhd2FpdCB3cml0ZVRvQ29sbGVjdGlvbihjb2xsZWN0aW9uRmlsZSwgSlNPTi5wYXJzZShmaWxlQ29udGVudHMpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlsZUNvbnRlbnRzID0gYXdhaXQgcmVhZEZyb21Db2xsZWN0aW9uKGNvbGxlY3Rpb25GaWxlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb2xsOiBJQ29sbGVjdGlvbiA9IHtcbiAgICAgICAgICAgIGRvY3VtZW50czogZmlsZUNvbnRlbnRzLFxuICAgICAgICAgICAgbmFtZTogY29sbGVjdGlvbk5hbWUucmVwbGFjZShFWFRfSlNPTiwgJycpLFxuICAgICAgICAgICAgcGF0aDogY29sbGVjdGlvbkZpbGUsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHRoaXMuc3RvcmUuc2V0KGNvbGwubmFtZSwgY29sbCk7XG5cbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIEVSUi5sb2coTUVTU0FHRVMuRVJST1IuTE9BRF9GTCArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJlamVjdChNRVNTQUdFUy5FUlJPUi5MT0FEX0ZMKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihNRVNTQUdFUy5FUlJPUi5MT0FEX0ZMICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMT0cubG9nKE1FU1NBR0VTLklORk8uQ09MTF9MRF9ET05FKTtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5zdG9yZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmRlbGV0ZShjb2xsZWN0aW9uTmFtZSk7XG4gIH1cblxufVxuIl19