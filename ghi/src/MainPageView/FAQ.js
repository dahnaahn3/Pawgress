import React from "react";
import MainPageNav from "./MainPageNav";

function FAQ() {
  return (
    <>
      <MainPageNav />
      <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-screen w-full">
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
    </>
  );
}

export default FAQ;
