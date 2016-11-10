/*
 * diskDB
 * http://arvindr21.github.io/diskDB
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

/*jshint -W027*/
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import merge from 'merge';

const ENCODING = 'utf-8';

export const isValidPath = existsSync;

export const writeToFile = (outputFilename, content = []) => writeFileSync(outputFilename, JSON.stringify(content));

export const readFromFile = file => readFileSync(file, ENCODING);

export const removeFile = unlinkSync;

export const updateFiltered = (collection, query, data, multi) => {
  // break 2 loops at once - multi : false
  let i = collection.length - 1;
  loop: for (i; i >= 0; i--) {
    const c = collection[i];
    for (var p in query) {
      if (p in c && c[p] == query[p]) {
        collection[i] = merge(c, data);
        if (!multi) {
          break loop;
        }
      }
    }
  }
  return collection;
};

// [TODO] : Performance
export const removeFiltered = (collection, query, multi) => {
  // break 2 loops at once -  multi : false
  let i = collection.length - 1;
  loop: for (i; i >= 0; i--) {
    var c = collection[i];
    for (var p in query) {
      if (p in c && c[p] == query[p]) {
        collection.splice(i, 1);
        if (!multi) {
          break loop;
        }
      }
    }
  }
  return collection;
};

// [TODO] : Performance
export const finder = (collection, query, multi) => {
  const retCollection = [];
  let i = collection.length - 1;
  loop: for (i; i >= 0; i--) {
    var c = collection[i];
    for (var p in query) {
      if (p in c && c[p] == query[p]) {
        retCollection.push(collection[i]);
        if (!multi) {
          break loop;
        }
      }
    }
  }
  return retCollection;
};

/** recursive finder **/
export class ObjectSearcher {

  constructor() {
    this.results = [];
    this.objects = [];
    this.resultIDS = {};
  }

  findAllInObject(object, valueOBj, isMulti) {

    for (var objKey in object) {
      this.performSearch(object[objKey], valueOBj, object[objKey]);
      if (!isMulti && this.results.length == 1) {
        return this.results;
      }
    }

    while (this.objects.length !== 0) {
      var objRef = this.objects.pop();
      this.performSearch(objRef['_obj'], valueOBj, objRef['parent']);
      if (!isMulti && this.results.length == 1) {
        return this.results;
      }
    }

    return this.results;
  }

  performSearch(object, valueOBj, opt_parentObj) {

    for (var criteria in valueOBj) {
      var query = {};
      query[criteria] = valueOBj[criteria];
      this.searchObject(object, query, opt_parentObj);
    }

    for (var i = 0; i < this.results.length; i++) {
      var result = this.results[i];
      for (var field in valueOBj) {
        if (result[field] !== undefined) {
          if (result[field] !== valueOBj[field]) {
            this.results.splice(i, 1);
          }
        }
      }
    }
  }

  searchObject(object, valueOBj, opt_parentObj) {
    for (var objKey in object) {

      if (typeof object[objKey] != 'object') {

        if (valueOBj[objKey] == object[objKey]) {
          if (opt_parentObj !== undefined) {
            if (this.resultIDS[opt_parentObj['_id']] === undefined) {
              this.results.push(opt_parentObj);
              this.resultIDS[opt_parentObj['_id']] = '';
            }
          } else {
            if (this.resultIDS[object['_id']] === undefined) {
              this.results.push(object);
              this.resultIDS[object['_id']] = '';
            }
          }
        }

      } else {

        var obj = object;
        if (opt_parentObj !== undefined) {
            obj = opt_parentObj;
        }
        var objRef = {
            parent: obj,
            _obj: object[objKey]
        };

        this.objects.push(objRef);

      }
    }
  }

}
