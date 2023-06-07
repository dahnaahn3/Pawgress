import React from "react";
import MainPageNav from "./MainPageNav";
import MainpageFooter from "./MainpageFooter";

function FAQ() {
  return (
    <>
      <MainPageNav />
      <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-screen w-full mt-20">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-5xl mt-5 tracking-tight">FAQ</h2>
          <p className="text-neutral-500 text-xl mt-3">
            Frequently asked questions
          </p>
        </div>
        <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>
                  Are there any breed or size restrictions for dogs that can be
                  boarded or trained at your facility?
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                At our facility, we welcome dogs of all breeds and sizes. We
                believe that every dog deserves excellent care and training,
                regardless of their breed or size. Our team of experienced
                trainers and staff members is equipped to handle and cater to
                the needs of dogs of various breeds and sizes. We believe in
                providing a safe and inclusive environment for all dogs,
                promoting positive interactions and individualized attention.
                Whether your dog is a small Chihuahua or a large Great Dane,
                they will be treated with love, respect, and the utmost care
                throughout their stay at our boarding and training facility.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>
                  What qualifications and experience do your trainers have?
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                Our trainers stay updated with the latest training techniques
                and advancements in the field by attending workshops, seminars,
                and participating in continuing education programs. They are
                knowledgeable about positive reinforcement-based training
                methods, which emphasize reward-based techniques to encourage
                desired behaviors. We take pride in our trainers' expertise and
                their ability to tailor training programs to meet the specific
                needs of each dog. They are passionate about helping dogs reach
                their full potential and ensuring a positive and enriching
                training experience
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>
                  Can I receive updates or photos of my dog's progress during
                  their training program?
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                Absolutely! We understand how important it is for you to stay
                connected with your dog and track their progress during their
                training program. We provide regular updates and photos to keep
                you informed and involved in your dog's journey. Throughout your
                dog's training program, our trainers will maintain open lines of
                communication with you. They will provide progress reports,
                detailing the skills and behaviors your dog is learning and any
                milestones they have achieved. These updates can be shared
                through email, text messages, or even through a dedicated online
                platform, depending on your preference.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>
                  Can my furry friend bring their favorite toy or blanket from
                  home to make their stay even cozier?
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                Yes, absolutely! We understand the importance of comfort and
                familiarity for your furry friend. They are more than welcome to
                bring their favorite toy or blanket from home. Having familiar
                items can help them feel more relaxed and at ease during their
                stay with us. Just make sure to label their belongings with
                their name so we can keep track of them. We want to ensure that
                their stay is as comfortable and enjoyable as possible!
              </p>
            </details>
          </div>
        </div>
      </div>
      <MainpageFooter />
    </>
  );
}

export default FAQ;
