import "./mainpage.css";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

function MainPageContact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kidchne",
        "template_u7pdqeh",
        form.current,
        "7XXvhcs8p1omCTvqS"
      )
      .then(
        (result) => {
          e.target.reset();
          console.log(result.text);
          console.log("messtage sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section
      className="bg-white dark:bg-gray-900 flex-initial"
      style={{ marginBottom: "5rem" }}
    >
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <form action="#" className="space-y-8">
          <div className="flex flex-row">
            <div className="basis-1/2">
              <label
                htmlFor="user_email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="user_email"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="youremail@email.com"
                required
              />
            </div>
            <div className="basis-1/2">
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="contactbutton"
              style={{ backgroundColor: "#0b2c64" }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MainPageContact;
