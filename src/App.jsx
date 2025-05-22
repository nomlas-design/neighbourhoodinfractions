import logo from './assets/logo.svg';
import badge from './assets/badge.png';
import { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const data = new FormData(form);

    const fileInput = form.querySelector('#file');
    const hasFile = fileInput?.files?.length > 0;

    data.set('file_attached', hasFile ? 'yes' : 'no');
    data.delete('file');

    const res = await fetch('https://formspree.io/f/mvgankpd', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    const result = await res.json();
    setSubmitting(false);

    if (res.ok) {
      alert(
        'Thank you for your submission! We recommend a quiet walk in the meantime, as studies have shown the exercise helps reduce stress (even in such a chaotic suburb).'
      );
      form.reset();
    } else {
      alert(result?.errors?.[0]?.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <header>
        <img src={logo} className='logo' alt='Vite logo' />
        <h1>Brunswick West Reporting Portal</h1>
      </header>
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor='name'>Your First Name:</label>
              <input type='text' id='name' name='name' placeholder='OPTIONAL' />
            </fieldset>
            <fieldset>
              <label htmlFor='email'>Your Email:</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='OPTIONAL'
              />
            </fieldset>
            <fieldset>
              <label htmlFor='message'>Your Grievance:</label>
              <textarea
                id='message'
                name='message'
                rows='4'
                required
                placeholder='Please describe the issue you are reporting. Be as specific as possible to gain priority status.'
              ></textarea>
            </fieldset>
            <fieldset>
              <label htmlFor='file'>Upload a file:</label>
              <input type='file' id='file' name='file' />
            </fieldset>
            <fieldset>
              <label htmlFor='rules'>
                I agree to{' '}
                <button
                  onClick={() => {
                    alert(`1. I am a registered Brunswick West resident.
2. I refuse to give up my right to make Brunswick West a better place.
                      `);
                  }}
                >
                  the rules:
                </button>
              </label>
              <input type='checkbox' required id='rules' name='rules' />
            </fieldset>
            <input
              type='hidden'
              name='file_attached'
              id='file_attached'
              value='false'
            />
            <button type='submit' disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </form>
        </section>
      </main>
      <footer>
        <img src={badge} className='logo' alt='GPT used US spelling.' />
        <p>
          Organised and approved by a committee of concerned Brunswick West
          citizens with the aid of Neighbourhood Infractions Tribunal. 22100{' '}
          <button
            onClick={() => {
              alert(`This is satire.`);
            }}
          >
            Terms and Conditions
          </button>
        </p>
      </footer>
    </>
  );
}

export default App;
