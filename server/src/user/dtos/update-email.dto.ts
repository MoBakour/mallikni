import { PickType } from "@nestjs/mapped-types";
import { SignUpDto } from "../../auth/dtos/sign-up.dto";

export class UpdateEmailDto extends PickType(SignUpDto, ["email"] as const) {}
