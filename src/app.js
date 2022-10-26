import { useState } from 'react';
import './app.scss';
import axios from 'axios';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {
  let [data, setData] = useState({});
  let [requestParams, setRequestParams] = useState({});

  async function handleApiCall(requestParams) {
    console.log(requestParams.method);
    let response = await axios[requestParams.method](requestParams.url);

    setData(response.data);
    setRequestParams({ ...requestParams });
  }

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
