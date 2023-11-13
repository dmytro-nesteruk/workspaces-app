import * as crypto from "node:crypto";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import { SignUpDTO } from "./dto";

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async signUp(dto: SignUpDTO) {
		console.log(crypto);

		const hash = crypto.pbkdf2Sync(dto.password, "salt", 10, 50, "sha512").toString("hex");

		console.log(hash);

		const user = await this.prisma.user.create({ data: { email: dto.email, hash } });

		const response = {
			email: user.email,
			id: user.id,
		};

		return response;
	}

	signIn(dto: { email: string }) {
		return dto;
	}
}
