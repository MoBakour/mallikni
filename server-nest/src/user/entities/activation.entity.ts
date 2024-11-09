import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: false, _id: false })
export class Activation extends Document {
	@Prop({ default: false })
	activated: boolean;

	@Prop()
	code: string;

	@Prop({ default: 5 })
	attempts: number;
}

export const ActivationEntitySchema = SchemaFactory.createForClass(Activation);
