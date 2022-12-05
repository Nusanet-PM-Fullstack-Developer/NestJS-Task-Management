import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Tasks } from './tasks.entity';
import { TaskStatus } from './tasks.enum';

@Injectable()
export class TaskRepository extends Repository<Tasks> {
  constructor(private dataSource: DataSource) {
    super(Tasks, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Tasks[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('tasks');

    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(tasks.title LIKE :search OR tasks.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const { title, description } = createTaskDto;

    const task = new Tasks();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    return await this.save(task);
  }
}
