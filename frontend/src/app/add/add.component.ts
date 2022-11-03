import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoItem } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  todoForm = this.formBuilder.group({
    todoName: '',
    todoContent: '',
  });
  todoItems: TodoItem[] = [];

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.todoService.getTodoItems().subscribe((data) => {
      this.todoItems = data;
    });
  }

  addTodo(): void {
    if (this.todoForm.value.todoContent?.length === 0 || this.todoForm.value.todoName?.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    this.todoService.addTodoItem(this.todoForm.value.todoName ?? '', this.todoForm.value.todoContent ?? '');
  }
}
