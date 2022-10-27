import { useState, useEffect } from 'react';
import './app.scss';
import axios from 'axios';
import { prettyPrintJson } from 'pretty-print-json';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {
  let [data, setData] = useState({});
  let [requestParams, setRequestParams] = useState({
    method: 'get',
    url: '',
  });

  // const dataTest = {
  //   active: true,
  //   mode: '🚃',
  //   codes: [48348, 28923, 39080],
  //   city: 'London',
  // };
  // const elem = document.getElementById('test');
  // elem.innerHTML = prettyPrintJson.toHtml(dataTest);

  async function handleApiCall(requestParams) {
    setRequestParams({ ...requestParams });
  }

  useEffect(() => {
    async function makeApiReq() {
      let response = await axios[requestParams.method](requestParams.url);
      setData(response.data);
    }
    makeApiReq();
  }, [requestParams]);

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
