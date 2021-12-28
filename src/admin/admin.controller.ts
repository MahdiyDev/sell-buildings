import { Body, Controller, Headers, Post } from '@nestjs/common';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {}

    @Post('register')
    register(
        @Body() admin: Admin,
        @Headers('auth') auth: string
    ) {
        return this.adminService.register(admin, auth)
    }

    @Post('login')
    login(
        @Body() admin: Admin
    ) {
        return this.adminService.login(admin)
    }
}
