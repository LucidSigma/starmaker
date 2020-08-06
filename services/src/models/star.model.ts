import mongoose from "mongoose";

const Schema = mongoose.Schema;

const starSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	diameter: {
		type: Number,
		required: false,
	},
	planets: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Planet",
			},
			name: {
				type: String,
				required: true,
			},
		}
	],
});

export default mongoose.model("Star", starSchema);