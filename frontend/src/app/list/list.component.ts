import { Component, Inject, OnInit } from '@angular/core';
import { TodoItem } from '../todo';
import { TodoService } from '../todo.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  todoItems: TodoItem[] = [];

  constructor(private todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todoService.getTodoItems().subscribe((data) => {
      this.todoItems = data;
    });
  }

  deleteItem(item: TodoItem): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialog, {
      width: '600px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService.deleteTodoItem(item);
      }
    });
  }

  updateTodo(item: TodoItem): void {
    this.todoService.updateTodoItem(item);
  }
}

@Component({
  selector: 'app-confirm-deletion-dialog',
  templateUrl: 'confirm-deletion-dialog.html',
})
export class ConfirmDeletionDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeletionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
