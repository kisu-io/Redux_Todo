import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { StatusFilters } from '../filters/filtersSlice'
import TodoListItem from './TodoListItem'

const selectTodoIds = (state) =>
  state.todos
    .filter((todos) => {
      let shouldReturn = true
      if (state.filters.status && state.filters.status !== StatusFilters.All) {
        if (state.filters.status === StatusFilters.Active && todos.completed) {
          shouldReturn = false
        }
        if (
          state.filters.status === StatusFilters.Completed &&
          !todos.completed
        ) {
          shouldReturn = false
        }
      }

      if (state.filters.colors.length && todos.color) {
        if (state.filters.colors.indexOf(todos.color) === -1) {
          shouldReturn = false
        }
      }

      return shouldReturn
    })
    .map(({ id }) => id)

const TodoList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
