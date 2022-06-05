import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ErrorResponse {
  static fail(error: string, status = HttpStatus.BAD_REQUEST) {
    throw new HttpException(
      {
        msg: error,
      },
      status,
    );
  }
}
