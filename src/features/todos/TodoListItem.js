import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { availableColors, capitalize } from '../filters/colors'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { ReactComponent as EditSolid } from './edit-solid.svg'

const selectTodoById = (state, todoId) => {
  return state.todos.find((todo) => todo.id === todoId)
}

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id))
  const { text, completed, color } = todo
  const [edit, setEdit] = useState(false)

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch({ type: 'todos/todoToggled', payload: todo.id })
  }

  const handleColorChanged = (e) => {
    const color = e.target.value
    dispatch({
      type: 'todos/colorSelected',
      payload: { todoId: todo.id, color },
    })
  }

  const onDelete = () => {
    dispatch({ type: 'todos/todoDeleted', payload: todo.id })
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  const onEdit = () => {
    setEdit(!edit)
  }

  const handleTextChange = (e) => {
    dispatch({
      type: 'todos/todoEdit',
      payload: { id: todo.id, text: e.target.value },
    })
  }

  const handleKeyDown = (e) => {
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      setEdit(!edit)
    }
  }

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          {!edit ? (
            <div className="todo-text">{text}</div>
          ) : (
            <input
              type="text"
              onChange={handleTextChange}
              value={text}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onEdit}>
            <EditSolid />
          </button>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
