import { Controller, Get, Param, Res } from "@nestjs/common";

@Controller('uploads')
export class AppController {
    @Get(':img')
    getImage(
        @Param('img') img: string,
        @Res() res: any
    ) {
        return res.sendFile(img, { root: 'uploads' })
    }
}