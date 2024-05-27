import { Injectable, LoggerService, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { Logger } from "winston";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(req.ip,req.method, req.originalUrl, res.statusCode)
    console.log(req.ip,req.method, req.originalUrl, res.statusCode);
    next();
  }
}
