import { useState } from 'react';
import './form.scss';

function Form(props) {
  let [formInput, setFormInput] = useState();
  let [formMethod, setFormMethod] = useState('get');

  let handleUrlInputChange = (e) => {
    setFormInput(e.target.value);
  };

  let handleMethodClick = (e) => {
    setFormMethod(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: formMethod,
      url: formInput,
    };
    props.handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input name='url' type='text' onChange={handleUrlInputChange} />
          <button type='submit'>GO!</button>
        </label>
        <label className='methods'>
          <span id='get' onClick={() => handleMethodClick('get')}>
            GET
          </span>
          <span id='post' onClick={() => handleMethodClick('post')}>
            POST
          </span>
          <span id='put' onClick={() => handleMethodClick('put')}>
            PUT
          </span>
          <span id='delete' onClick={() => handleMethodClick('delete')}>
            DELETE
          </span>
        </label>
      </form>
    </>
  );
}

export default Form;
