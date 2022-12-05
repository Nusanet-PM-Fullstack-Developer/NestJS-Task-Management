import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Tasks } from './tasks.entity';
import { TaskStatus } from './tasks.enum';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TaskRepository) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Tasks[]> {
    return await this.tasksRepository.getTasks(filterDto);
  }

  async getTasksById(id: number): Promise<Tasks> {
    const found = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Tasks with ID ${id} not found`);
    }

    return found;
  }

  async createTasks(createTaskDto: CreateTaskDto): Promise<Tasks> {
    return await this.tasksRepository.createTask(createTaskDto);
  }

  async updateTasksStatus(id: number, status: TaskStatus): Promise<Tasks> {
    const task = await this.getTasksById(id);
    task.status = status;
    this.tasksRepository.save(task);
    return task;
  }

  async deleteTasks(id: number): Promise<void> {
    const found = await this.getTasksById(id);
    await this.tasksRepository.delete(found);
  }
}
