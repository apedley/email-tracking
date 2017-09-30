import mongoose from 'mongoose';
mongoose.Promise = global.Promise

const visitSchema = new mongoose.Schema(
  {
    ip: String,
    link: ({
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link'
    })
  },
  {
    timestamps: { createdAt: 'created_at' } 
  }
);

export default mongoose.model('Visit', visitSchema);