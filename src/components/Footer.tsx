import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "Beranda", path: "/" },
    { label: "Cek Status Gizi", path: "/cek-status-gizi-anak" },
    { label: "Ketahui Lebih", path: "/edukasi" },
    { label: "Tentang", path: "/tentang-cerdas" },
  ];

  return (
    <footer className="bg-moss-green text-white py-6 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="font-bold text-xl mb-3">
              CERDAS
            </Link>
            <p className="text-sm text-gray-200 max-w-xs">
              Aplikasi monitoring status gizi anak untuk kesehatan yang lebih
              baik
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-3">Navigasi</h3>
            <div className="flex flex-row flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  className="text-gray-200 hover:text-white hover:underline text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Logos */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-3">Dipersembahkan Oleh</h3>
            <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3">
              <Image
                src="/assets/layout/Lambang-UGM.png"
                alt="Logo UGM"
                width={50}
                height={50}
                className="bg-white rounded-full p-1 object-contain"
              />
              <Image
                src="/assets/layout/Logo-KKN.png"
                alt="Logo KKN"
                width={50}
                height={50}
                className="bg-white rounded-full p-1 object-contain"
              />
              <Image
                src="/assets/layout/Logo-PijakKaranganom-nobg.png"
                alt="Logo Pijak Karanganom"
                width={50}
                height={50}
                className="bg-white rounded-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-6 pt-4 text-center">
          <p className="text-gray-200 text-sm">
            © {year} Pos Gizi Cerdas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
