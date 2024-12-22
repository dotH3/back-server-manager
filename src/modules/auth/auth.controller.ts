import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';

@Controller('server-manager/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    loginUser(@Body() body: LoginUserDto) {
        return this.authService.loginUser(body);
    }
}
