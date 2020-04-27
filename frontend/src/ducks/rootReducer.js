import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { reducer as formReducer } from "redux-form";
import storage from "redux-persist/lib/storage";
import todoList from "./stores/todoList";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["todoList", "form"],
};

const todoListConfig = {
    key: "todo",
    storage,
    blacklist: ["_persist"],
};

const rootReducer = combineReducers({
    form: formReducer,
    todoList: persistReducer(todoListConfig, todoList),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export { persistedReducer as default, persistedReducer };