"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function TentangPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <main className="min-h-screen bg-off-white px-6 py-12 text-gray-800 pt-[20%] md:pt-[15%] lg:pt-[8%]">
      <div ref={sectionRef} className="max-w-3xl mx-auto flex flex-col gap-10">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-moss-green mb-2">
            Tentang CERDAS
          </h1>
          <p className="text-gray-600 text-sm">
            Cek Elektronik Rekomendasi dan Analisis Stunting
          </p>
        </header>

        {/* Deskripsi Umum */}
        <section className="space-y-4">
          <p className="text-justify">
            <strong>CERDAS</strong> adalah sebuah website interaktif yang
            dirancang untuk membantu orang tua dan pengasuh anak balita dalam
            memantau status gizi anak secara mandiri, cepat, dan akurat. Dengan
            menggunakan indikator antropometri yang telah ditetapkan oleh
            Kementerian Kesehatan melalui{" "}
            <strong>Permenkes No. 2 Tahun 2020</strong>, CERDAS menghitung
            z-score status gizi anak serta memberikan rekomendasi asupan gizi
            dan contoh pola makan yang sesuai.
          </p>
          <p className="text-justify">
            CERDAS dapat digunakan oleh masyarakat umum secara gratis dan mudah,
            baik melalui perangkat komputer maupun ponsel pintar. Tujuannya
            adalah untuk meningkatkan kesadaran dan peran aktif keluarga dalam
            mencegah stunting sejak dini, khususnya pada masa 1.000 Hari Pertama
            Kehidupan (HPK).
          </p>
        </section>

        {/* Asal Pengembangan */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-moss-green">
            Inisiatif oleh Mahasiswa KKN-PPM UGM 2025
          </h2>
          <p className="text-justify">
            CERDAS dikembangkan oleh{" "}
            <strong>Tim KKN-PPM Universitas Gadjah Mada 2025 Periode II</strong>{" "}
            sebagai bentuk pengabdian kepada masyarakat di bidang kesehatan
            masyarakat, teknologi informasi, dan edukasi. Website ini hadir
            sebagai upaya kolaboratif untuk membantu pemerintah dan masyarakat
            dalam menurunkan angka stunting di Indonesia.
          </p>
          <p className="text-justify">
            Seluruh konten dan data acuan yang digunakan dalam platform ini
            merujuk pada pedoman resmi pemerintah, khususnya dari{" "}
            <strong>
              Permenkes No. 2 Tahun 2020 tentang Standar Antropometri Anak
            </strong>
            , serta didesain dengan pendekatan edukatif yang mudah dipahami oleh
            masyarakat awam.
          </p>
        </section>

        {/* Tujuan & Manfaat */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-moss-green">
            Tujuan CERDAS
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Memberikan akses informasi gizi anak secara digital dan cepat
            </li>
            <li>
              Mempermudah orang tua dalam memantau tumbuh kembang anak balita
            </li>
            <li>
              Meningkatkan kesadaran masyarakat tentang pencegahan stunting
            </li>
            <li>Mendorong intervensi gizi secara tepat sesuai rekomendasi</li>
          </ul>
        </section>

        {/* Penutup */}
        <section>
          <p className="italic text-sm text-center text-gray-500">
            "Cegah stunting dimulai dari rumah — dari perhatian, kasih sayang,
            dan pengetahuan yang tepat."
          </p>
        </section>
      </div>
    </main>
  );
}
