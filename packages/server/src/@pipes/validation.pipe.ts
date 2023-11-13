import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
	Type,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToInstance(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			const { constraints } = errors[0];

			let message = "";

			if (constraints) {
				message = Object.values(constraints).at(-1) || "Validation failed";
			}

			throw new BadRequestException(message);
		}
		return value;
	}

	private toValidate(metatype: Type<any>): boolean {
		const types: Type<any>[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
