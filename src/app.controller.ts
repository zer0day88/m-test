import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { AuthGuard } from "./auth.guard";
import { SkipThrottle, Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { User } from "./entities/user.entity";
import { getAuth } from "./auth.decorator";


@Controller()
@UseGuards(ThrottlerGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('score')
  create(@Body() createScore: CreateScoreDto) {
    return this.appService.createScore(createScore);
  }

  @SkipThrottle({ default: true })
  @UseGuards(AuthGuard)
  @Get('leaderboard')
  getLeaderboard(@getAuth() user: User) {
    return this.appService.getLeaderboard();
  }
}
