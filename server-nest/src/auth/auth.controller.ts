import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { SignUpDto } from "./dtos/sign-up.dto";
import { UserService } from "src/user/user.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@Post("login")
	async login(@Body() loginDto: LoginDto) {
		// verify user by credential and password
		const user = await this.authService.login(
			loginDto.credential,
			loginDto.password,
		);

		// create token
		const token = await this.authService.generateToken({
			id: user._id.toString(),
		});

		return token;
	}

	@Post("signup")
	async signup(@Body(ValidationPipe) signupDto: SignUpDto) {
		// create user
		const user = await this.userService.create(signupDto);

		// create token
		const token = await this.authService.generateToken({
			id: user._id.toString(),
		});

		return token;
	}
}
