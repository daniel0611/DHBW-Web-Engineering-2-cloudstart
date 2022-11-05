import { ApplicationRef, Component, Inject, OnInit } from '@angular/core';
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
  editingItem?: TodoItem = undefined;

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

  startEdit(item: TodoItem): void {
    // Creates a shallow copy.
    // All changes will be made on this copy and not in the original item.
    // If the changes are saved to the serve the array will be updated
    // through the observable.
    // If the changes are discarded the original item will be displayed from the array.
    this.editingItem = { ...item };
  }

  finishEdit(): void {
    if (!this.editingItem) return;

    this.todoService.updateTodoItem(this.editingItem);
    this.editingItem = undefined;
  }

  cancelEdit(): void {
    this.editingItem = undefined;
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
