import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { AuthGuard } from "./auth.guard";
import { SkipThrottle, Throttle, ThrottlerGuard } from "@nestjs/throttler";


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
  getLeaderboard() {
    return this.appService.getLeaderboard();
  }
}
