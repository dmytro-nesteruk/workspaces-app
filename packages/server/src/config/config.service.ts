import { Injectable } from "@nestjs/common";
import { config } from "dotenv";

config();

@Injectable()
export class ConfigService {
	readonly PASSWORD_HASHING_SALT = process.env.PASSWORD_HASHING_SALT as string;
}
