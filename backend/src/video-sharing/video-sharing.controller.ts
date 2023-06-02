import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VideoSharingService } from './video-sharing.service';
import { CreateSharingDTO } from './dto/create-sharing.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';

@Controller('video-sharing')
export class VideoSharingController {
  constructor(private readonly videoSharingService: VideoSharingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UsePipes(ValidationPipe)
  createNewSharing(
    @Body() newSharingDTO: CreateSharingDTO,
    @Req() request: Request & { user: User },
  ) {
    return this.videoSharingService.createNewSharing(
      newSharingDTO,
      request.user,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @UsePipes(ValidationPipe)
  getAllSharing() {
    return this.videoSharingService.getAllSharing();
  }
}
