import { PickType } from "@nestjs/mapped-types";
import { SignUpDto } from "../../auth/dtos/sign-up.dto";

export class UpdatePasswordDto extends PickType(SignUpDto, [
	"password",
] as const) {}
