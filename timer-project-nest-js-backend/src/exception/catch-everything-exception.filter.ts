import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    let originalResponse: any = {};

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'object' && response !== null) {
        originalResponse = response;
      } else {
        originalResponse = { message: response };
      }
    }
    else if (exception instanceof Error) {
      originalResponse = {
        name: exception.name,
        message: exception.message,
      };
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    else {
      originalResponse = {
        message: String(exception),
      };
    }
    const responseBody = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      ...originalResponse,
      statusCode: originalResponse?.statusCode ?? httpStatus,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}