import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class SignUpDto {
	@IsEmail(
		{},
		{
			message: "Invalid email address",
		},
	)
	@IsNotEmpty({
		message: "Email is required",
	})
	@IsString({
		message: "Email field should be a string",
	})
	@MaxLength(320, {
		message: "Email address cannot exceed 320 characters",
	})
	email: string;

	@IsString({
		message: "Username field should be a string",
	})
	@IsNotEmpty({
		message: "Username is required",
	})
	@MinLength(4, {
		message: "Username must be at least 4 characters long",
	})
	@MaxLength(20, {
		message: "Username cannot exceed 20 characters",
	})
	username: string;

	@IsString({
		message: "Password field must be a string",
	})
	@IsNotEmpty({
		message: "Password is required",
	})
	@MinLength(6, {
		message: "Password must be at least 6 characters long",
	})
	@MaxLength(100, {
		message: "Password cannot exceed 100 characters",
	})
	password: string;
}
