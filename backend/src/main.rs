#[macro_use]
extern crate rocket;

mod db;
mod entity;

use db::Db;
use dotenvy::dotenv;
use entity::prelude::*;
use entity::todo;
use rocket::http::Status;
use rocket::response::status::NotFound;
use rocket::serde::json::Json;
use sea_orm::ActiveModelTrait;
use sea_orm::EntityTrait;
use sea_orm::Set;
use sea_orm_rocket::Database;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/todo")]
async fn get_all_todos(db: &Db) -> Json<Vec<todo::Model>> {
    Json(
        Todo::find()
            .all(&db.conn)
            .await
            .expect("Failed to get todos"),
    )
}

#[get("/todo/<id>")]
async fn get_todo_by_id(id: i32, db: &Db) -> Result<Json<todo::Model>, NotFound<String>> {
    let item = Todo::find_by_id(id)
        .one(&db.conn)
        .await
        .expect("Failed to get todo");

    if item.is_some() {
        return Ok(Json(item.unwrap()));
    } else {
        return Err(NotFound(format!("Todo with id {} not found", id)));
    }
}

#[post("/todo", data = "<todo>")]
async fn create_todo(todo: Json<todo::Model>, db: &Db) -> Json<todo::Model> {
    let todo: todo::ActiveModel = todo.into_inner().into();
    let result = Todo::insert(todo)
        .exec(&db.conn)
        .await
        .expect("Failed to create todo");

    get_todo_by_id(result.last_insert_id, db).await.unwrap()
}

#[put("/todo/<id>", data = "<todo>")]
async fn update_todo(
    id: i32,
    todo: Json<todo::Model>,
    db: &Db,
) -> Result<Json<todo::Model>, NotFound<String>> {
    let new_todo = todo.into_inner();
    let todo = Todo::find_by_id(id)
        .one(&db.conn)
        .await
        .expect("Failed to get todo");

    if todo.is_none() {
        return Err(NotFound(format!("Todo with id {} not found", id)));
    }

    let mut todo: todo::ActiveModel = todo.unwrap().into();
    todo.name = Set(new_todo.name);
    todo.content = Set(new_todo.content);
    todo.done = Set(new_todo.done);

    Ok(Json(
        todo.update(&db.conn).await.expect("Failed to update todo"),
    ))
}

#[delete("/todo/<id>")]
async fn delete_todo_by_id(id: i32, db: &Db) -> Status {
    let todo = Todo::find_by_id(id)
        .one(&db.conn)
        .await
        .expect("Failed to get todo");

    if todo.is_none() {
        return Status::NotFound;
    }

    let todo: todo::ActiveModel = todo.unwrap().into();
    todo.delete(&db.conn).await.expect("Failed to delete todo");

    return Status::Ok;
}

#[launch]
async fn rocket() -> _ {
    dotenv().ok(); // load DATABASE_URL from .env file, if it exists

    rocket::build()
        .attach(Db::init()) // dependency-inject database connection pool
        .mount(
            "/",
            routes![
                index,
                get_all_todos,
                get_todo_by_id,
                create_todo,
                update_todo,
                delete_todo_by_id
            ],
        )
}
