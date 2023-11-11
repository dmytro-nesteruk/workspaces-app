import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
	signUp(dto: { email: string }) {
		return dto;
	}

	signIn() {
		return { message: "Sign In" };
	}
}
