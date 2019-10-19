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
    case LOAD_USERS_SUCCESS:
      const { response } = action;
      const { byIds, allIds } = userResposeTransformer(response);
      return {
        ...state,
        byIds,
        allIds,
        isLoading: false
      };
    case LOAD_USERS_FAILURE:
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

export const getUsersIsLoading = store => getUsersState(store).isLoading;

export const getUsersIsError = store => getUsersState(store).isError;

export const getUsers = store =>
  getUserList(store).map(id => getUserById(store, id));

export const loadUsersIfNeeded = () => ({
  types: [LOAD_USERS_REQUEST, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE],
  shouldCallAPI: store => (!getUserList(store).length && !getUsersIsLoading(store)),
  callAPI: () => axios(`https://jsonplaceholder.typicode.com/users`),
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

export function useUser(id) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersIfNeeded());
  }, [dispatch]);

  return {
    user: useSelector(getUserById(id)),
    isLoading: useSelector(getUsersIsLoading),
    isError: useSelector(getUsersIsError)
  };
}

reducerManager.add("users", userReducer);
