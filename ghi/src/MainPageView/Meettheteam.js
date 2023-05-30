import MainPageNav from "./MainPageNav";
import MainpageFooter from "./MainpageFooter";

function Meettheteam() {
  return (
    <div>
      <MainPageNav />
      <div class="flex items-center justify-center min-h-screen bg-white py-48">
        <div class="flex flex-col" style={{ marginLeft: "13rem" }}>
          <div class="flex flex-col mt-8">
            <div class="container max-w-7xl px-4">
              <div class="flex flex-wrap justify-center text-center mb-24">
                <div class="w-full lg:w-6/12 px-4">
                  <h1 class="text-gray-900 text-4xl font-bold mb-8">
                    Meet the Team
                  </h1>

                  <p class="text-gray-700 text-lg font-light">
                    "Welcome to our family of pet boarding business founders!
                    Bonded by passion around our furry friends, we are dedicated
                    to creating a home away from home, one bark and purr at a
                    time. Join us in this rewarding endeavor as we build a haven
                    where your pets feel pampered, cherished, and fully at home.
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap">
                {/* <!-- Member #1 --> */}
                <div class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div class="flex flex-col">
                    <a href="#" class="mx-auto">
                      <img
                        class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80"
                      />
                    </a>

                    <div class="text-center mt-6">
                      <h1 class="text-gray-900 text-xl font-bold mb-1">
                        Dahna Ahn
                      </h1>
                      <div class="text-gray-700 font-light mb-2">
                        Dedicated dog mom
                      </div>

                      <div
                        class="flex items-center justify-center opacity-50 hover:opacity-100
                                          transition-opacity duration-300"
                      >
                        <a
                          href="https://www.linkedin.com/in/d-ahn9945/?trk=public_profile_browsemap"
                          class="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <i class="mdi mdi-linkedin text-indigo-500 mx-auto mt-2"></i>
                        </a>

                        <a
                          href="#"
                          class="flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <i class="mdi mdi-twitter text-blue-300 mx-auto mt-2"></i>
                        </a>

                        <a
                          href="#"
                          class="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <i class="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Member #2 --> */}
                <div class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div class="flex flex-col">
                    <a href="#" class="mx-auto">
                      <img
                        class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src="https://images.unsplash.com/photo-1634896941598-b6b500a502a7?fit=clamp&w=400&h=400&q=80"
                      />
                    </a>

                    <div class="text-center mt-6">
                      <h1 class="text-gray-900 text-xl font-bold mb-1">
                        Jennifer Ho
                      </h1>

                      <div class="text-gray-700 font-light mb-2">
                        Canine companion
                      </div>

                      <div
                        class="flex items-center justify-center opacity-50 hover:opacity-100
                                          transition-opacity duration-300"
                      >
                        <a
                          href="https://www.linkedin.com/in/jenniferho12/"
                          class="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <i class="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                        </a>

                        <a
                          href="#"
                          class="flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <i class="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                        </a>

                        <a
                          href="#"
                          class="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <i class="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div class="flex flex-col">
                    <a href="#" class="mx-auto">
                      <img
                        class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src="https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?fit=clamp&w=400&h=400&q=80"
                      />
                    </a>

                    <div class="text-center mt-6">
                      <h1 class="text-gray-900 text-xl font-bold mb-1">
                        Jesse Preble
                      </h1>

                      <div class="text-gray-700 font-light mb-2">
                        Cuddly cat guardian
                      </div>

                      <div
                        class="flex items-center justify-center opacity-50 hover:opacity-100
                                          transition-opacity duration-300"
                      >
                        <a
                          href="https://www.linkedin.com/in/jessepreble/"
                          class="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <i class="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                        </a>

                        <a
                          href="#"
                          class="flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <i class="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                        </a>

                        <a
                          href="#"
                          class="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <i class="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                  <div class="flex flex-col">
                    <a href="#" class="mx-auto">
                      <img
                        class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                        src="https://images.unsplash.com/photo-1635003913011-95971abba560?fit=clamp&w=400&h=400&q=80"
                      />
                    </a>

                    <div class="text-center mt-6">
                      <h1 class="text-gray-900 text-xl font-bold mb-1">
                        Stephen Zhu
                      </h1>

                      <div class="text-gray-700 font-light mb-2">
                        Proud dog owner
                      </div>

                      <div
                        class="flex items-center justify-center opacity-50 hover:opacity-100
                                          transition-opacity duration-300"
                      >
                        <a
                          href="https://www.linkedin.com/in/stephenzhu67/"
                          class="flex rounded-full hover:bg-indigo-50 h-10 w-10"
                        >
                          <i class="mdi mdi-linkedin text-indigo-700 mx-auto mt-2"></i>
                        </a>

                        <a
                          href="#"
                          class="flex rounded-full hover:bg-blue-50 h-10 w-10"
                        >
                          <i class="mdi mdi-twitter text-blue-400 mx-auto mt-2"></i>
                        </a>

                        <a
                          href="#"
                          class="flex rounded-full hover:bg-orange-50 h-10 w-10"
                        >
                          <i class="mdi mdi-instagram text-orange-400 mx-auto mt-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainpageFooter />
    </div>
  );
}

export default Meettheteam;
