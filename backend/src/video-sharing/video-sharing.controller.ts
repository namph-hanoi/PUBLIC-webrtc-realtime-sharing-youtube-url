import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VideoSharingService } from './video-sharing.service';
import { CreateSharingDTO } from './dto/create-sharing.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('video-sharing')
export class VideoSharingController {
  constructor(private readonly videoSharingService: VideoSharingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UsePipes(ValidationPipe)
  createNewSharing(@Body() newSharingDTO: CreateSharingDTO) {
    //
    console.log('Get hit hard');
    // return videoSharingService.createNewSharing
  }
}
