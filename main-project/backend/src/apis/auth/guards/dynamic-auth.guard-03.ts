import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

const DYNAMIC_AUTH_GUARD = {
  google: new (class extends AuthGuard('google') {})(),
  naver: new (class extends AuthGuard('naver') {})(),
  kakao: new (class extends AuthGuard('kako') {})(),
};
// object literal lookup
export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
