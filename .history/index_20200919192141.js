const fs = require('fs');
const prettyBytes = require('pretty-bytes');
const BSON = require('bson');
const Long = BSON.Long;
const db = __dirname + '/db';

// Serialize a document
const doc = { long: 100 };
const data = BSON.serialize(doc);
console.log('data:', data);

fs.writeFileSync(db, data);
console.log(prettyBytes(fs.statSync(db).size));

// Deserialize the resulting Buffer
const doc_2 = BSON.deserialize(fs.readFileSync(db));
console.log('doc_2:', doc_2);