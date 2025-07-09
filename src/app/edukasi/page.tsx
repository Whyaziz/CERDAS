"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FaChild,
  FaAppleAlt,
  FaChartLine,
  FaShieldAlt,
  FaHandHoldingWater,
} from "react-icons/fa";

export default function EdukasiPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <main className="min-h-screen bg-off-white px-4 md:px-6 py-12 text-gray-800">
      <div
        ref={sectionRef}
        className="max-w-5xl mx-auto space-y-12 pt-[20%] md:pt-[15%] lg:pt-[5%]"
      >
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-moss-green">
            Ketahui Lebih Tentang Gizi Anak dan Stunting
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Berdasarkan Kementerian Kesehatan Republik Indonesia. (2016){" "}
          </p>
        </header>

        {/* Apa itu Stunting - Card Layout */}
        <section className="bg-white rounded-lg shadow-md p-6 border-l-4 border-moss-green">
          <div className="flex items-start">
            <div className="h-full items-start">
              <FaChild className="text-moss-green mr-4 text-3xl" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-moss-green">
                Apa Itu Stunting?
              </h2>
              <p className="text-justify">
                Stunting adalah masalah kurang gizi kronis yang disebabkan oleh
                asupan gizi yang kurang dalam waktu cukup lama akibat pemberian
                makanan yang tidak sesuai dengan kebutuhan gizi. Stunting dapat
                terjadi mulai janin masih dalam kandungan dan baru nampak saat
                anak berusia dua tahun (Kementerian Kesehatan Republik
                Indonesia, 2016). Stunting dan kekurangan gizi lainnya yang
                terjadi pada 1.000 HPK tidak hanya menyebabkan hambatan
                pertumbuhan fisik dan meningkatkan kerentanan terhadap penyakit,
                tetapi juga mengancam perkembangan kognitif yang akan
                berpengaruh pada tingkat kecerdasan saat ini dan produktivitas
                anak di masa dewasanya.
              </p>
            </div>
          </div>
        </section>

        {/* Penyebab dan Bahaya - Two Column Card */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-moss-green flex items-center">
            <FaChartLine className="mr-2" /> Penyebab & Dampak Stunting
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-700">
                Penyebab Utama:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Asupan gizi tidak adekuat (kuantitas, kualitas, dan keragaman)
                </li>
                <li>Pola asuh yang tidak responsif terhadap kebutuhan anak</li>
                <li>Sanitasi dan kebersihan lingkungan yang buruk</li>
                <li>Infeksi berulang dan penyakit kronis</li>
                <li>
                  Akses terbatas ke layanan kesehatan dan pemantauan pertumbuhan
                </li>
                <li>Ketahanan pangan keluarga yang rendah</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-700">
                Dampak Jangka Panjang:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Penurunan perkembangan kognitif dan kapasitas belajar</li>
                <li>Sistem imunitas tubuh yang lebih rendah</li>
                <li>
                  Risiko lebih tinggi terkena penyakit tidak menular (diabetes,
                  hipertensi)
                </li>
                <li>Penurunan produktivitas dan kapasitas kerja saat dewasa</li>
                <li>
                  Dampak ekonomi pada tingkat individu, keluarga, dan nasional
                </li>
                <li>Risiko kehamilan berisiko tinggi pada anak perempuan</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pencegahan - Card with Icons */}
        <section className="bg-white rounded-lg shadow-md p-6 border-l-4 border-light-sage">
          <h2 className="text-2xl font-semibold mb-4 text-moss-green flex items-center">
            <FaShieldAlt className="mr-2" /> Intervensi Pencegahan Stunting
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Intervensi Gizi Spesifik:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    01
                  </span>
                  <span>Pemberian ASI eksklusif selama 6 bulan pertama</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    02
                  </span>
                  <span>MPASI bergizi seimbang setelah usia 6 bulan</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    03
                  </span>
                  <span>
                    Suplementasi vitamin A, tablet tambah darah untuk ibu hamil
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    04
                  </span>
                  <span>Imunisasi lengkap sesuai jadwal</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    05
                  </span>
                  <span>Pemantauan pertumbuhan rutin di Posyandu</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Intervensi Gizi Sensitif:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    01
                  </span>
                  <span>Penyediaan air bersih dan sanitasi yang baik</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    02
                  </span>
                  <span>Akses ke layanan kesehatan berkualitas</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    03
                  </span>
                  <span>Edukasi pengasuhan responsif dan stimulasi dini</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    04
                  </span>
                  <span>Ketahanan pangan keluarga dan keragaman pangan</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-light-sage text-moss-green rounded-full p-1 mr-2 text-xs">
                    05
                  </span>
                  <span>Program perlindungan sosial untuk keluarga rentan</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Gizi Seimbang - New Section */}
        <section className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex items-start">
            <FaAppleAlt className="text-3xl text-amber-500 mr-4 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-moss-green">
                Gizi Seimbang untuk Anak
              </h2>
              <p className="mb-4">
                Pola makan gizi seimbang menurut Permenkes No. 20 Tahun 2020
                mencakup:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-medium text-amber-700">Makronutrien</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Karbohidrat (45-65% kebutuhan energi)</li>
                    <li>• Protein (10-15% kebutuhan energi)</li>
                    <li>• Lemak (20-35% kebutuhan energi)</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-700">
                    Mikronutrien Penting
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Zat besi, Zinc, dan Kalsium</li>
                    <li>• Vitamin A, C, D, dan Folat</li>
                    <li>• Yodium dan mineral lainnya</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700">Sumber Pangan</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Makanan pokok (nasi, umbi)</li>
                    <li>• Lauk pauk (ikan, telur, daging)</li>
                    <li>• Sayuran dan buah beragam warna</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm italic">
                Perhatikan kebutuhan gizi harian anak sesuai usia, berat badan,
                aktivitas fisik, dan kondisi kesehatan.
              </p>
            </div>
          </div>
        </section>

        {/* Pengukuran Gizi */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3 text-moss-green flex items-center">
            <FaHandHoldingWater className="mr-2" /> Cara Mengukur Status Gizi
            Anak
          </h2>
          <p className="text-justify mb-4">
            Berdasarkan Permenkes No. 20 Tahun 2020, status gizi anak dinilai
            menggunakan pengukuran antropometri yang distandarisasi dengan nilai
            z-score:
          </p>
          <div className="overflow-x-auto bg-gray-50 rounded-lg p-2">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-light-sage">
                <tr>
                  <th className="p-3 text-left border border-gray-300 rounded-tl-lg">
                    Indikator
                  </th>
                  <th className="p-3 text-left border border-gray-300">
                    Ukuran
                  </th>
                  <th className="p-3 text-left border border-gray-300 rounded-tr-lg">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border border-gray-300 font-medium">
                    BB/U
                  </td>
                  <td className="p-3 border border-gray-300">
                    Berat badan menurut umur
                  </td>
                  <td className="p-3 border border-gray-300">
                    Menggambarkan status gizi secara umum
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 bg-gray-50">
                  <td className="p-3 border border-gray-300 font-medium">
                    TB/U
                  </td>
                  <td className="p-3 border border-gray-300">
                    Tinggi badan menurut umur
                  </td>
                  <td className="p-3 border border-gray-300">
                    <strong>Indikator stunting</strong> - menggambarkan status
                    gizi kronis
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border border-gray-300 font-medium">
                    BB/TB
                  </td>
                  <td className="p-3 border border-gray-300">
                    Berat badan menurut tinggi badan
                  </td>
                  <td className="p-3 border border-gray-300">
                    Menggambarkan status gizi saat ini (akut)
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 bg-gray-50">
                  <td className="p-3 border border-gray-300 font-medium">
                    IMT/U
                  </td>
                  <td className="p-3 border border-gray-300">
                    Indeks Massa Tubuh menurut umur
                  </td>
                  <td className="p-3 border border-gray-300">
                    Mendeteksi kurus dan gemuk pada anak
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Kategori Z-Score */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3 text-moss-green">
            Kategori Status Gizi Anak (Z-Score)
          </h2>
          <p className="mb-4">
            Pengklasifikasian status gizi anak berdasarkan nilai Z-Score sesuai
            dengan standar WHO dan Permenkes No. 20/2020:
          </p>
          <div className="overflow-x-auto bg-gray-50 rounded-lg p-2">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-light-sage">
                <tr>
                  <th className="p-3 text-left border border-gray-300">
                    Z-Score
                  </th>
                  <th className="p-3 text-left border border-gray-300">BB/U</th>
                  <th className="p-3 text-left border border-gray-300">TB/U</th>
                  <th className="p-3 text-left border border-gray-300">
                    BB/TB atau IMT/U
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 bg-red-50">
                  <td className="p-3 border border-gray-300">Z &lt; -3 SD</td>
                  <td className="p-3 border border-gray-300 font-medium text-red-700">
                    Gizi Buruk
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-red-700">
                    Sangat Pendek
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-red-700">
                    Sangat Kurus
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 bg-amber-50">
                  <td className="p-3 border border-gray-300">
                    -3 SD ≤ Z &lt; -2 SD
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-amber-700">
                    Gizi Kurang
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-amber-700">
                    Pendek
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-amber-700">
                    Kurus
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 bg-green-50">
                  <td className="p-3 border border-gray-300">
                    -2 SD ≤ Z ≤ +1 SD
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-green-700">
                    Normal
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-green-700">
                    Normal
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-green-700">
                    Normal
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 bg-blue-50">
                  <td className="p-3 border border-gray-300">
                    +1 SD &lt; Z ≤ +2 SD
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-blue-700">
                    Risiko Gizi Lebih
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-blue-700">
                    Normal
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-blue-700">
                    Risiko Gemuk
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 bg-purple-50">
                  <td className="p-3 border border-gray-300">Z &gt; +2 SD</td>
                  <td className="p-3 border border-gray-300 font-medium text-purple-700">
                    Gizi Lebih
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-purple-700">
                    Tinggi
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-purple-700">
                    Gemuk
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600 italic">
            Catatan: Pemantauan status gizi anak secara rutin sangat penting
            untuk deteksi dini dan intervensi yang tepat.
          </p>
        </section>

        {/* Referensi */}
        <section className="text-sm text-gray-600 border-t pt-4">
          <p>
            Sumber: Permenkes No. 20 Tahun 2020 tentang Klasifikasi dan Standar
            Status Gizi Anak
          </p>
        </section>
      </div>
    </main>
  );
}
