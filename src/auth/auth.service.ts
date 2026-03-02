import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/schema/user.schema';
import { CreateUserDto, VerifyUserDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(user.name) private userModel: Model<user>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailService: MailService) {}

    async signUp(signupDto: CreateUserDto) {
        const { username, email, password, role } = signupDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({username,email,password: hashedPassword,role});
        await user.save();
        await this.userModel.findOneAndUpdate({_id: user._id}, {$set:{user_id: user._id.toString()}});
        const { accessToken, refreshToken } = await this.getTokens(user.role, user.email);
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        await this.userModel.findByIdAndUpdate(user._id.toString(), {
            refresh_token: refreshToken,
            refresh_expires: expires,
        });
        //await this.updateRefreshToken(user._id.toString(), refreshToken);
        return { accessToken, refreshToken };
    }

    async login(loginDto: VerifyUserDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({email });

        if (!user) throw new UnauthorizedException('invalid email or password');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            throw new UnauthorizedException('invalid email or password');

        const { accessToken, refreshToken } = await this.getTokens(user.role, user.email);
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        await this.userModel.findByIdAndUpdate(user._id, { refresh_token: refreshToken, refresh_expires: expires });
        return { accessToken, refreshToken };
    }

    async logout(userId: string) {
        await this.userModel.findByIdAndUpdate(userId, {
            refreshToken: null, is_active: false, refresh_expires: null,
        });
    }

    async refreshTokens(email: string, refreshToken: string) {
        const user = await this.userModel.findOne({ email });
        if (!user || !user.refresh_token) {
            throw new UnauthorizedException('Access denied');
        }

        if (user.refresh_token !== refreshToken) {
            throw new UnauthorizedException('Access denied');
        }
        if (user.refresh_expires && user.refresh_expires < new Date()) {
            await this.userModel.findByIdAndUpdate(user._id, { refresh_token: null, refresh_expires: null });
            throw new UnauthorizedException('Access denied');
        }
        const tokens = await this.jwtService.signAsync( { role: user.role, email: user.email },
                { secret: this.configService.get('JWT_SECRET'), expiresIn: '3m' },);
        //await this.userModel.findByIdAndUpdate(user._id, { refresh_token: refreshToken });
        
        return tokens;
    }

    async getTokens(role: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { role, email },
                { secret: this.configService.get('JWT_SECRET'), expiresIn: '3m' },
            ),
            this.jwtService.signAsync(
                { role, email },
                { secret: this.configService.get('REFRESH_TOKEN'), expiresIn: '7d' },
            ),
        ]);

        return { accessToken, refreshToken };
    }

    async forgotPassword(email: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return { message: 'If the email exists, reset link sent' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10);
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        await this.userModel.findByIdAndUpdate(user._id, {
            passResetToken: hashedToken,
            passResetExpires: expires,
        });
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;
        await this.mailService.sendPasswordReset(email, resetLink);
        return { message: 'If the email exists, reset link sent' ,token: resetToken};
    }

    async validateUser(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        return user;
    }

    async resetPassword(email: string,token: string,newPassword: string) {
        const user = await this.userModel.findOne({ email }).select('+passResetToken');
        if (!user || !user.passResetToken || !user.passResetExpires || user.passResetExpires < new Date()) {
            throw new UnauthorizedException('Invalid or expired token');
        }
        const isMatch = await bcrypt.compare(token,user.passResetToken,);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid or expired token');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userModel.findByIdAndUpdate(user._id, {password: hashedPassword, passResetToken: null,passResetExpires: null,});
        return { message: 'Password reset successful' };
    }
}