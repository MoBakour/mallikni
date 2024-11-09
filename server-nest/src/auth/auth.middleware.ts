import {
	Injectable,
	InternalServerErrorException,
	NestMiddleware,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		try {
			// check auth header
			const authHeader = req.headers.authorization;
			if (!authHeader) return next();

			// check bearer & token
			const [bearer, token] = authHeader.split(" ");
			if (!bearer || !token || bearer !== "Bearer") return next();

			// verify auth token
			const { id } = await this.authService.verifyToken(token);

			// attach user to req
			const user = await this.userService.findById(id);

			req.user = user;
			next();
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}
}
