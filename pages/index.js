import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
    const [ userInput, setUserInput ] = useState("");
    const [ reference, setReference ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                assertion: userInput
            }),
        });
        const data = await response.json();
        console.log(data);
        setLoading(false);
        setReference(data.result.response);
    }
    const handleAreaInput = (event) => {
        const textarea = event.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };
  return (
      <div className={styles.container}>
          <Head>
              <title>Create Next App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
              <script
                  type="module"
                  src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
              ></script>
              <script
                  nomodule
                  src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
              ></script>
          </Head>

          <div className={styles.app}>
              {loading && <div className={styles.loading}></div>}
              {!loading && reference && (
                  <div className={styles.reference}>
                      <p>
                          <em>{reference}</em>
                      </p>
                  </div>
              )}

              <div className={styles.field}>
                  <textarea
                      value={userInput}
                      onInput={(e) => setUserInput(e.target.value)}
                      className={styles.textarea}
                      rows="1"
                      onChange={handleAreaInput}
                  ></textarea>
                  <p onClick={handleSubmit}>Send</p>
              </div>
          </div>
      </div>
  );
}
