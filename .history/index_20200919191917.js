const fs = require('fs');
const prettyBytes = require('pretty-bytes');
const BSON = require('bson');
const Long = BSON.Long;
const db = __dirname + '/f';

// Serialize a document
const doc = { long: Long.fromNumber(100) };
const data = BSON.serialize(doc);
console.log('data:', data);

fs.writeFileSync(, data);
fs.statSync()

// Deserialize the resulting Buffer
const doc_2 = BSON.deserialize(data);
console.log('doc_2:', doc_2);