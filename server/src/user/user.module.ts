import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserEntitySchema } from "./entities/user.entity";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserEntitySchema },
		]),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService, MongooseModule],
})
export class UserModule {}
