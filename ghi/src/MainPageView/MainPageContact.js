import './mainpage.css'

function MainPageContact(){
    return (
      <section class="bg-white dark:bg-gray-900 flex-initial" style={{marginBottom: "5rem"}}>
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <form action="#" class="space-y-8">
            <div class="flex flex-row">
              <div class="basis-1/2">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="youremail@email.com"
                  required
                />
              </div>
              <div class="basis-1/2">
                <label
                  for="subject"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <div class="text-center">
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
        {/* <div
          className="flex flex-col items-center mt-8"
          style={{ marginTop: "-3rem" }}
        >
          <img src="https://i.makeagif.com/media/12-01-2016/p1czkg.gif" />
        </div> */}
      </section>
    );
}

export default MainPageContact
