

function MainPageCover(){
    return (
      <section
        class=" w-screen h-screen bg-cover bg-no-repeat bg-center bg-[url('https://images.ctfassets.net/4f3rgqwzdznj/4IPtB6YNbhB6VKcH5c5wwS/4ddf7ad3cc59e8af7bf18fad0f2f0156/golden_retriever_gray_cat-1027475322.jpg')] bg-gray-600 bg-blend-multiply"
        style={{ backgroundSize: "cover" }}
      >
        <div class="px-4 mx-auto max-w-screen-l text-center py-24 lg:py-80">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Welcome to Pawgress!
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            The #1 Training and Boarding Facility in the Bay Area
          </p>
        </div>
      </section>
    );
}
export default MainPageCover
