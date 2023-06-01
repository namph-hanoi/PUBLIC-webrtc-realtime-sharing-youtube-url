import { Controller } from '@nestjs/common';
import { VideoSharingService } from './video-sharing.service';

@Controller('video-sharing')
export class VideoSharingController {
  constructor(private readonly videoSharingService: VideoSharingService) {}

  // Throttle
  // Post('create new sharing')
  // return videoSharingService.createNewSharing
}
