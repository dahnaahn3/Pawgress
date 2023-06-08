import MainPageNav from "./MainPageNav"
import MainpageFooter from "./MainpageFooter"
import React, { useState } from "react";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils.js";


function Donation(){
      const [number, setNumber] = useState("");
      const [name, setName] = useState("");
      const [expiry, setExpiry] = useState("");
      const [cvc, setCvc] = useState("");
      const [focused, setFocused] = useState("");
      const [formData, setFormData] = useState(null);

        const handleInputFocus = ({ target }) => {
          setFocused(target.name);
        };
          const handleInputChange = ({ target }) => {
            if (target.name === "number") {
              target.value = formatCreditCardNumber(target.value);
              setNumber(target.value);
            } else if (target.name === "expiry") {
              target.value = formatExpirationDate(target.value);
              setExpiry(target.value);
            } else if (target.name === "cvc") {
              target.value = formatCVC(target.value);
              setCvc(target.value);
            } else if (target.name === "name") {
              setName(target.value);
            } else {
              setFormData({ ...formData, [target.name]: target.value });
            }
          };

          const handleSubmit = (e) => {
            e.preventDefault();
            const formElements = [...e.target.elements];
            const newFormData = formElements
              .filter((d) => d.name)
              .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
              }, {});

            setFormData(newFormData);
            e.target.reset();
          };
            const [currentCount, setCurrentCount] = useState(1);
            const subtotal = 5;

            const handlePlus = () => {
              setCurrentCount(currentCount + 1);
            };

            const handleMinus = () => {
              if (currentCount > 1) {
                setCurrentCount(currentCount - 1);
              }
            };


      function handleClick() {
        alert("Thank you for your donation! Have a pawesome day!"
        );
      }

    return (
      <div
        className=" flex flex-auto w-96"
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
          marginBottom: "5%"
        }}
      >
        <MainPageNav />
        <div key="Payment">
          <div className="App-payment"></div>
        </div>
        <div>
          <section
            id="login"
            className="p-4 flex flex-col justify-center min-h-screen max-w-2xl mx-auto"
          >
            <div className="p-6 bg-sky-100 rounded">
              <div className="flex items-center justify-center font-black m-3 mb-12">
                <svg
                  className="h-10 w-10 mr-3 text-red-600 animate-pulse"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1 className="tracking-wide text-3xl text-gray-900">
                  Buy a Dog a Bone
                </h1>
              </div>
              <h2 className=" text-center mb-7">
                Join our community of compassionate animal lovers today and help
                us provide vaccinations to shelter dogs. With a small donation
                of $5, you can make a difference and protect these deserving
                animals, ensuring their safety, health, and happiness. Together,
                we can create a brighter future for shelter dogs, one
                vaccination at a time.
              </h2>

              <form
                id="login_form"
                onSubmit={handleSubmit}
                className="flex flex-col justify-center"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="inline-flex items-center self-start">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/pastel-glyph/64/dog-heart--v2.png"
                      alt="dog-heart--v2"
                    />
                    <span className="font-bold text-gray-900">$5</span>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleMinus}
                      className="bg-yellow-600 p-1.5 font-bold rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <input
                      id="item_count"
                      type="number"
                      value={currentCount}
                      className="max-w-[100px] font-bold font-mono py-1.5 px-2 mx-1.5 block border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                      onChange={(e) =>
                        setCurrentCount(parseInt(e.target.value))
                      }
                    />

                    <button
                      type="button"
                      onClick={handlePlus}
                      className="bg-green-600 p-1.5 font-bold rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <label className="text-sm font-medium">From</label>
                <input
                  className="mb-3 px-2 py-1.5 mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                  type="text"
                  name="username"
                  placeholder="Name"
                  required
                />

                <label className="text-sm font-medium">Card Number</label>
                <input
                  type="tel"
                  name="number"
                  className="mb-3 px-2 py-1.5 mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  pattern="[\d| ]{16,22}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <div className="flex">
                  <label
                    className="text-sm font-medium"
                    style={{ marginRight: "12.5rem" }}
                  >
                    Expiration Date
                  </label>
                  <label className="text-sm font-medium">CVC</label>
                </div>
                <div className="flex">
                  <input
                    type="tel"
                    name="expiry"
                    className="mb-3 px-2 py-1.5 mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                    placeholder="XX/XX"
                    pattern="\d\d/\d\d"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />

                  <input
                    type="password"
                    name="cvc"
                    className="mb-3 px-2 py-1.5 mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </div>

                <label className="text-sm font-medium">
                  Messages (optional)
                </label>
                <textarea
                  className="mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                  name="messages"
                  placeholder="Write something"
                  rows="5"
                ></textarea>
                <button
                  onClick={handleClick}
                  className="px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300"
                  type="submit"
                >
                  <span id="login_default_state">
                    Donate<span id="subtotal"> ${subtotal * currentCount}</span>
                  </span>
                </button>
              </form>
            </div>
          </section>
        </div>
        <MainpageFooter />
      </div>
    );
}

export default Donation;
