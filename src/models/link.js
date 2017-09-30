import mongoose from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise

const linkSchema = new mongoose.Schema({
  email: String,
  baseUrl: String,
  urlId: Number,
  // opened: { type: Boolean, default: false }
  visits: { type: Number, default: 0 }
});

linkSchema.plugin(AutoIncrement, {inc_field: 'urlId'});

linkSchema.methods.getUrl = function(route) {
  return this.baseUrl + route + this.urlId;
}


let Link = mongoose.model('Link', linkSchema);

export default Link;