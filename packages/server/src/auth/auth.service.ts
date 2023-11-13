import * as crypto from "node:crypto";

import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { ConfigService } from "../config/config.service";
import { PrismaService } from "../prisma/prisma.service";

import { SignInDto, SignUpDto } from "./dto";

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly config: ConfigService
	) {}

	async signUp({ email, password }: SignUpDto) {
		let hash = "";

		try {
			hash = await this.hash(password);
		} catch (error) {
			this.logger.error(`[HASHING USER PASSWORD IN 'signUp']:  ${error}`);
			throw new BadRequestException(error);
		}

		const user = await this.prisma.user.create({ data: { email, hash } });

		const response = {
			email: user.email,
			id: user.id,
		};

		return response;
	}

	async signIn({ email, password }: SignInDto) {
		let receivedHash: string;

		try {
			receivedHash = await this.hash(password);
		} catch (error) {
			this.logger.error(`[HASHING USER PASSWORD IN 'signIn']::  ${error}`);

			throw new BadRequestException(error);
		}

		let user: User | null;

		try {
			user = await this.prisma.user.findUniqueOrThrow({
				where: {
					email,
				},
			});
		} catch (error) {
			this.logger.error(`[FIND UNIQUE USER BY EMAIL IN 'signIn']:  ${error}`);

			if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
				throw new BadRequestException("Wrong email or password");
			}

			throw new BadRequestException(error);
		}

		if (receivedHash === user.hash) {
			return {
				id: user.id,
				email: user.email,
			};
		}

		throw new BadRequestException("Wrong email or password");
	}

	hash(str: string) {
		return new Promise<string>((resolve, reject) => {
			crypto.pbkdf2(str, this.config.PASSWORD_HASHING_SALT, 10, 64, "sha512", (error, result) => {
				if (error) {
					reject(error.message);
				}

				resolve(result.toString("hex"));
			});
		});
	}
}
