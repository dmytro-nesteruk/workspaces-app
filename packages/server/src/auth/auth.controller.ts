import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-up")
	signUp(@Body() dto: { email: string }) {
		return this.authService.signUp(dto);
	}
}
