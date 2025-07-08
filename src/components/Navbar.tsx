"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import { useScroll } from "@/contexts/ScrollContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const activeSegment = useSelectedLayoutSegment();
  const { setAllowScroll } = useScroll();
  const links = [
    { label: "Beranda", path: "/", targetSegment: null },
    {
      label: "Cek Status Gizi",
      path: "/cek-status-gizi-anak",
      targetSegment: "cek-status-gizi-anak",
    },
    { label: "Ketahui Lebih", path: "/edukasi", targetSegment: "edukasi" },
    {
      label: "Tentang",
      path: "/tentang-cerdas",
      targetSegment: "tentang-cerdas",
    },
  ];

  // Disable scrolling when mobile menu is open
  useEffect(() => {
    setAllowScroll(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setAllowScroll]);

  useEffect(() => {
    const navbar = document.getElementById("navbar");

    const handleScroll = () => {
      if (isMobileMenuOpen) return; // Don't hide navbar when mobile menu is open

      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > scrollTop && currentScrollTop > 50) {
        gsap.to(navbar, { y: -100, duration: 0.5 });
      } else {
        gsap.to(navbar, { y: 0, duration: 0.5 });
      }
      setScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTop, isMobileMenuOpen]);

  // Handle mobile menu link clicks
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`bg-beige text-moss-green px-[10%] flex flex-col w-full fixed top-0 z-[9999] transition-colors duration-500 shadow-xl font-medium`}
    >
      <div className="flex flex-row justify-between items-center">
        <Link href="/">
          <Image
            height={1000}
            width={1000}
            src="/Logo-with-text.png"
            className="h-10 md:h-14 xl:h-18 w-auto cursor-pointer"
            alt="Logo"
          />
          {/* CERDAS */}
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex flex-row gap-6 items-center">
          {links.map((link) => (
            <Link
              className={`
              ${
                activeSegment === link.targetSegment
                  ? "font-bold"
                  : "hover:scale-110 transition-transform"
              }
            `}
              key={link.label}
              href={link.path}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Toggle Mobile */}
        <div className="lg:hidden">
          <Hamburger
            easing="ease-in"
            toggled={isMobileMenuOpen}
            toggle={setIsMobileMenuOpen}
            color={`#4F7942`}
            size={20}
            hideOutline={false}
          />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`flex flex-col lg:flex-row gap-6 py-4 ${
          scrollTop < 100 ? "bg-beige" : "bg-transparent"
        } ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        {links.map((link) => (
          <Link
            className={`
          ${
            activeSegment === link.targetSegment
              ? "border-b-2 border-moss-green"
              : "hover:scale-110 transition-transform"
          }
        `}
            key={link.label}
            href={link.path}
            onClick={handleMobileLinkClick}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
