const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
  name: { type: String, required: true },
  path: {type: String},
  brief: {type: Object},
  descrTotal: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  descr: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  benefitsTitle: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  benefits: { type: Array },
  servicesServices: { type: Array },
  work: { type: Array },
  tariffs: { type: Array },
  position: {type: Number},
  blockTitle: {type:String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  seoTitle: {type:String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  seoDescription: {type:String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  seoKeywords: {type:String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  subProjects: {type: Array},
  types: [{ type: Schema.Types.ObjectId, ref: 'Types' }],
  isInvisible: {type: Boolean, default: true ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? true : v },
});

servicesSchema.set('toJSON', { virtuals: true });
servicesSchema.set('toObject', { virtuals: true });
servicesSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Services', servicesSchema);