import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      trim: true,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active',
      required: true
    },
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true
    }
  },
  { timestamps: true }
)

itemSchema.index({ list: 1, name: 1 }, { unique: 1 })
export const Item = mongoose.model('item', itemSchema)
