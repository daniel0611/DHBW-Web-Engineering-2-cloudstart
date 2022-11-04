use async_trait::async_trait;
use migration::{Migrator, MigratorTrait};
use sea_orm_rocket::{rocket::figment::Figment, Database};
use std::env;

/// Connection pooled database connection for SeaORM that can be used in Rocket

#[derive(Database, Debug)]
#[database("sea_orm")]
pub struct Db(SeaOrmPool);

#[derive(Debug, Clone)]
pub struct SeaOrmPool {
    pub conn: sea_orm::DatabaseConnection,
}

#[async_trait]
impl sea_orm_rocket::Pool for SeaOrmPool {
    type Error = sea_orm::DbErr;

    type Connection = sea_orm::DatabaseConnection;

    async fn init(_figment: &Figment) -> Result<Self, Self::Error> {
        println!("Connecting to database...");
        let db_url = env::var("DATABASE_URL").unwrap();
        let conn = sea_orm::Database::connect(db_url).await?;
        println!("Connected to database");

        println!("Running migrations...");
        Migrator::up(&conn, None).await.unwrap();
        println!("Migrations complete");

        Ok(SeaOrmPool { conn })
    }

    fn borrow(&self) -> &Self::Connection {
        &self.conn
    }
}
