import MainPageNav from "./MainPageNav";
import MainpageFooter from "./MainpageFooter";

function Boardingservice() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <MainPageNav />
      <div
        style={{ marginLeft: "15%" }}
        className="container justify-center items-center max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl mt-10"
      >
        <section
          className="dark:bg-gray-800 dark:text-gray-100 justify-center"
          style={{ marginBottom: "5rem" }}
        >
          <div class="container justify-center items-center max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl mt-10 ml-50">
            <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <div>
                <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Pawgress proudly presents
                </p>
              </div>
              <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span class="relative inline-block">
                  <svg
                    viewBox="0 0 52 24"
                    fill="currentColor"
                    class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                  >
                    <defs></defs>
                    <rect
                      fill="url(#1d4040f3-9f3e-4ac7-b117-7d4009658ced)"
                      width="52"
                      height="24"
                    ></rect>
                  </svg>
                  <span class="relative">Boarding Services </span>
                </span>
              </h2>
              <p class="text-base text-gray-700 md:text-lg">
                The best in the Bay Area!
              </p>
            </div>
            {/* CONTENT */}
            <div class="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 class="text-2xl font-bold tracking-tight sm:text-3xl dark:text-gray-50">
                  State of the art boarding facility!
                </h3>
                <p class="mt-3 text-lg dark:text-gray-400">
                  Some content here describing how nice the boarding is
                  blahblahbalhabalhablaha
                </p>
                <div class="mt-12 space-y-12">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h4 class="text-lg font-medium leading-6 dark:text-gray-50">
                        Cleanliness
                      </h4>
                      <p class="mt-2 dark:text-gray-400">
                        At Pawgress, we prioritize cleanliness, comfort, and a
                        wide range of amenities to ensure a pleasant and
                        enjoyable stay for your furry friend. Our facility is
                        meticulously maintained, with regular cleaning schedules
                        and strict hygiene protocols to create a clean and safe
                        environment.
                      </p>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h4 class="text-lg font-medium leading-6 dark:text-gray-50">
                        Comfort
                      </h4>
                      <p class="mt-2 dark:text-gray-400">
                        We understand the importance of comfort, which is why we
                        provide cozy bedding, spacious kennels, and
                        climate-controlled areas to ensure your dog feels right
                        at home.
                      </p>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="w-7 h-7"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h4 class="text-lg font-medium leading-6 dark:text-gray-50">
                        Amenities
                      </h4>
                      <p class="mt-2 dark:text-gray-400">
                        We offer various amenities such as indoor and outdoor
                        play areas, toys, and regular exercise opportunities to
                        keep your pet active and engaged during their stay. We
                        strive to provide a premium experience for your dog,
                        ensuring they receive the utmost care and attention
                        while you're away.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" class="mt-10 lg:mt-0">
                <img
                  src="https://media.istockphoto.com/id/516461357/photo/funny-pug-dog-in-the-dog-house.jpg?s=612x612&w=0&k=20&c=NxNn7dsl1yEd4vZMpNwDYPPxOIPIhJyPeh2eo0NM0hg="
                  alt=""
                  class="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <MainpageFooter />
    </div>
  );
}

export default Boardingservice;
