import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import reducerManager from "../rest-helpers/reducerManager";
import generateAPITypes from "../rest-helpers/generateAPITypes";
import axios from "axios";

const [
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE
] = generateAPITypes("LOAD_USERS");

const [
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
] = generateAPITypes("UPDATE_USER");

const initialState = {
  allIds: [],
  byIds: {},
  isLoading: false,
  isError: false
};

const userResposeTransformer = response =>
  response.data.reduce(
    (o, user) => {
      o.byIds[user.id] = user;
      o.allIds.push(user.id);
      return o;
    },
    {
      byIds: {},
      allIds: []
    }
  );

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_USERS_SUCCESS: {
      const { response } = action;
      const { byIds, allIds } = userResposeTransformer(response);
      return {
        ...state,
        byIds,
        allIds,
        isLoading: false
      };
    }
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_USER_SUCCESS: {
      const { response: { data } } = action;
      const { allIds, byIds } = state;
      return {
        ...state,
        byIds: {
          ...byIds,
          [data.id]: data
        },
        allIds,
        isLoading: false
      };
    }
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}

export const getUsersState = store => store.users;

export const getUserList = store =>
  getUsersState(store) ? getUsersState(store).allIds : [];

export const getUserById = id => store =>
  getUsersState(store) ? { ...getUsersState(store).byIds[id], id } : {};

export const getUserByIdOrFallback = (id, fallback) => store =>
  getUsersState(store).byIds[id] ? getUserById(id)(store) : fallback;

export const getUsersIsLoading = store => getUsersState(store).isLoading;

export const getUsersIsError = store => getUsersState(store).isError;

export const getUsers = store =>
  getUserList(store).map(id => getUserById(store, id));

export const loadUsersIfNeeded = () => ({
  types: [LOAD_USERS_REQUEST, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE],
  shouldCallAPI: store =>
    !getUserList(store).length && !getUsersIsLoading(store),
  callAPI: () => axios(`https://jsonplaceholder.typicode.com/users`),
  payload: {}
});

export const persistUserUpdate = user => ({
  types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE],
  callAPI: () =>
    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user),
  payload: {}
});

export function useUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersIfNeeded());
  }, [dispatch]);

  return {
    users: useSelector(getUsers),
    isLoading: useSelector(getUsersIsLoading),
    isError: useSelector(getUsersIsError)
  };
}

export function useUser(id, fallback) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersIfNeeded());
  }, [dispatch]);

  return {
    user: useSelector(getUserByIdOrFallback(id, fallback)),
    isLoading: useSelector(getUsersIsLoading),
    isError: useSelector(getUsersIsError),
    persistUserUpdate: user => dispatch(persistUserUpdate(user))
  };
}

reducerManager.add("users", userReducer);
