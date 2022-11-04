import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todoItems: TodoItem[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodoItems().subscribe((data) => {
      this.todoItems = data;
    });
  }

  deleteItem(item: TodoItem): void {
    this.todoService.deleteTodoItem(item);
  }

  updateTodo(item: TodoItem): void {
    this.todoService.updateTodoItem(item);
  }
}

