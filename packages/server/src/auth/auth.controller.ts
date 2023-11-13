import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SignUpDTO } from "./dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-up")
	signUp(@Body() dto: SignUpDTO) {
		return this.authService.signUp(dto);
	}

	@Post("sign-in")
	signIn(@Body() dto: { email: string }) {
		return this.authService.signIn(dto);
	}
}
