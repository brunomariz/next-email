"use client";
import Image from "next/image";
import { ContactUs } from "./_components/ContactUs/ContactUs";

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ContactUs></ContactUs>
    </div>
  );
}
