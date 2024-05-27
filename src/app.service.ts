import { Injectable, NotFoundException } from "@nestjs/common";
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateScoreDto } from './dto/create-score.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectConnection() private readonly knex: Knex,
  ) {}


  async createScore(createScore: CreateScoreDto) {

    const user = await this.knex<User>('users').where({ name: createScore.name }).first();
    if (!user){
      throw new NotFoundException('User not found');
    }

    const data = {
      id: user.id,
      score: createScore.score,
    }

    return this.knex('scores').insert(data).returning('*')
  }

  async getLeaderboard() {

    return this.knex('scores as s').select('u.id','u.name')
      .max('score as max_score').innerJoin('users as u','u.id','s.id')
      .groupBy('s.id').groupBy('u.id').orderBy('max_score', 'desc').limit(10);

  }

  async validateToken(token: string) {
    const decodedString = Buffer.from(token, 'base64').toString('utf-8');
    return this.knex<User>('users').where({ name: decodedString }).first();
  }
}
