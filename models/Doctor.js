import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  position: {type: String, required: true},
  image: String,
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
