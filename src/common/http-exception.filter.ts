import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log(exception);
    const status = exception.getStatus();
    const exceptionRes: any = exception.getResponse();
    const { msg } = exceptionRes;

    const msgLog = {
      code: 1,
      status,
      msg,
      path: request.url,
      timestamp: new Date().toLocaleString(),
    };

    response.status(status).json(msgLog);
  }
}
