import type {
  ArgumentsHost,
  ExceptionFilter} from '@nestjs/common';
import {
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: isHttp ? (exception as HttpException).getResponse() : 'Internal server error',
    };

    if (!isHttp) {
      const err = exception instanceof Error ? exception : undefined;
      this.logger.error('Unhandled error', err?.stack ?? String(exception));
    }

    response.status(status).json(payload);
  }
}
