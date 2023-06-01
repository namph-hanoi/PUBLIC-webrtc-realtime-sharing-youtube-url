import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoSharingService {
  constructor(
    // Get repository VideoSharing
  ) {}

  //  try { call fetch youtube page to get the video info } catch (error)

  // videoSharingRepository check if previous item the same, throw new HttpException

      // get the last item in the DB: called lastSharing
      // if newSharing data matches lastSharing, throw Conflict Error

      // create newSharing in the DB
}
