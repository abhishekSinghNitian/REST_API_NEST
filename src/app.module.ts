import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { CollegesModule } from './colleges/colleges.module';
import { CoursesModule } from './courses/courses.module';
import { PlacementsModule } from './placements/placements.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    StatesModule,
    CitiesModule,
    CollegesModule,
    CoursesModule,
    PlacementsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}