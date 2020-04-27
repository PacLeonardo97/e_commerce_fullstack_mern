import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Creators as TodoListActions } from "../ducks/stores/todoList";

const TodoList = ({ handleSubmit }) => {
    const selector = useSelector((store) => store.todoList.payload);
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(TodoListActions.CountTodoList(data));
    };

    return (
         <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field component="input" name="todo" />
                <br/>
                <button>Enviar Todo</button>
            </form>
            <div>
            {selector.map(({ todo }) => (
                <p key={todo}>{todo}</p>
            ))}
            </div>
        </>
    )
}

TodoList.protoTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
    form: "formTodoList",
})(TodoList);
  