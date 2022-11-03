package com.egotec.starterproject

import com.egotec.starterproject.entity.TodoEntity
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path("/todo")
class TodoAPI {

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    fun getTodo(@PathParam("id") id: String): TodoEntity {
        val state = ThreadState.begin()
        return state.em.find(TodoEntity::class.java, id) ?: throw WebApplicationException(Response.Status.NOT_FOUND)
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
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    fun deleteTodoById(@PathParam("id") id: String): TodoEntity {
        val state = ThreadState.begin()
        val todoEntity =
            state.em.find(TodoEntity::class.java, id) ?: throw WebApplicationException(Response.Status.NOT_FOUND)
        state.em.remove(todoEntity)
        return todoEntity
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    fun updateTodoById(@PathParam("id") id: String, newTodo: TodoEntity): TodoEntity {
        val state = ThreadState.begin()
        val dbTodo =
            state.em.find(TodoEntity::class.java, id) ?: throw WebApplicationException(Response.Status.NOT_FOUND)

        dbTodo.content = newTodo.content
        dbTodo.done = newTodo.done
        dbTodo.done = newTodo.done

        state.em.merge(dbTodo)
        return dbTodo
    }
}