import mongoose from "mongoose";
import { Colour } from "./star_colours";

export default interface Star extends mongoose.Document {
	name: String,
	diameter?: number,
	colour?: Colour,
	luminosity?: number,
	planets?: string[],
}