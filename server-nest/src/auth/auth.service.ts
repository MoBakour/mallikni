import {
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	generateToken(payload: any): Promise<string> {
		return this.jwtService.signAsync(payload);
	}

	verifyToken(token: string): Promise<any> {
		return this.jwtService.verifyAsync(token);
	}

	async login(credential: string, password: string): Promise<User> {
		const user = await this.userModel
			.findOne({
				$or: [{ email: credential }, { username: credential }],
			})
			.select("+password");

		if (!user) {
			throw new NotFoundException("Incorrect username or email");
		}

		const correctPassword = await bcrypt.compare(password, user.password);

		if (!correctPassword) {
			throw new UnauthorizedException("Incorrect password");
		}

		return user;
	}
}
