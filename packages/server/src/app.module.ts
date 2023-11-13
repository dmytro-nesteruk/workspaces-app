import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth";
import { ConfigService } from "./config/config.service";
import { PrismaService } from "./prisma/prisma.service";

@Module({
	imports: [AuthModule],
	controllers: [AppController],
	providers: [AppService, PrismaService, ConfigService],
})
export class AppModule {}
