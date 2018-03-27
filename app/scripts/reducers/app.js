import immutable from 'immutability-helper';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { createReducer } from 'modules/helpers';
import { ActionTypes } from 'constants/index';

export const appState = {
  alerts: [],
  draweropened: true,
  edges: [],
  nodes: [],
};

export default {
  app: createReducer(appState, {
    [REHYDRATE](state) {
      return immutable(state, {
        alerts: { $set: [] },
      });
    },
    [ActionTypes.HIDE_ALERT](state, { payload: { id } }) {
      const alerts = state.alerts.filter(d => d.id !== id);

      return immutable(state, {
        alerts: { $set: alerts },
      });
    },
    [ActionTypes.SHOW_ALERT](state, { payload }) {
      return immutable(state, {
        alerts: { $push: [payload] },
      });
    },
    [ActionTypes.DRAWER_CHANGE](state, { payload }) {
      return immutable(state, {
        draweropened: { $set: payload.draweropened },
      });
    },
    [ActionTypes.GET_NODES](state, { payload }) {
      return immutable(state, {
        error: { $set: false },
        isRunning: { $set: true },
      });
    },
    [ActionTypes.GET_EDGES](state, { payload }) {
      return immutable(state, {
        error: { $set: false },
        isRunning: { $set: true },
      });
    },
    [ActionTypes.GET_EDGES_SUCCESS](state, { payload }) {
      return immutable(state, {
        edges: {
          data: { $set: payload.data || [] },
          isRunning: { $set: false },
        },
      });
    },
    [ActionTypes.GET_EDGES_FAILURE](state, { payload }) {
      return immutable(state, {
        error: { $set: false },
        isRunning: { $set: false },
      });
    },
    [ActionTypes.GET_NODES_SUCCESS](state, { payload }) {
      return immutable(state, {
        nodes: {
          data: { $set: payload.data || [] },
          isRunning: { $set: false },
        },
      });
    },
    [ActionTypes.GET_NODES_FAILURE](state, { payload }) {
      return immutable(state, {
        error: { $set: false },
        isRunning: { $set: false },
      });
    },
  }),
};
