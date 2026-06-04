import React from "react";
import { assets} from '../assets/assets';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* --------Left Section ----- */}

        <div>
            <img className="mb-5 w-40" src={assets.logo} alt="" />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">Find the right specialist, check real‑time availability, and book secure appointments from the comfort of your home. Our platform helps you connect with trusted doctors for safe, timely, and convenient care, but it does not replace medical emergencies or your personal physician’s advice.
            </p>
        </div>

        {/* -------- Center Section  ----- */}
        <div>
               <p className='text-xl font-medium mb-5'>Company</p>
               <ul className="flex flex-col gap-2 text-gray-600 ">
                <li>Home</li>
                <li>About us </li>
                <li>Contact us </li>
                <li> Privacy policy </li>
               </ul>
        </div>
        {/* --------Right  Section ----- */}
        <div>
                <p className='text-xl font-medium mb-5' >GET IN TOUCH </p>
                <ul>
                  <li>8279895022</li>
                  <li>aky9842@gmail.com</li>
                </ul>
        </div>
      </div>

      {/* ----- CopyRight text ------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center ">Copyright 2026@ Prescripto . All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
