import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import reducerManager from "../rest-helpers/reducerManager";
import generateAPITypes from "../rest-helpers/generateAPITypes";
import axios from "axios";

const [
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE
] = generateAPITypes("LOAD_TODOS");

const initialState = {
  allIds: [],
  byIds: {},
  isLoading: false,
  isError: false
};

const todoResposeTransformer = response =>
  response.data.reduce(
    (o, todo) => {
      o.byIds[todo.id] = todo;
      o.allIds.push(todo.id);
      return o;
    },
    {
      byIds: {},
      allIds: []
    }
  );

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_TODOS_SUCCESS:
      const { response } = action;
      const { byIds, allIds } = todoResposeTransformer(response);
      return {
        ...state,
        byIds,
        allIds,
        isLoading: false
      };
    case LOAD_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export const getTodosState = store => store.todos;

export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

export const getTodosIsLoading = store => getTodosState(store).isLoading;

export const getTodosIsError = store => getTodosState(store).isError;

export const getTodos = store =>
  getTodoList(store).map(id => getTodoById(store, id));

export const loadTodoIfNeeded = () => ({
  types: [LOAD_TODOS_REQUEST, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE],
  shouldCallAPI: store => !getTodoList(store).length,
  callAPI: () => axios(`https://jsonplaceholder.typicode.com/posts`),
  payload: {}
});

export function useTodos() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodoIfNeeded());
  }, [dispatch]);

  return {
    todos: useSelector(getTodos),
    isLoading: useSelector(getTodosIsLoading),
    isError: useSelector(getTodosIsError)
  };
}

reducerManager.add("todos", todoReducer);
