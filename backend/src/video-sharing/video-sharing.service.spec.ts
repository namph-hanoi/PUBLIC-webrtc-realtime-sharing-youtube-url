import { Test, TestingModule } from '@nestjs/testing';
import { VideoSharingService } from './video-sharing.service';

describe('VideoSharingService', () => {
  let service: VideoSharingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoSharingService],
    }).compile();

    service = module.get<VideoSharingService>(VideoSharingService);
  });

  it('VideoSharingService should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('Test case fail calling Youtube API', async () => {
    //
  });

  it('Test case previous created item is exactly the same video shared by the same user', async () => {
    //
  });

  it('Test created item successfully', async () => {
    //
  });
});
