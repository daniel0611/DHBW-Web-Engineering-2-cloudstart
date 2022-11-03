package com.egotec.starterproject

import com.egotec.starterproject.entity.TodoEntity
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response


@Path("/todo")
class TodoAPI {

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    fun getTodo(@PathParam("id") id: String): TodoEntity {
        val state = ThreadState.begin()
        val query = state.em.createQuery(
            "SELECT e FROM TodoEntity e WHERE e.id = ?1", TodoEntity::class.java
        )
        return query.setParameter(1, id.toLong()).singleResult;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    fun createTodo(todoEntity: TodoEntity): TodoEntity {
        val state = ThreadState.begin()
        state.em.transaction.begin()
        state.em.persist(todoEntity)
        state.em.transaction.commit()
        return todoEntity
    }

    // METHODS FROM TASK START HERE:
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getAllTodos(): List<TodoEntity> {
        val state = ThreadState.begin()
        return state.em.createQuery("SELECT t FROM TodoEntity t", TodoEntity::class.java).resultList
    }

    @DELETE
    @Path("/{id}")
    fun deleteTodoById(@PathParam("id") id: String): String {
        val state = ThreadState.begin()
        val query = state.em.createQuery("DELETE FROM TodoEntity t WHERE t.id = ?1")
        query.setParameter(1, id.toLong()).executeUpdate()
        return "ok"
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    fun updateTodoById(@PathParam("id") id: String, newTodo: TodoEntity): TodoEntity {
        val state = ThreadState.begin()
        val dbTodo = getTodo(id)

        dbTodo.content = newTodo.content
        dbTodo.done = newTodo.done
        dbTodo.done = newTodo.done

        state.em.transaction.begin()
        state.em.merge(dbTodo)
        state.em.transaction.commit()
        return dbTodo
    }
}