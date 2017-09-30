import mongoose from 'mongoose';
mongoose.Promise = global.Promise

const deviceSchema = mongoose.Schema({
  name: String
})

export default mongoose.model('Device', deviceSchema);