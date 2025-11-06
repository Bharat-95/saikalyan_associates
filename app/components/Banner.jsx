import React from "react";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { AiOutlineYoutube } from "react-icons/ai";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineWhatsapp } from "react-icons/md";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
      }}
      className=" z-60 h-10 px-20 text-white lg:flex md:flex hidden items-center justify-between font-semibold text-[14px]"
    >
      <div className="flex gap-3 items-center">
        Follow Us On:
        <Link href="https://www.facebook.com/share/1GwBME8XvD/" target="_blank">
          <FaFacebookF className="w-4 h-4 hover:text-blue-800" />
        </Link>
     
        <Link href="https://www.instagram.com/shiva_drithi?igsh=dXdha2c0c3VvcjZn&utm_source=qr" target="_blank">
          <FaInstagram className="w-4 h-4 hover:text-pink-600" />
        </Link>
       
      
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <MdOutlineLocalPhone className="w-4 h-4" /> +91 8897203663
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineLocalPhone className="w-4 h-4" /> +91 9177305608
        </div>
      </div>
    </div>
  );
};

export default Banner;
