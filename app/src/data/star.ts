import mongoose from "mongoose";

export default interface Star extends mongoose.Document {
	name: String,
	diameter?: number,
	colour?: string,
	luminosity?: number,
	planets?: string[],
}