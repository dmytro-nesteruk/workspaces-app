import { Module } from "@nestjs/common";

import { ConfigService } from "../config/config.service";
import { PrismaService } from "../prisma/prisma.service";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	controllers: [AuthController],
	providers: [AuthService, PrismaService, ConfigService],
})
export class AuthModule {}
