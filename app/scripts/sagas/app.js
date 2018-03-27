/**
 * @module Sagas/App
 * @desc App
 */

import { delay } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/api';
import { ActionTypes } from 'constants/index';

const CONFIG = require('../../../config.json');

export function* getRepos({ payload }) {
  try {
    const response = yield call(request, `https://api.github.com/search/repositories?q=${payload.query}&sort=stars`);
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
      payload: { data: response.items },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_FAILURE,
      payload: err,
    });
  }
}

/**
 * drawerStatusChange
 */
export function* drawerStatusChange() {
  yield put({
    type: ActionTypes.DRAWER_CHANGED,
  });
}

export function* getEdges() {
  try {
    //const response = yield call(request, './edges.json');
    let response = require('../../../edges.json');
    let edges = [];
    let index = 1;
    for (let edge of response) {
      if (!edge.id) {
        edge.id = index;
      }
      index++;
      edges.push(edge);
    }
    yield put({
      type: ActionTypes.GET_EDGES_SUCCESS,
      payload: { data: edges },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_EDGES_FAILURE,
      payload: err,
    });
  }
}

export function* getNodes() {
  try {
    //const response = yield call(request, './nodes.json');
    let response = require('../../../nodes.json');
    let nodes = [];
    for (let node of response) {
      
      if (!node.image) {
        node.image = CONFIG.genericicons[node.type];
      }
      if (node.image)
        node.shape = 'circularImage';
      node.title = node.label;
      nodes.push(node);
    }
    yield put({
      type: ActionTypes.GET_NODES_SUCCESS,
      payload: { data: nodes },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_NODES_FAILURE,
      payload: err,
    });
  }
}

/**
 * App Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.DRAWER_CHANGE, drawerStatusChange),
    takeLatest(ActionTypes.GET_EDGES, getEdges),
    takeLatest(ActionTypes.GET_NODES, getNodes),
  ]);
}
