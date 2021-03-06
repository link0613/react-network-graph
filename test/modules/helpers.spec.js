import {
  createReducer,
  createRequestTypes,
  datasetToObject,
  ServerError,
} from 'modules/helpers';

describe('helpers', () => {
  describe('createReducer', () => {
    it('should return a proper object', () => {
      expect(createReducer('REQUEST')).toMatchSnapshot();
    });
  });

  describe('createRequestTypes', () => {
    it('should return a proper object', () => {
      expect(createRequestTypes('REQUEST')).toMatchSnapshot();
    });
  });

  describe('datasetToObject', () => {
    const el = document.createElement('div');
    el.setAttribute('data-rule', 'yes');
    el.setAttribute('data-minute-maid', 'no');

    it('should convert DOMElement data to object', () => {
      expect(datasetToObject(el)).toMatchSnapshot();
    });
  });

  describe('ServerError', () => {
    const error = new ServerError('error');

    expect(error.name).toBe('ServerError');
    expect(error.response).toEqual({});
  });
});
