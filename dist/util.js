/*
 * diskDB
 * http://arvindr21.github.io/diskDB
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';

/*jshint -W027*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectSearcher = exports.finder = exports.removeFiltered = exports.updateFiltered = exports.removeFile = exports.readFromFile = exports.writeToFile = exports.isValidPath = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ENCODING = 'utf-8';

var isValidPath = exports.isValidPath = _fs.existsSync;

var writeToFile = exports.writeToFile = function writeToFile(outputFilename) {
  var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _fs.writeFileSync)(outputFilename, JSON.stringify(content));
};

var readFromFile = exports.readFromFile = function readFromFile(file) {
  return (0, _fs.readFileSync)(file, ENCODING);
};

var removeFile = exports.removeFile = _fs.unlinkSync;

var updateFiltered = exports.updateFiltered = function updateFiltered(collection, query, data, multi) {
  // break 2 loops at once - multi : false
  var i = collection.length - 1;
  loop: for (i; i >= 0; i--) {
    var c = collection[i];
    for (var p in query) {
      if (p in c && c[p] == query[p]) {
        collection[i] = (0, _merge2.default)(c, data);
        if (!multi) {
          break loop;
        }
      }
    }
  }
  return collection;
};

// [TODO] : Performance
var removeFiltered = exports.removeFiltered = function removeFiltered(collection, query, multi) {
  // break 2 loops at once -  multi : false
  var i = collection.length - 1;
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
var finder = exports.finder = function finder(collection, query, multi) {
  var retCollection = [];
  var i = collection.length - 1;
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

var ObjectSearcher = exports.ObjectSearcher = function () {
  function ObjectSearcher() {
    _classCallCheck(this, ObjectSearcher);

    this.results = [];
    this.objects = [];
    this.resultIDS = {};
  }

  _createClass(ObjectSearcher, [{
    key: 'findAllInObject',
    value: function findAllInObject(object, valueOBj, isMulti) {

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
  }, {
    key: 'performSearch',
    value: function performSearch(object, valueOBj, opt_parentObj) {

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
  }, {
    key: 'searchObject',
    value: function searchObject(object, valueOBj, opt_parentObj) {
      for (var objKey in object) {

        if (_typeof(object[objKey]) != 'object') {

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
  }]);

  return ObjectSearcher;
}();