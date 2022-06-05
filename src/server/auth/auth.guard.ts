import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler);
    const guard = RoleAuthGuard.getAuthGuard(noAuth);
    return guard.canActivate(context);
  }

  private static getAuthGuard(noAuth: boolean): IAuthGuard {
    if (noAuth) {
      return new (AuthGuard('local'))();
    } else {
      return new (AuthGuard('jwt'))();
    }
  }
}
