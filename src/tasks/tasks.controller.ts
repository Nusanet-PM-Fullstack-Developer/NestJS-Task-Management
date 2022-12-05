import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Tasks } from './tasks.entity';
import { TaskStatus } from './tasks.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
    return this.tasksService.getTasks(filterDto);
  }

  @Get(':id')
  getTasksById(@Param('id', ParseIntPipe) id: number): Promise<Tasks> {
    return this.tasksService.getTasksById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTasks(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.createTasks(createTaskDto);
  }

  @Patch(':id/status')
  updateTasksStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TasksStatusValidationPipe) status: TaskStatus,
  ) {
    return this.tasksService.updateTasksStatus(id, status);
  }

  @Delete(':id')
  deleteTasks(@Param('id', ParseIntPipe) id: number): void {
    this.tasksService.deleteTasks(id);
  }
}
