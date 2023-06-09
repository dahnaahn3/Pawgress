import "./training.css";
import MainPageNav from "./MainPageNav";
import MainpageFooter from "./MainpageFooter";

function Trainingservice() {

  return (
    <div className="flex flex-auto">
      <MainPageNav />
      <div className="px-5 py-5 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div
          className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
          style={{ marginLeft: "40%" }}
        >
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Pawgress proudly presents
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs></defs>
                <rect
                  fill="url(#1d4040f3-9f3e-4ac7-b117-7d4009658ced)"
                  width="52"
                  height="24"
                ></rect>
              </svg>
              <span className="relative">Training Classes </span>
            </span>
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            The best in the Bay Area!
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-x-60 gap-y-10">
          <div className="card">
            <img
              alt=""
              className="dogphoto"
              src="https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1133605325-scaled-e1617227898456.jpg"
            />
            <h1 className="classtitle">Puppy Training</h1>
            <h2 className="classsubtitle">10 wks to 5 months old </h2>
            <div className="card__inner">
              <p>
                Welcome to our puppy training class, where we lay the foundation
                for a lifetime of learning and good behavior for your adorable
                new addition! Our puppy training class is designed specifically
                for puppies aged 10 weeks to 5 months, which is a critical
                period for their socialization and development. In this class,
                we provide a safe and nurturing environment where your puppy can
                learn essential skills and behaviors while having a great time.
                Our experienced trainers are knowledgeable in puppy development
                and behavior, and they are committed to helping you and your
                puppy build a strong bond based on trust, respect, and positive
                reinforcement.
              </p>
            </div>
          </div>

          <div className="card">
            <img
              alt=""
              className="dogphoto"
              src="https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg"
            />
            <h1 className="classtitle">Beginner Training</h1>
            <h2 className="classsubtitle">5 months and up </h2>
            <div className="card__inner">
              <p>
                Welcome to our beginner training class, where we provide a solid
                foundation for training and behavior for dogs of all ages and
                breeds. Whether you have a young puppy or an adult dog, this
                class is designed to help you establish a strong bond with your
                furry companion and teach them essential obedience skills. Our
                experienced trainers understand that every dog is unique, and
                they are skilled at tailoring the training techniques to suit
                your dog's individual needs and personality. Our positive
                reinforcement-based approach focuses on building trust,
                strengthening communication, and fostering a positive learning
                environment for both you and your dog.
              </p>
            </div>
          </div>

          <div className="card">
            <img
              alt=""
              className="dogphoto"
              src="https://hips.hearstapps.com/hmg-prod/images/large-dog-breeds-lead-1550810820.jpg"
            />
            <h1 className="classtitle">Intermediate Training</h1>
            <h2 className="classsubtitle">6 months and up </h2>
            <div className="card__inner">
              <p>
                In our intermediate training class, we focus on building upon
                the skills your dog has already learned and introducing more
                advanced commands and behaviors. Our experienced trainers will
                guide you through a series of engaging and challenging exercises
                that will further strengthen your dog's obedience, focus, and
                impulse control. We reinforce & build on foundational behaviors
                while enhancing skills for real-world application.
                <br />
                Pre-req: Puppy or Beginner Training
              </p>
            </div>
          </div>

          <div className="card">
            <img
              alt=""
              className="dogphoto"
              src="https://thumbs.dreamstime.com/b/barking-doberman-12431875.jpg"
            />
            <h1 className="classtitle">Behavioral Modification</h1>
            <div className="card__inner">
              <p>
                In our behavior modification class, we take a personalized
                approach to address your dog's specific needs including dog
                aggression, human aggression, anxiety, OCD and more. We begin by
                conducting a thorough assessment of your dog's behavior,
                considering their triggers, reactions, and overall temperament.
                This assessment allows us to develop a tailored training plan
                that targets the root causes of the behavior issues.
              </p>
            </div>
          </div>
          <div className="card">
            <img
              alt=""
              className="dogphoto"
              src="https://3.bp.blogspot.com/_CezSYzAS5Ms/TIGsRHpnESI/AAAAAAAACMM/aRj7yQcEyRU/s1600/DSC09423.jpg"
            />
            <h1 className="classtitle"> Pawsome Tricks</h1>
            <div className="card__inner">
              <p>
                Throughout the course, your dog will learn a variety of tricks
                tailored to their abilities and personality. From basic tricks
                like sit, stay, and shake hands, to more advanced maneuvers like
                rolling over, playing dead, and even fetching specific items, we
                cover a wide range of tricks to keep your dog engaged and
                mentally stimulated.
              </p>
            </div>
          </div>
          <div className="card">
            <img
              alt=""
              className="dogphoto"
              src="https://4pawsins.com/wp-content/uploads/2018/08/dog_breed_groups_1200.jpg"
            />
            <h1 className="classtitle">Group Classes</h1>
            <div className="card__inner">
              <p>
                Welcome to our lively and engaging dog group class! If you're
                seeking a fun and social learning environment for your furry
                friend, look no further. Our dog group class is designed to
                provide a rewarding and educational experience for both you and
                your canine companion. In our group class, dogs of all breeds,
                sizes, and ages come together to learn and grow in a supportive
                community. Whether you have a playful puppy, an energetic
                adolescent, or a seasoned adult dog, our class is tailored to
                accommodate a variety of skill levels and training needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <MainpageFooter />
    </div>
  );
}

export default Trainingservice;
