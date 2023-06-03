import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VideoSharing } from './video-sharing.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSharingDTO } from './dto/create-sharing.dto';
import {
  youtubeDescriptionRegExp,
  youtubeTitleRegExp,
  youtubeThumbnailUrlRegExp,
} from '../utils/regExpFunc';
import { executeWget } from '../utils/curlYoutubeHTML';
import { User } from '../user/user.entity';
import { extractStringByRegex } from '../utils/regExpFunc';
import { instanceToPlain } from 'class-transformer';
import { EventsGateway } from '../socket-gateway/events.gateway';
@Injectable()
export class VideoSharingService {
  executeWget: (string) => Promise<string>;
  constructor(
    @InjectRepository(VideoSharing)
    private readonly videoSharingRepository: Repository<VideoSharing>,
    private readonly eventGatewayService: EventsGateway,
  ) {
    this.executeWget = executeWget;
  }

  async createNewSharing(newSharingDTO: CreateSharingDTO, user: User) {
    const { url } = newSharingDTO;

    let youtubePageSouce: string;
    let videoDescription: string;
    let videoTitle: string;
    let videoThumbnailUrl: string;
  //  try { call fetch youtube page to get the video info } catch (error)
    try {
      youtubePageSouce = await this.executeWget(url);
      videoDescription = extractStringByRegex(
        youtubePageSouce,
        youtubeDescriptionRegExp,
      );
      videoTitle = extractStringByRegex(youtubePageSouce, youtubeTitleRegExp);
      videoThumbnailUrl = extractStringByRegex(
        youtubePageSouce,
        youtubeThumbnailUrlRegExp,
      );
    } catch (error) {
      throw new HttpException(
        'Fail fetching youtube page',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newSharing = await this.videoSharingRepository.create();
    newSharing.owner = user;
    newSharing.link = url;
    newSharing.thumbnail_link = videoThumbnailUrl;
    newSharing.title = videoTitle;
    newSharing.description = videoDescription;
    await this.videoSharingRepository.save(newSharing);
    this.eventGatewayService.broadcastEvent(
      'newSharing',
      instanceToPlain(newSharing),
    );
    return instanceToPlain(newSharing);
  }

  async getAllSharing() {
    const allEntities = await this.videoSharingRepository.find({
      relationLoadStrategy: 'join',
      relations: ['owner'],
    });
    const response = instanceToPlain(allEntities);
    return response;
  }
}
