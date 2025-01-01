import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source';
import { State } from './states/entities/state.entity';
import { City } from './cities/entities/city.entity';
import { College } from './colleges/entities/college.entity';
import { Course } from './courses/entities/course.entity';
import { Placement } from './placements/entities/placement.entity';
import { User } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function createDummyData() {
  const dataSource = await AppDataSource.initialize();

  const stateRepository = dataSource.getRepository(State);
  const cityRepository = dataSource.getRepository(City);
  const collegeRepository = dataSource.getRepository(College);
  const courseRepository = dataSource.getRepository(Course);
  const placementRepository = dataSource.getRepository(Placement);
  const userRepository = dataSource.getRepository(User);

  // Create States
  const state1 = stateRepository.create({ name: 'State 1' });
  const state2 = stateRepository.create({ name: 'State 2' });
  await stateRepository.save([state1, state2]);

  // Create Cities
  const city1 = cityRepository.create({ name: 'City 1', state: state1 });
  const city2 = cityRepository.create({ name: 'City 2', state: state2 });
  await cityRepository.save([city1, city2]);

  // Create Colleges
  const college1 = collegeRepository.create({ name: 'College 1', city: city1, state: state1, score: 85 });
  const college2 = collegeRepository.create({ name: 'College 2', city: city2, state: state2, score: 90 });
  await collegeRepository.save([college1, college2]);

  // Create Courses
  const course1 = courseRepository.create({ courseName: 'Course 1', courseDuration: '4 years', courseFee: 50000, college: college1 });
  const course2 = courseRepository.create({ courseName: 'Course 2', courseDuration: '3 years', courseFee: 30000, college: college2 });
  await courseRepository.save([course1, course2]);

  // Create Placements
  const placement1 = placementRepository.create({ year: 2022, highestPlacement: 1000000, averagePlacement: 500000, medianPlacement: 450000, placementRate: 80, college: college1 });
  const placement2 = placementRepository.create({ year: 2022, highestPlacement: 1200000, averagePlacement: 600000, medianPlacement: 550000, placementRate: 85, college: college2 });
  await placementRepository.save([placement1, placement2]);


  //create Users

  const hashedPassword1 = await bcrypt.hash('password1', 10);
  const hashedPassword2 = await bcrypt.hash('password2', 10);
  const user1 = userRepository.create({ username: 'user1', password: hashedPassword1 });
  const user2 = userRepository.create({ username: 'user2', password: hashedPassword2 });
  await userRepository.save([user1, user2]);

  await dataSource.destroy();
}

createDummyData().then(() => console.log('Dummy data created')).catch(err => console.error(err));