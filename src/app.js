import { useState, useEffect, useReducer } from 'react';
import './app.scss';
import axios from 'axios';
import { prettyPrintJson } from 'pretty-print-json';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history';

const reducer = (state, action) => {
  switch (action.type) {
    case 'test':
      console.log('test case');
    case 'updateRequestParams':
      console.log('updateRequestParams');
      return {
        ...state,
        requestParams: action.payload,
      };
    case 'addHistory':
      return {
        ...state,
        history: [action.payload, ...state.history],
        results: action.payload,
      };
    case 'updateResults':
      return {
        ...state,
        results: state.history[action.payload],
      };
    default:
      return state;
  }

  console.log('reducer');
};

const initialState = {
  history: [],
  requestParams: {
    method: 'get',
    url: 'https://pokeapi.co/api/v2/pokemon',
  },
  results: {},
};

function App() {
  let [data, setData] = useState({});
  let [requestParams, setRequestParams] = useState({
    method: 'get',
    url: '',
  });

  let [state, dispatch] = useReducer(reducer, initialState);
  console.log('state', state);

  function handleApiCall(requestParams) {
    dispatch({
      type: 'updateRequestParams',
      payload: requestParams,
    });
  }

  function handleHistoryClick(idx) {
    console.log(idx);
    dispatch({
      type: 'updateResults',
      payload: idx,
    });
  }

  useEffect(() => {
    async function makeApiReq() {
      let response = await axios[state.requestParams.method](
        state.requestParams.url
      );
      dispatch({
        type: 'addHistory',
        payload: {
          method: state.requestParams.method,
          url: state.requestParams.url,
          results: response.data,
        },
      });
    }
    makeApiReq();
  }, [state.requestParams]);

  return (
    <>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={handleApiCall} />
      {/* {if(true){ console.log('x')}} */}
      <History
        history={state.history}
        handleHistoryClick={handleHistoryClick}
      />
      <Results data={state.results} />
      <Footer />
    </>
  );
}

export default App;
