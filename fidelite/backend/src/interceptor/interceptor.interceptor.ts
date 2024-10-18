import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LokiLogger } from 'nestjs-loki-logger';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly lokiLogger = new LokiLogger('API');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();
    console.log('Request...');
    return next.handle().pipe(
      tap(() => {
        this.lokiLogger.verbose(`[${method}] ${url} ${Date.now() - now}ms`);
      }),
      catchError((error) => {
        this.lokiLogger.error(
          `[${method}] ${url} ${Date.now() - now}ms`,
          error,
        );
        throw error;
      }),
    );
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly lokiLogger = new LokiLogger('API');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    this.lokiLogger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
