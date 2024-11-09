import { Body, Controller, Patch, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from "express";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("activate")
	async activateUser(
		@Req() req: Request,
		@Body("activationCode") activationCode: string,
	) {
		return this.userService.activateUser(req.user, activationCode);
	}

	@Patch("update-email")
	async updateEmail(@Req() req: Request, @Body("newEmail") newEmail: string) {
		return this.userService.updateEmail(req.user._id, newEmail);
	}

	@Patch("update-password")
	async updatePassword(
		@Req() req: Request,
		@Body("newPassword") newPassword: string,
	) {
		return this.userService.updatePassword(req.user._id, newPassword);
	}
}
