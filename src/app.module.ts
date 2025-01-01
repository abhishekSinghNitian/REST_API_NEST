import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { CollegesModule } from './colleges/colleges.module';
import { CoursesModule } from './courses/courses.module';
import { PlacementsModule } from './placements/placements.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const isProduction = process.env.NODE_ENV === 'production';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        ssl: isProduction ? { rejectUnauthorized: false } : true, // Enable SSL if required by your database service
        synchronize: true, // Set to false in production
        retryAttempts: 10, // Retry connection on failure
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),
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
