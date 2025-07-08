"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomePage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const whySection = useRef<HTMLDivElement>(null);
  const featuresSection = useRef<HTMLDivElement>(null);
  const ctaSection = useRef<HTMLDivElement>(null);

  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector("h1"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      );

      gsap.fromTo(
        heroRef.current.querySelector("p"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4 }
      );

      gsap.fromTo(
        heroRef.current.querySelector("div > div"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6 }
      );
    }
    if (whySection.current) {
      // Why section animation
      gsap.fromTo(
        whySection.current.querySelector("h2"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: whySection.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        whySection.current.querySelector("p"),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: whySection.current,
            start: "top 80%",
          },
        }
      );

      // Card animations
      const cards = whySection.current.querySelectorAll(".grid > div");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 90%",
          },
        }
      );
    }
    if (featuresSection.current) {
      // Features section animation
      gsap.fromTo(
        featuresSection.current.querySelector("h2"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: featuresSection.current,
            start: "top 80%",
          },
        }
      );

      const featureItems =
        featuresSection.current.querySelectorAll(".grid > div");
      gsap.fromTo(
        featureItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featureItems[0],
            start: "top 90%",
          },
        }
      );
    }
    if (ctaSection.current) {
      // CTA section animation
      gsap.fromTo(
        ctaSection.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ctaSection.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <main className="min-h-screen bg-off-white text-gray-800">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="w-full h-screen flex flex-col items-end justify-center bg-[url('/assets/home/bg-hero-1.jpg')] bg-cover bg-center"
      >
        <div className="w-full h-full bg-gradient-to-bl from-transparent to-black/90 flex flex-col items-start justify-center px-4 sm:px-[5%] md:px-[8%]">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 md:mb-4 text-moss-green">
            CERDAS
          </h1>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-white w-full sm:w-[80%] md:w-[70%] lg:w-[50%]">
            CERDAS adalah sebuah website interaktif yang dirancang untuk
            membantu orang tua mengevaluasi status gizi anak balita secara
            mandiri dengan mudah. Berdasarkan Permenkes No. 2 Tahun 2020, CERDAS
            menghitung status gizi anak melalui data berat dan tinggi badan,
            memberikan hasil dalam bentuk z-score, serta memberikan rekomendasi
            asupan dan contoh menu makanan sehat untuk mencegah risiko stunting
            sejak dini.
          </p>
          <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[50%] flex flex-col sm:flex-row justify-start gap-3 sm:gap-4">
            <a
              href="/cek-status-gizi-anak"
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-moss-green text-off-white font-semibold hover:opacity-90 transition text-center"
            >
              Cek Status Gizi Anak
            </a>
            <a
              href="/edukasi"
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-moss-green text-moss-green font-semibold hover:bg-moss-green/10 transition text-center mt-2 sm:mt-0"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>

      {/* Mengapa CERDAS */}
      <section
        ref={whySection}
        className="px-4 sm:px-6 py-12 sm:py-16 bg-off-white text-center flex flex-col justify-center items-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
          Mengapa Perlu Memantau Gizi Anak?
        </h2>
        <p className="mb-6 sm:mb-8 max-w-5xl text-justify">
          Di dalam setiap tawa dan langkah kecil anak kita, tersimpan sebuah
          mimpi besar—mimpi kita untuk melihatnya tumbuh menjadi pribadi yang
          cerdas, sehat, dan mampu meraih cita-citanya. Namun, terkadang ada
          <b> ancaman tak kasat mata</b> bernama <b>Stunting</b>, yang diam-diam
          bisa merenggut potensi emas itu tanpa kita sadari. Memantau gizi dan
          pertumbuhan anak bukanlah sekadar tugas menimbang badan atau mengukur
          tinggi. Ini adalah bahasa <b>cinta kita yang paling tulus</b>, cara
          kita 'mendengarkan' tubuh mungilnya untuk memastikan fondasi
          kehidupannya dibangun dengan kokoh. Jangan biarkan kita{" "}
          <b>terlambat</b>. Mari berikan perhatian itu sekarang, karena di
          setiap gram dan sentimeter pertumbuhannya, ada masa depan cemerlang si
          buah hati yang sedang kita perjuangkan.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div
            onClick={() =>
              handleNavigation(
                "https://puskesmasmeninting-dikes.lombokbaratkab.go.id/artikel/dampak-stunting-pada-masa-depan-anak"
              )
            }
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1 duration-300"
          >
            <Image
              src="/assets/home/berita-stunting-1.jpg"
              width={600}
              height={400}
              alt="Ilustrasi anak sehat"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-moss-green">
              Dampak Stunting Pada Masa Depan Anak
            </h3>
            <p className="text-sm text-gray-700 mb-2 text-justify">
              Beberapa penelitian menemukan bahwa anak dengan kondisi stunting
              memiliki kemampuan kognitif yang rendah....
            </p>
            <p className="text-xs text-gray-500 mt-auto self-end italic">
              Sumber: Puskesmas Meninting
            </p>
          </div>
          {/* Card 2 */}
          <div
            onClick={() =>
              handleNavigation(
                "https://umsu.ac.id/berita/bahaya-stunting-yang-sering-diabaikan-oleh-banyak-orang/"
              )
            }
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1 duration-300"
          >
            <Image
              src="/assets/home/berita-stunting-2.webp"
              width={600}
              height={400}
              alt="Ilustrasi anak sehat"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-moss-green">
              Bahaya Stunting yang Sering Diabaikan oleh Banyak Orang
            </h3>
            <p className="text-sm text-gray-700 mb-2 text-justify">
              Stunting adalah gangguan tumbuh kembang yang menyebabkan seorang
              anak memiliki tinggi badan lebih pendek dibandingkan anak-anak
              lain seusianya.....
            </p>
            <p className="text-xs text-gray-500 mt-auto self-end italic">
              Sumber: UMSU
            </p>
          </div>
          {/* Card 3 */}
          <div
            onClick={() =>
              handleNavigation(
                "https://puskesmasmeninting-dikes.lombokbaratkab.go.id/artikel/dampak-stunting-pada-masa-depan-anak"
              )
            }
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1 duration-300 sm:col-span-2 md:col-span-1"
          >
            <Image
              src="/assets/home/berita-stunting-3.jpg"
              width={600}
              height={400}
              alt="Ilustrasi anak sehat"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-moss-green">
              Waspadai Dampak Stunting Jangka Panjang
            </h3>
            <p className="text-sm text-gray-700 mb-2 text-justify">
              Stunting adalah keadaan yang dipicu oleh malnutrisi kronis dan
              ditandai dengan tinggi badan di bawah standar. Jika tidak
              ditangani dengan tepat, stunting bisa menghambat pertumbuhan dan
              perkembangan anak....
            </p>
            <p className="text-xs text-gray-500 mt-auto self-end italic">
              Sumber: Puskesmas Meninting
            </p>
          </div>
        </div>
      </section>

      {/* Fitur Utama */}
      <section
        ref={featuresSection}
        className="px-4 sm:px-6 py-12 sm:py-16 text-center bg-light-sage text-black"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
          Apa Saja yang Bisa Anda Lakukan di CERDAS?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto text-left">
          <div className="bg-white rounded-xl shadow p-5 sm:p-6 flex flex-col items-start transform hover:-translate-y-1 hover:shadow-lg duration-300">
            <Image
              src="/assets/home/1.svg"
              width={48}
              height={48}
              alt="Cek Status Gizi Anak"
              className="mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Cek Status Gizi Anak</h3>
            <p className="mb-4">
              Hitung z-score dan dapatkan rekomendasi gizi secara otomatis.
            </p>
            <a
              href="/cek-status-gizi-anak"
              className="text-moss-green font-medium hover:underline"
            >
              Coba Sekarang →
            </a>
          </div>
          <div className="bg-white rounded-xl shadow p-5 sm:p-6 flex flex-col items-start transform hover:-translate-y-1 hover:shadow-lg duration-300">
            <Image
              src="/assets/home/2.svg"
              width={48}
              height={48}
              alt="Ketahui Lebih"
              className="mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Ketahui Lebih</h3>
            <p className="mb-4">
              Edukasi penting seputar stunting, gizi seimbang, dan pola makan
              anak.
            </p>
            <a
              href="/edukasi"
              className="text-moss-green font-medium hover:underline"
            >
              Baca Edukasi →
            </a>
          </div>
          <div className="bg-white rounded-xl shadow p-5 sm:p-6 flex flex-col items-start transform hover:-translate-y-1 hover:shadow-lg duration-300 sm:col-span-2 md:col-span-1">
            <Image
              src="/assets/home/3.svg"
              width={48}
              height={48}
              alt="Tabel & Grafik Acuan"
              className="mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Tabel & Grafik Acuan</h3>
            <p className="mb-4">
              Lihat tabel pertumbuhan anak sesuai Permenkes No. 2 Tahun 2020.
            </p>
            <a
              href="/cek-status-gizi-anak#tabel"
              className="text-moss-green font-medium hover:underline"
            >
              Lihat Acuan →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Akhir */}
      <section
        ref={ctaSection}
        className="px-4 sm:px-6 py-12 sm:py-16 bg-off-white text-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          Mulai Cek Gizi Anak Anda Hari Ini
        </h2>
        <p className="mb-5 sm:mb-6">
          Cukup input data anak dan dapatkan hasil dalam hitungan detik.
        </p>
        <a
          href="/cek-status-gizi-anak"
          className="px-5 sm:px-6 py-2 sm:py-3 rounded-xl bg-moss-green text-white font-semibold hover:opacity-90 transition inline-block hover:shadow-lg transform hover:scale-105 duration-300"
        >
          Cek Sekarang
        </a>
      </section>
    </main>
  );
}
