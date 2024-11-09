import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import mongoose, { Model } from "mongoose";
import { SignUpDto } from "src/auth/dtos/sign-up.dto";
import {
	generateActivationCode,
	validateUsernameCharacters,
} from "src/utils/utils";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	async create(signupDto: SignUpDto) {
		// validate username characters
		if (!validateUsernameCharacters(signupDto.username)) {
			throw new BadRequestException(
				"Username can only include alphanumeric characters and underscores",
			);
		}

		const activation = {
			code: generateActivationCode(),
		};

		try {
			return await this.userModel.create({ ...signupDto, ...activation });
		} catch (err) {
			if (err.code === 11000) {
				const objectKeys = Object.keys(err.keyValue);

				if (objectKeys.includes("username")) {
					throw new BadRequestException("Username is already used");
				} else if (objectKeys.includes("email")) {
					throw new BadRequestException("Email is already used");
				} else {
					console.error(err);
				}
			}

			throw new InternalServerErrorException(
				"Internal server error occured",
			);
		}
	}

	async findById(id: string) {
		return await this.userModel.findById(id);
	}

	async activateUser(user: User, activationCode: string) {
		if (user.activation.attempts <= 0) {
			throw new ForbiddenException(
				"You reached the limit of account activation attempts. Your account is blocked for 24 hours.",
			);
		}

		if (user.activation.code !== activationCode) {
			throw new BadRequestException("Incorrect activation code");
		}

		return await this.userModel.findByIdAndUpdate(user._id, {
			"activation.activated": true,
			$inc: {
				"activation.attempts": -1,
			},
		});
	}

	async updateUsername(id: string, newUsername: string) {
		return await this.userModel.findByIdAndUpdate(id, {
			username: newUsername,
		});
	}

	async updateEmail(id: string, newEmail: string) {
		return await this.userModel.findByIdAndUpdate(id, {
			email: newEmail,
		});
	}

	async updatePassword(id: string, newPassword: string) {
		return await this.userModel.findByIdAndUpdate(id, {
			password: newPassword,
		});
	}
}
