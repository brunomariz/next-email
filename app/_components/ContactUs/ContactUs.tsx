import React, { useEffect, useRef, useState } from "react";
import styles from "./ContactUs.module.css";

export const ContactUs = () => {
  const LOCAL_STORAGE_LAST_SENT_KEY = "emailjs_last_sent"; // Local storage key for last sent timestamp
  const TIMEOUT_BETWEEN_EMAILS = 1000 * 60 * 5; // Minimum time between emails in milliseconds
  enum SentStateOptions {
    NONE,
    SENT,
    ERROR,
    WAITING,
    LIMIT_REACHED,
  }
  const [sent, setSent] = useState<{ state: SentStateOptions; last: number }>({
    state: SentStateOptions.NONE,
    last: 0,
  });
  const form = useRef<HTMLFormElement>(null);

  // Update last email sent with localStorage data
  useEffect(() => {
    const last = localStorage.getItem(LOCAL_STORAGE_LAST_SENT_KEY);
    if (last != null) {
      setSent({ ...sent, last: Number(last) });
    } else {
      setSent({ ...sent, last: 0 });
    }
  }, []);

  const sendEmail = (timestamp: number) => {
    // Updates states and calls api to send email

    // Update sent state while waiting
    setSent({ ...sent, state: SentStateOptions.WAITING });

    // Convert form data into template_params object
    const formData = new FormData(form.current as HTMLFormElement);
    var template_params: { [index: string]: any } = {};
    formData.forEach((value, key) => (template_params[key] = value));
    // Call api to send email
    // Replace this fetch in case emailjs stops working
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send template params (form data)
      body: JSON.stringify({ template_params }),
    })
      // Parse api response
      .then((res) => res.json())
      // Handle api response
      .then((data) => {
        if (data.res == "OK") {
          // Update state and last timestamp
          setSent({ last: timestamp, state: SentStateOptions.SENT });
          localStorage.setItem(
            LOCAL_STORAGE_LAST_SENT_KEY,
            timestamp.toString()
          );
        } else {
          // Only update state, not timestamp
          console.log("Error sending email");
          setSent({ ...sent, state: SentStateOptions.ERROR });
        }
      });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const timestamp = new Date().getTime();

    if (timestamp - sent.last > TIMEOUT_BETWEEN_EMAILS) {
      sendEmail(timestamp);
    } else {
      setSent({ ...sent, state: SentStateOptions.LIMIT_REACHED });
    }
  };

  return (
    // Card
    <div className="bg-slate-800 text-white p-6 rounded-3xl shadow-slate-950 shadow-sm min-w-96 min-h-96 flex flex-col justify-center relative">
      {/* Content of card */}

      <>
        {/* Error message. Shown on top of form */}
        {sent.state == SentStateOptions.ERROR && (
          <div className="absolute top-0 left-0 w-[90%] bg-red-950 bg-opacity-95 m-4 p-[5%] rounded-md text-center">
            Error sending email. Please try again or contact us directly at the
            addresses provided on the page
          </div>
        )}
        {/* Email limit message. Shown on top of form. */}
        {sent.state == SentStateOptions.LIMIT_REACHED && (
          <div className="absolute top-0 left-0 w-[90%] bg-amber-800 bg-opacity-95 m-4 p-[5%] rounded-md text-center">
            Please wait some tome before sending the next email.
          </div>
        )}
        {/* Email sent message. Shown in place of form. */}
        {sent.state == SentStateOptions.SENT ? (
          <div className="text-center text-xl">
            <h2 className="text-3xl p-10 w-full text-center">
              Thank you for contacting us!
            </h2>
            <p>Our team will be in touch as soon as</p>
            possible.
          </div>
        ) : (
          // Contact form. Shown if state is not SENT
          <>
            <h2 className="text-3xl p-10 w-full text-center">Contact</h2>
            <form ref={form} onSubmit={onFormSubmit} className="flex flex-col">
              {/* Extra form inputs to use as variable on emailjs template e.g. company_name */}
              <input
                className="mb-4 hidden"
                type="text"
                name="extra_variable"
                value={"Business Name"}
              />
              {/* Actual user form inputs */}
              <label>Name *</label>
              <input
                className="mb-4 text-slate-950"
                type="text"
                name="user_name"
                required
              />
              <label>Email *</label>
              <input
                className="mb-4 text-slate-950"
                type="email"
                name="user_email"
                required
              />
              <label>Message *</label>
              <textarea
                className="mb-4 text-slate-950"
                name="message"
                required
              />
              {/* Wrapping button to place blinking indicators and centering*/}
              <div className="relative mx-auto">
                {/* Send 'button' */}
                <input
                  className="border-slate-50 border-2 rounded-md w-fit mx-auto p-2"
                  type="submit"
                  value="Send"
                />
                {/* Loading indicator (blink) */}
                {sent.state == SentStateOptions.WAITING && (
                  <div className="absolute left-full top-1/3 flex w-11 mx-3 justify-between">
                    <div
                      className={`bg-white w-2 h-2 rounded-full animate-ping ${styles.animDelay0}`}
                    ></div>
                    <div
                      className={`bg-white w-2 h-2 rounded-full animate-ping ${styles.animDelay250}`}
                    ></div>
                    <div
                      className={`bg-white w-2 h-2 rounded-full animate-ping ${styles.animDelay500}`}
                    ></div>
                  </div>
                )}
              </div>
            </form>
          </>
        )}
      </>
    </div>
  );
};
