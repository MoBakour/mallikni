import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Document } from "mongoose";
import { Activation } from "./activation.entity";

@Schema({ timestamps: true })
export class User extends Document {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true, select: false })
	password: string;

	@Prop()
	activation: Activation;
}

export const UserEntitySchema = SchemaFactory.createForClass(User);

// hash password before saving
UserEntitySchema.pre<User>("save", async function (next) {
	if (!this.isModified("password")) return next();

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
