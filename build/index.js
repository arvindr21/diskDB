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
const helper_1 = require("./helper");
const global_1 = require("./global");
const async_1 = require("async");
const path_1 = require("path");
class DiskDB {
    constructor(path = __dirname, collections = []) {
        if (collections.length === 0) {
            helper_1.ERR(global_1.MESSAGES.ERROR.COLL_MT);
            throw new Error(global_1.MESSAGES.ERROR.COLL_MT);
        }
        this.path = path;
        this.collections = collections;
    }
    loadCollections() {
        return new Promise((resolve, reject) => {
            async_1.each(this.collections, (collectionName, callback) => __awaiter(this, void 0, void 0, function* () {
                helper_1.LOG(global_1.MESSAGES.INFO.PRCG + collectionName);
                if (!collectionName.includes(global_1.EXT_JSON)) {
                    collectionName = `${collectionName}${global_1.EXT_JSON}`;
                }
                const collectionFile = path_1.join(this.path, collectionName);
                const fsExists = yield fileExists(collectionFile);
                callback();
            }), err => {
                if (err) {
                    helper_1.ERR(global_1.MESSAGES.ERROR.LOAD_FL + err.message);
                    reject(global_1.MESSAGES.ERROR.LOAD_FL);
                    throw new Error(global_1.MESSAGES.ERROR.LOAD_FL + err.message);
                }
                else {
                    helper_1.LOG(global_1.MESSAGES.INFO.COLL_LD_DONE);
                    resolve();
                }
            });
        });
    }
}
exports.DiskDB = DiskDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW9DO0FBQ3BDLHFDQUE4QztBQUU5QyxpQ0FBNkI7QUFDN0IsK0JBQTRCO0FBRTVCLE1BQWEsTUFBTTtJQUlqQixZQUFZLE9BQWUsU0FBUyxFQUFFLGNBQXdCLEVBQUU7UUFDOUQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixZQUFHLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFTSxlQUFlO1FBQ3BCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsWUFBSSxDQUNGLElBQUksQ0FBQyxXQUFXLEVBQ2hCLENBQU8sY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNqQyxZQUFHLENBQUMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxpQkFBUSxDQUFDLEVBQUU7b0JBQ3RDLGNBQWMsR0FBRyxHQUFHLGNBQWMsR0FBRyxpQkFBUSxFQUFFLENBQUM7aUJBQ2pEO2dCQUVELE1BQU0sY0FBYyxHQUFHLFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLFFBQVEsR0FBRyxNQUFNLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFHbEQsUUFBUSxFQUFFLENBQUM7WUFDYixDQUFDLENBQUEsRUFDRCxHQUFHLENBQUMsRUFBRTtnQkFDSixJQUFJLEdBQUcsRUFBRTtvQkFDUCxZQUFHLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDMUMsTUFBTSxDQUFDLGlCQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZEO3FCQUFNO29CQUNMLFlBQUcsQ0FBQyxpQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDaEMsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBM0NELHdCQTJDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVSUiwgTE9HIH0gZnJvbSAnLi9oZWxwZXInO1xuaW1wb3J0IHsgRVhUX0pTT04sIE1FU1NBR0VTIH0gZnJvbSAnLi9nbG9iYWwnO1xuXG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY2xhc3MgRGlza0RCIHtcbiAgcHJvdGVjdGVkIGNvbGxlY3Rpb25zOiBzdHJpbmdbXTtcbiAgcHJvdGVjdGVkIHBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcgPSBfX2Rpcm5hbWUsIGNvbGxlY3Rpb25zOiBzdHJpbmdbXSA9IFtdKSB7XG4gICAgaWYgKGNvbGxlY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgRVJSKE1FU1NBR0VTLkVSUk9SLkNPTExfTVQpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKE1FU1NBR0VTLkVSUk9SLkNPTExfTVQpO1xuICAgIH1cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMuY29sbGVjdGlvbnMgPSBjb2xsZWN0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBsb2FkQ29sbGVjdGlvbnMoKTogUHJvbWlzZTxhbnkgfCBzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZWFjaChcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9ucyxcbiAgICAgICAgYXN5bmMgKGNvbGxlY3Rpb25OYW1lLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIExPRyhNRVNTQUdFUy5JTkZPLlBSQ0cgKyBjb2xsZWN0aW9uTmFtZSk7XG5cbiAgICAgICAgICBpZiAoIWNvbGxlY3Rpb25OYW1lLmluY2x1ZGVzKEVYVF9KU09OKSkge1xuICAgICAgICAgICAgY29sbGVjdGlvbk5hbWUgPSBgJHtjb2xsZWN0aW9uTmFtZX0ke0VYVF9KU09OfWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY29sbGVjdGlvbkZpbGUgPSBqb2luKHRoaXMucGF0aCwgY29sbGVjdGlvbk5hbWUpO1xuICAgICAgICAgIGNvbnN0IGZzRXhpc3RzID0gYXdhaXQgZmlsZUV4aXN0cyhjb2xsZWN0aW9uRmlsZSk7XG5cblxuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgRVJSKE1FU1NBR0VTLkVSUk9SLkxPQURfRkwgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICByZWplY3QoTUVTU0FHRVMuRVJST1IuTE9BRF9GTCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoTUVTU0FHRVMuRVJST1IuTE9BRF9GTCArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTE9HKE1FU1NBR0VTLklORk8uQ09MTF9MRF9ET05FKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSlcbiAgfVxufVxuIl19