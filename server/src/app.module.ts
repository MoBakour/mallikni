import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { AuthMiddleware } from "./auth/auth.middleware";
import { PropertyModule } from './property/property.module';

@Module({
	imports: [
		MongooseModule.forRoot(process.env.DB_URI, { dbName: "mallikni-db" }),
		AuthModule,
		UserModule,
		PropertyModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes("*");
	}
}
