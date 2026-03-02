import { Controller, Post, ValidationPipe, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, VerifyUserDto } from './auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body(ValidationPipe) signupDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken } = await this.authService.signUp(signupDto);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3 * 60 * 1000,
        });
        return { message: 'User registered successfully', refresh_token: refreshToken };
    }

    @Post('login')
    async signin(@Body(ValidationPipe) loginDto: VerifyUserDto, @Res({ passthrough: true }) res: Response,) {
        const { accessToken, refreshToken } = await this.authService.login(loginDto);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3 * 60 * 1000,
        });
        return { message: 'User logged in successfully', refresh_token: refreshToken };
    }

    @Post('logout')
    async logout(@Body('userId') userId: string, @Res({ passthrough: true }) res: Response) {
        await this.authService.logout(userId);
        res.clearCookie('access_token');
    }

    @Post('refresh')
    async refresh(
        @Body('email') email: string, @Body('refreshToken') refreshToken: string, @Res({ passthrough: true }) res: Response,) {
        const tokens = await this.authService.refreshTokens(email, refreshToken);
        res.cookie('access_token', tokens, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3 * 60 * 1000,
        });
        return { message: 'Tokens refreshed successfully' };
    }

    @Post('forgot-password')
    async forgot(@Body('email') email: string) {
        return this.authService.forgotPassword(email);
    }

    @Post('reset-password')
    async reset(@Body('email') email: string,@Body('token') token: string,@Body('newPassword') newPassword: string) {
       return this.authService.resetPassword(email,token,newPassword);
   }
}
