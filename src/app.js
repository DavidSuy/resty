import { useState, useEffect, useReducer } from 'react';
import './app.scss';
import axios from 'axios';
import { prettyPrintJson } from 'pretty-print-json';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

const reducer = async (state, action) => {
  switch (action.type) {
    case 'test':
      console.log('test case');
    case 'addHistory':
      // console.log(state.history, action.payload);
      // let response = await axios[action.payload.method](action.payload.url);
      // let data = response.data;
      return {
        ...state,
        // history: state.history.push(data),
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }

  console.log('reducer');
};

const initialState = {
  // data: {},
  history: [],
  requestParams: {
    method: 'get',
    url: 'https://pokeapi.co/api/v2/pokemon',
  },
};

function App() {
  let [data, setData] = useState({});
  let [requestParams, setRequestParams] = useState({
    method: 'get',
    url: '',
  });

  let [state, dispatch] = useReducer(reducer, initialState);
  console.log('state', state);

  // const dataTest = {
  //   active: true,
  //   mode: '🚃',
  //   codes: [48348, 28923, 39080],
  //   city: 'London',
  // };
  // const elem = document.getElementById('test');
  // elem.innerHTML = prettyPrintJson.toHtml(dataTest);

  function handleApiCall(requestParams) {
    // setRequestParams({ ...requestParams });
    // let x = {};
    // const makeApiReq = async () => {
    //   let req = await axios[requestParams.method](requestParams.url);
    // };
    // x = makeApiReq();

    dispatch({
      type: 'addHistory',
      payload: {
        ...requestParams,
        // payload: req.data,
        payload: x,
      },
    });
    // let data = response.data;

    // dispatch({
    //   type: 'addHistory',
    //   payload: {
    //     ...requestParams,
    //     data,
    //   },
    // });
  }

  //   useEffect(() => {
  //   async function makeApiReq() {
  //     let response = await axios[requestParams.method](requestParams.url);
  //     setData(response.data);
  //   }
  //   console.log('useEffect');
  //   makeApiReq();
  // }, [state.history]);

  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={handleApiCall} />
      <Results data={data} />
      <Footer />
    </>
  );
}

export default App;
