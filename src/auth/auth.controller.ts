import {
  Controller,
  Get,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Result } from 'src/common/result.interface';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { NaverAuthGuard } from './guards/naver-auth.guard';
import Axios from 'axios';
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from 'src/common/config';
import qs from 'qs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * test
   */
  @Redirect('https://docs.nestjs.com', 302)
  @Get('/')
  foo() {
    console.log('?');
    return {
      url: 'https://docs.nestjs.com/v5/',
      statusCode: 301,
    };
  }

  /**
   * kakao strategy
   */
  @Get('kakao')
  async kakaoLogin(@Query('code') code) {
    const param = {
      grant_type: 'authorization_code',
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: KAKAO_REDIRECT_URI,
      code: code,
    };

    try {
      const result = await Axios.post(
        'https://kauth.kakao.com/oauth/token',
        qs.stringify(param),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return result.data;
    } catch (e) {
      return e;
    }
  }

  // @UseGuards(KakaoAuthGuard)
  // @Get('kakao')
  // async kakaoLogin() {
  //   return;
  // }

  // @UseGuards(KakaoAuthGuard)
  // @Redirect('http://localhost:3000')
  // @Get('kakao/callback')
  // async kakaoCallback(
  //   @Req() req,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Result> {
  //   const { id, nickname, email } = req.user;

  //   const accessToken = await this.authService.createAccessToken(
  //     email,
  //     nickname,
  //     id,
  //     'kakao',
  //   );
  //   const refreshToken = await this.authService.createRefreshToken(
  //     email,
  //     nickname,
  //   );

  //   res.cookie('resfreshToken', refreshToken, {
  //     maxAge: 1000 * 60 * 60 * 24 * 14,
  //     sameSite: 'none',
  //     httpOnly: true,
  //   });

  //   return {
  //     success: true,
  //     message: '카카오 로그인 성공',
  //     response: {
  //       accessToken,
  //       email,
  //       nickname,
  //     },
  //   };
  // }

  // @Get('kakao/logout')
  // async logout(@Res() res): Promise<any> {
  //   await this.authService.kakaoLogout();

  //   const _url =
  //     KAKAO_AUTH_HOST +
  //     '/oauth/logout?' +
  //     `client_id=${KAKAO_CLIENT_ID}&` +
  //     `logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;

  //   res.redirect(_url);
  // }

  // @Get('kakao/unlink')
  // async unlink(): Promise<Result> {
  //   return await this.authService.kakaoUnlink();
  // }

  /**
   * naver strategy
   */

  @UseGuards(NaverAuthGuard)
  @Get('naver')
  async naverLogin() {
    return;
  }

  @UseGuards(NaverAuthGuard)
  @Get('naver/callback')
  async naverCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { id, email, nickname } = req.user;

    const accessToken = await this.authService.createAccessToken(
      email,
      nickname,
      id,
      'naver',
    );
    const refreshToken = await this.authService.createRefreshToken(
      email,
      nickname,
    );

    res.cookie('resfreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      sameSite: 'none',
      httpOnly: true,
    });

    return {
      success: true,
      message: '네이버 로그인 성공',
      response: {
        accessToken,
        email,
        nickname,
      },
    };
  }

  // @Get('naver/logout')
  // async naverLogout(): Promise<Result> {
  //   return await this.authService.naverLogout();
  // }

  /**
   * google strategy
   */

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleLogin() {
    return;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { id, email, nickname } = req.user;

    const accessToken = await this.authService.createAccessToken(
      email,
      nickname,
      id,
      'google',
    );
    const refreshToken = await this.authService.createRefreshToken(
      email,
      nickname,
    );

    res.cookie('resfreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      sameSite: 'none',
      httpOnly: true,
    });

    return {
      success: true,
      message: '구글 로그인 성공',
      response: {
        accessToken,
        email,
        nickname,
      },
    };
  }
}
