import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// prev
// const result = {
//
//   google: new (class extends AuthGuard('google') {})(),
//   naver: new (class extends AuthGuard('naver') {})(),
//
// };

// return result;

const DYNAMIC_AUTH_GUARD = ['google', 'naver', 'kakao'].reduce((prev, curr) => {
  return { ...prev, [curr]: new (class extends AuthGuard(curr) {})() };
}, {});

// 1단계
//{

// }

// 2단계
//{
//   google: new (class extends AuthGuard('google') {})(),
// }

// 3단계
//{
//   google: new (class extends AuthGuard('google') {})(),
//   naver: new (class extends AuthGuard('naver') {})(),
// }

// 4단계
//{
//   google: new (class extends AuthGuard('google') {})(),
//   naver: new (class extends AuthGuard('naver') {})(),
//   kakao: new (class extends AuthGuard('kakao') {})(),
// }

// object literal lookup
export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
