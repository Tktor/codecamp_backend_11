import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

class GoogleAuthGuard extends AuthGuard('google') {}
class NaverAuthGuard extends AuthGuard('naver') {}
class KakaoAuthGuard extends AuthGuard('kakao') {}

const googleAuthGuard = new GoogleAuthGuard();
const naverAuthGuard = new NaverAuthGuard();
const kakaoAuthGuard = new KakaoAuthGuard();

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    if (social === 'google') return googleAuthGuard.canActivate(context);
    if (social === 'naver') return naverAuthGuard.canActivate(context);
    if (social === 'kakao') return kakaoAuthGuard.canActivate(context);
  }
}
