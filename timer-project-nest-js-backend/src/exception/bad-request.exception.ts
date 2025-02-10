import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequestException extends HttpException {
  constructor(message: string = "Bad Request") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}