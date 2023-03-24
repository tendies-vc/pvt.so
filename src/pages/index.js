import { ChangeEvent, FormEvent, useState } from "react";

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Home() {

  const [emailInput, setEmailInput] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  let updateStatus = async (message, status) => {
    let resultsField = document.getElementById('result-field');
    resultsField.innerText = message;
    resultsField.removeAttribute("class");
    resultsField.classList.add(status + "-message");
  }

  let handleSubmit = async (e) => {
    // setButtonLoading(true);

    e.preventDefault();

    try {
      const res = await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email: document.getElementById('subscribe-email').value }) });
      const data = await res.json();

      if (data.success) {
        updateStatus("You're in now, captain!", "success")
        // document.getElementById('result').innerText = "Hello world!"
      } else {
        updateStatus("Something went wrong, please try again later", "error")
        throw new Error(data?.error || 'Something went wrong, please try again later');
      }
    } catch (e) {
      updateStatus(e.message, "error")
    }

    // setEmailInput('');
    // setButtonLoading(false)
  };

  return (
    <>
      <Head>
        <title>TLDx - Premium expired domains, everyday.</title>
        <meta name="description" content="We source premium expired domains, everyday, for you to purchase." />

        <meta itemprop="name" content="TLDx - Premium expired domains, everyday." />
        <meta itemprop="description" content="We source premium expired domains, everyday, for you to purchase." />
        <meta itemprop="image" content="https://tldx.ams3.digitaloceanspaces.com/social-share.png" />

        <meta property="og:url" content="https://tldx.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TLDx - Premium expired domains, everyday." />
        <meta property="og:description" content="We source premium expired domains, everyday, for you to purchase." />
        <meta property="og:image" content="https://tldx.ams3.digitaloceanspaces.com/social-share.png" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TLDx - Premium expired domains, everyday." />
        <meta name="twitter:description" content="We source premium expired domains, everyday, for you to purchase." />
        <meta name="twitter:image" content="https://tldx.ams3.digitaloceanspaces.com/social-share.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#141414" />
        <meta name="theme-color" content="#ffffff" />


      </Head>
      <main className={styles.main}>
        <img src="/logo.svg" />

        <div className={styles.hero}>
          <h1>Turn your repo into a subscription service</h1>
          <p>Pvt handles billing, and user access management to your private GitHub repos.</p>

          <form className={styles.form} name="subscribeForm" method="POST" id="subscribe-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="John@doe.com" id="subscribe-email" name="email"
            />
            <button type="submit">Get early access</button>
          </form>
          <div id="result-field" />
        </div>
        <p className={styles.copyright}>Brought to you by <a href="https://twitter.com/lumy" target="_blank">@lumy</a> & friends.</p>
      </main>
    </>
  )
}
