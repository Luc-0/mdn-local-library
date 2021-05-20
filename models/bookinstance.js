var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { DateTime } = require('luxon');

const statusList = ['Available', 'Maintenance', 'Loaned', 'Reserved'];

var BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: statusList,
    default: 'Maintenance',
  },
  due_back: { type: Date, default: Date.now },
});

BookInstanceSchema.virtual('url').get(function () {
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema.virtual('due_back_formatted').get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

BookInstanceSchema.virtual('due_back_input').get(function () {
  return DateTime.fromJSDate(this.due_back).toISODate();
});

BookInstanceSchema.virtual('status_list').get(function () {
  return statusList;
});

// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
