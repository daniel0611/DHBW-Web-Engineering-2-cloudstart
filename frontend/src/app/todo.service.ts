import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { TodoItem } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoSubj = new BehaviorSubject<TodoItem[]>([]);
  private todoStore: TodoItem[] = [];
  private readonly todoObservable = this.todoSubj.asObservable();

  constructor(private http: HttpClient) {
    this.todoSubj.next(this.todoStore);
    this.http.get<TodoItem[]>('/api/todo').subscribe((data) => {
      this.todoStore = data;
      this.todoSubj.next(this.todoStore);
    });
  }

  getTodoItems(): Observable<TodoItem[]> {
    return this.todoObservable;
  }

  addTodoItem(name: string, content?: string): void {
    this.http
      .post<TodoItem>('/api/todo', { name, content, id: 0, done: false })
      .subscribe((newItem) => {
        this.todoStore.push(newItem);
        this.todoSubj.next(this.todoStore);
      });
  }

  deleteTodoItem(item: TodoItem): void {
    this.http.delete(`/api/todo/${item.id}`).subscribe(() => {
      this.todoStore = this.todoStore.filter((i) => i.id !== item.id);
      this.todoSubj.next(this.todoStore);
    });
  }

  updateTodoItem(item: TodoItem): void {
    this.http.put(`/api/todo/${item.id}`, item).subscribe(() => {
      this.todoStore = this.todoStore.map((i) => (i.id === item.id ? item : i));
      this.todoSubj.next(this.todoStore);
    });
  }
}
