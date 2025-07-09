"use client";

import { useState, useEffect } from "react";

interface HasilGizi {
  zscore: {
    bbu: number;
    tbu: number;
    bbtb: number;
  };
  kategori: {
    bbu: string;
    tbu: string;
    bbtb: string;
  };
}

interface StandardData {
  L: {
    bbu: { [age: number]: number[] };
    tbu: { [age: number]: number[] };
    bbtb: { [height: number]: number[] };
  };
  P: {
    bbu: { [age: number]: number[] };
    tbu: { [age: number]: number[] };
    bbtb: { [height: number]: number[] };
  };
}

// Initial empty data structure
const initialStandardData: StandardData = {
  L: { bbu: {}, tbu: {}, bbtb: {} },
  P: { bbu: {}, tbu: {}, bbtb: {} },
};

export default function CekStatusGiziPage() {
  const [form, setForm] = useState({
    usia: "",
    jenisKelamin: "",
    berat: "",
    tinggi: "",
  });

  const [hasil, setHasil] = useState<HasilGizi | null>(null);
  const [standardData, setStandardData] =
    useState<StandardData>(initialStandardData);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Function to fetch and parse the CSV data
    const fetchStandardData = async () => {
      try {
        const response = await fetch("/Table From Permenkes No. 2 th.2020.csv");
        const csvText = await response.text();

        const parsedData = parseCSVData(csvText);
        setStandardData(parsedData);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error loading standard data:", error);
      }
    };

    fetchStandardData();
  }, []);

  const parseCSVData = (csvText: string): StandardData => {
    const data: StandardData = {
      L: { bbu: {}, tbu: {}, bbtb: {} },
      P: { bbu: {}, tbu: {}, bbtb: {} },
    };

    const lines = csvText.split("\n");

    let malesBBU = false;
    let femalesBBU = false;
    let malesTBU = false;
    let femalesTBU = false;
    let malesBBTB = false;
    let femalesBBTB = false;

    // Add these counters to check if sections are detected
    let malesBBUCount = 0;
    let femalesBBUCount = 0;
    let malesTBUCount = 0;
    let femalesTBUCount = 0;
    let malesBBTBCount = 0;
    let femalesBBTBCount = 0;

    // Analyze the CSV structure
    console.log("Total lines in CSV:", lines.length);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines

      // Log a few lines to help with debugging
      if (i < 10 || (i > 60 && i < 75) || (i > 130 && i < 140)) {
        console.log(`Line ${i}: ${line.substring(0, 60)}...`);
      }

      // Check for combined header lines that contain both male and female data
      if (
        line.includes(
          "Standar Berat Badan menurut Umur (BB/U) Anak Laki-Laki"
        ) &&
        line.includes("Standar Berat Badan menurut Umur (BB/U) Anak Perempuan")
      ) {
        console.log("Found combined BB/U header at line", i);
        malesBBU = true;
        femalesBBU = true;
        malesTBU = false;
        femalesTBU = false;
        malesBBTB = false;
        femalesBBTB = false;
        continue;
      } else if (
        line.includes(
          "Standar Tinggi Badan menurut Umur (TB/U) Anak Laki-Laki"
        ) &&
        line.includes("Standar Tinggi Badan menurut Umur (TB/U) Anak Perempuan")
      ) {
        console.log("Found combined TB/U header at line", i);
        malesBBU = false;
        femalesBBU = false;
        malesTBU = true;
        femalesTBU = true;
        malesBBTB = false;
        femalesBBTB = false;
        continue;
      } else if (
        (line.includes(
          "Standar Berat Badan menurut Panjang Badan (BB/PB) Anak Laki-Laki"
        ) ||
          line.includes(
            "Standar Berat Badan menurut Tinggi Badan (BB/TB) Anak Laki-Laki"
          )) &&
        (line.includes(
          "Standar Berat Badan menurut Panjang Badan (BB/PB) Anak Perempuan"
        ) ||
          line.includes(
            "Standar Berat Badan menurut Tinggi Badan (BB/TB) Anak Perempuan"
          ))
      ) {
        console.log("Found combined BB/TB header at line", i);
        malesBBU = false;
        femalesBBU = false;
        malesTBU = false;
        femalesTBU = false;
        malesBBTB = true;
        femalesBBTB = true;
        continue;
      }
      // Keep the individual section checks as fallback
      else if (
        line.includes("Standar Berat Badan menurut Umur (BB/U) Anak Laki-Laki")
      ) {
        console.log("Found Male BB/U section at line", i);
        malesBBU = true;
        femalesBBU = false;
        malesTBU = false;
        femalesTBU = false;
        malesBBTB = false;
        femalesBBTB = false;
        continue;
      } else if (
        line.includes("Standar Berat Badan menurut Umur (BB/U) Anak Perempuan")
      ) {
        console.log("Found Female BB/U section at line", i);
        malesBBU = false;
        femalesBBU = true;
        malesTBU = false;
        femalesTBU = false;
        malesBBTB = false;
        femalesBBTB = false;
        continue;
      } else if (
        line.includes("Standar Tinggi Badan menurut Umur (TB/U) Anak Laki-Laki")
      ) {
        console.log("Found Male TB/U section at line", i);
        malesBBU = false;
        femalesBBU = false;
        malesTBU = true;
        femalesTBU = false;
        malesBBTB = false;
        femalesBBTB = false;
        continue;
      } else if (
        line.includes("Standar Tinggi Badan menurut Umur (TB/U) Anak Perempuan")
      ) {
        console.log("Found Female TB/U section at line", i);
        malesBBU = false;
        femalesBBU = false;
        malesTBU = false;
        femalesTBU = true;
        malesBBTB = false;
        femalesBBTB = false;
        continue;
      } else if (
        line.includes(
          "Standar Berat Badan menurut Panjang Badan (BB/PB) Anak Laki-Laki"
        ) ||
        line.includes(
          "Standar Berat Badan menurut Tinggi Badan (BB/TB) Anak Laki-Laki"
        )
      ) {
        console.log("Found Male BB/TB section at line", i);
        malesBBU = false;
        femalesBBU = false;
        malesTBU = false;
        femalesTBU = false;
        malesBBTB = true;
        femalesBBTB = false;
        continue;
      } else if (
        line.includes(
          "Standar Berat Badan menurut Panjang Badan (BB/PB) Anak Perempuan"
        ) ||
        line.includes(
          "Standar Berat Badan menurut Tinggi Badan (BB/TB) Anak Perempuan"
        )
      ) {
        console.log("Found Female BB/TB section at line", i);
        malesBBU = false;
        femalesBBU = false;
        malesTBU = false;
        femalesTBU = false;
        malesBBTB = false;
        femalesBBTB = true;
        continue;
      }

      const cells = line.split(",");

      // Parse males data
      if (malesBBU && cells.length > 11) {
        const age = Number(cells[4]);
        if (!isNaN(age) && age >= 0 && age <= 60) {
          data.L.bbu[age] = [
            Number(cells[5]),
            Number(cells[6]),
            Number(cells[7]),
            Number(cells[8]),
            Number(cells[9]),
            Number(cells[10]),
            Number(cells[11]),
          ];
          malesBBUCount++;
        }
      }

      // Parse females data - in the same loop, but with different column indices
      if (femalesBBU && cells.length > 20) {
        const age = Number(cells[13]);
        if (!isNaN(age) && age >= 0 && age <= 60) {
          data.P.bbu[age] = [
            Number(cells[14]),
            Number(cells[15]),
            Number(cells[16]),
            Number(cells[17]),
            Number(cells[18]),
            Number(cells[19]),
            Number(cells[20]),
          ];
          femalesBBUCount++;
        }
      }

      // Parse males TB/U data
      if (malesTBU && cells.length > 11) {
        const age = Number(cells[4]);
        if (!isNaN(age) && age >= 0 && age <= 60) {
          data.L.tbu[age] = [
            Number(cells[5]),
            Number(cells[6]),
            Number(cells[7]),
            Number(cells[8]),
            Number(cells[9]),
            Number(cells[10]),
            Number(cells[11]),
          ];
          malesTBUCount++;
        }
      }

      // Parse females TB/U data
      if (femalesTBU && cells.length > 20) {
        const age = Number(cells[13]);
        if (!isNaN(age) && age >= 0 && age <= 60) {
          data.P.tbu[age] = [
            Number(cells[14]),
            Number(cells[15]),
            Number(cells[16]),
            Number(cells[17]),
            Number(cells[18]),
            Number(cells[19]),
            Number(cells[20]),
          ];
          femalesTBUCount++;
        }
      }

      // Parse males BB/TB data
      if (malesBBTB && cells.length > 11) {
        const height = Number(cells[4]);
        if (!isNaN(height) && height >= 45 && height <= 120) {
          data.L.bbtb[height] = [
            Number(cells[5]),
            Number(cells[6]),
            Number(cells[7]),
            Number(cells[8]),
            Number(cells[9]),
            Number(cells[10]),
            Number(cells[11]),
          ];
          malesBBTBCount++;
        }
      }

      // Parse females BB/TB data
      if (femalesBBTB && cells.length > 20) {
        const height = Number(cells[13]);
        if (!isNaN(height) && height >= 45 && height <= 120) {
          data.P.bbtb[height] = [
            Number(cells[14]),
            Number(cells[15]),
            Number(cells[16]),
            Number(cells[17]),
            Number(cells[18]),
            Number(cells[19]),
            Number(cells[20]),
          ];
          femalesBBTBCount++;
        }
      }
    }

    // Log counts to help diagnose the issue
    console.log("Male BB/U entries:", malesBBUCount);
    console.log("Female BB/U entries:", femalesBBUCount);
    console.log("Male TB/U entries:", malesTBUCount);
    console.log("Female TB/U entries:", femalesTBUCount);
    console.log("Male BB/TB entries:", malesBBTBCount);
    console.log("Female BB/TB entries:", femalesBBTBCount);

    // Debugging: Log the parsed data to verify
    console.log("Parsed Male BB/U:", Object.keys(data.L.bbu).length);
    console.log("Parsed Female BB/U:", Object.keys(data.P.bbu).length);
    console.log("Parsed Male TB/U:", Object.keys(data.L.tbu).length);
    console.log("Parsed Female TB/U:", Object.keys(data.P.tbu).length);
    console.log("Parsed Male BB/TB:", Object.keys(data.L.bbtb).length);
    console.log("Parsed Female BB/TB:", Object.keys(data.P.bbtb).length);

    return data;
  };

  const calculateZScore = (
    value: number,
    type: "bbu" | "tbu" | "bbtb",
    gender: "L" | "P",
    ageOrHeight: number
  ): number => {
    // Get the reference data array
    const refData = standardData[gender][type][ageOrHeight];
    if (!refData || refData.length !== 7) {
      console.error(
        `Reference data not found for ${type}, ${gender}, ${ageOrHeight}`
      );
      return 0;
    }

    const median = refData[3]; // Index 3 is the median value

    if (value < median) {
      // If the value is less than median, use formula: (value - median) / (median - (-1SD))
      return (value - median) / (median - refData[2]);
    } else {
      // If the value is greater than median, use formula: (value - median) / ((+1SD) - median)
      return (value - median) / (refData[4] - median);
    }
  };

  const getClosestKey = (map: Record<number, any>, value: number): number => {
    // Get all keys and convert to numbers
    const keys = Object.keys(map).map(Number);

    // Find the closest key
    const closestKey = keys.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });

    return closestKey;
  };

  const getStatusFromZScore = (
    zscore: number,
    type: "bbu" | "tbu" | "bbtb"
  ): string => {
    if (type === "bbu") {
      if (zscore < -3)
        return "Berat badan sangat kurang (severely underweight)";
      if (zscore < -2) return "Berat badan kurang (underweight)";
      if (zscore <= 1) return "Berat badan normal";
      return "Risiko berat badan lebih";
    } else if (type === "tbu") {
      if (zscore < -3) return "Sangat pendek (severely stunted)";
      if (zscore < -2) return "Pendek (stunted)";
      if (zscore <= 3) return "Normal";
      return "Tinggi";
    } else {
      // bbtb
      if (zscore < -3) return "Gizi buruk (severely wasted)";
      if (zscore < -2) return "Gizi kurang (wasted)";
      if (zscore <= 1) return "Gizi baik (normal)";
      if (zscore <= 2)
        return "Berisiko gizi lebih (possible risk of overweight)";
      if (zscore <= 3) return "Gizi lebih (overweight)";
      return "Obesitas (obese)";
    }
  };

  const getStatusClass = (status: string): string => {
    if (
      status.includes("sangat kurang") ||
      status.includes("Sangat pendek") ||
      status.includes("Gizi buruk")
    ) {
      return "text-red-700 font-bold";
    }
    if (
      status.includes("kurang") ||
      status.includes("Pendek") ||
      status.includes("wasted")
    ) {
      return "text-yellow-600 font-bold";
    }
    if (
      status.includes("normal") ||
      status.includes("Normal") ||
      status.includes("baik")
    ) {
      return "text-green-600 font-bold";
    }
    return "text-blue-600 font-bold"; // For overweight/obesity cases
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!isDataLoaded) {
      alert("Data standar masih dimuat. Mohon tunggu sebentar.");
      return;
    }

    // Get form values and convert to numbers
    const age = parseInt(form.usia);
    const weight = parseFloat(form.berat);
    const height = parseFloat(form.tinggi);
    const gender = form.jenisKelamin as "L" | "P";

    if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender) {
      alert("Mohon lengkapi semua data dengan benar");
      return;
    }

    if (age < 0 || age > 60) {
      alert("Usia harus antara 0-60 bulan");
      return;
    }

    try {
      // Find the closest age in our data
      const closestAge = getClosestKey(standardData[gender].bbu, age);
      const closestHeight = getClosestKey(standardData[gender].bbtb, height);

      // Calculate Z-scores
      const bbuZscore = calculateZScore(weight, "bbu", gender, closestAge);
      const tbuZscore = calculateZScore(height, "tbu", gender, closestAge);
      const bbtbZscore = calculateZScore(weight, "bbtb", gender, closestHeight);

      // Round to 2 decimal places
      const roundedBBU = Math.round(bbuZscore * 100) / 100;
      const roundedTBU = Math.round(tbuZscore * 100) / 100;
      const roundedBBTB = Math.round(bbtbZscore * 100) / 100;

      // Get status categories
      const bbuStatus = getStatusFromZScore(roundedBBU, "bbu");
      const tbuStatus = getStatusFromZScore(roundedTBU, "tbu");
      const bbtbStatus = getStatusFromZScore(roundedBBTB, "bbtb");

      setHasil({
        zscore: {
          bbu: roundedBBU,
          tbu: roundedTBU,
          bbtb: roundedBBTB,
        },
        kategori: {
          bbu: bbuStatus,
          tbu: tbuStatus,
          bbtb: bbtbStatus,
        },
      });
    } catch (error) {
      console.error("Error calculating z-scores:", error);
      alert(
        "Terjadi kesalahan saat menghitung status gizi. Pastikan semua data sudah benar."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sage-50 to-sage-100 px-4 sm:px-6 py-[30%] md:py-[20%] lg:py-[8%] text-gray-800 bg-off-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-moss-green mb-8 text-center">
          Cek Status Gizi Anak
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
          Evaluasi status gizi anak berdasarkan standar antropometri Permenkes
          No. 2 tahun 2020
        </p>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6 border border-sage-200 transition-all hover:shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Usia (bulan)
              </label>
              <input
                name="usia"
                type="number"
                min="0"
                max="60"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-moss-green focus:border-moss-green transition-all"
                onChange={handleChange}
                value={form.usia}
                required
                placeholder="0-60 bulan"
              />
              <p className="text-xs text-gray-500">
                Sesuai Permenkes No. 2 th. 2020
              </p>
            </div>

            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Jenis Kelamin
              </label>
              <select
                name="jenisKelamin"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-moss-green focus:border-moss-green transition-all bg-white"
                onChange={handleChange}
                value={form.jenisKelamin}
                required
              >
                <option value="">-- Pilih --</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Berat Badan (kg)
              </label>
              <input
                name="berat"
                type="number"
                step="0.1"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-moss-green focus:border-moss-green transition-all"
                onChange={handleChange}
                value={form.berat}
                required
                placeholder="Contoh: 8.5"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Tinggi Badan (cm)
              </label>
              <input
                name="tinggi"
                type="number"
                step="0.1"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-moss-green focus:border-moss-green transition-all"
                onChange={handleChange}
                value={form.tinggi}
                required
                placeholder="Contoh: 75.0"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-moss-green text-white px-6 py-3 rounded-lg hover:bg-moss-green-600 disabled:opacity-50 transition-all transform hover:scale-[1.02] font-medium text-lg shadow-md"
              disabled={!isDataLoaded}
            >
              {isDataLoaded ? "Cek Status Gizi Sekarang" : "Memuat data..."}
            </button>
            {!isDataLoaded && (
              <div className="flex items-center justify-center mt-3 text-amber-600 space-x-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-sm">
                  Sedang memuat data referensi Permenkes No. 2 th. 2020...
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Hasil */}
        {hasil && (
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg border-t-4 border-moss-green animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-moss-green flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Hasil Evaluasi Status Gizi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-sage-50 p-4 rounded-xl border border-sage-200">
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Berat/Umur (BB/U)
                </div>
                <div className="text-xl font-bold">Z = {hasil.zscore.bbu}</div>
                <div
                  className={`mt-2 px-3 py-1 rounded-full inline-block ${getStatusClass(
                    hasil.kategori.bbu
                  )} bg-opacity-20`}
                >
                  {hasil.kategori.bbu}
                </div>
              </div>

              <div className="bg-sage-50 p-4 rounded-xl border border-sage-200">
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Tinggi/Umur (TB/U)
                </div>
                <div className="text-xl font-bold">Z = {hasil.zscore.tbu}</div>
                <div
                  className={`mt-2 px-3 py-1 rounded-full inline-block ${getStatusClass(
                    hasil.kategori.tbu
                  )} bg-opacity-20`}
                >
                  {hasil.kategori.tbu}
                </div>
              </div>

              <div className="bg-sage-50 p-4 rounded-xl border border-sage-200">
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Berat/Tinggi (BB/TB)
                </div>
                <div className="text-xl font-bold">Z = {hasil.zscore.bbtb}</div>
                <div
                  className={`mt-2 px-3 py-1 rounded-full inline-block ${getStatusClass(
                    hasil.kategori.bbtb
                  )} bg-opacity-20`}
                >
                  {hasil.kategori.bbtb}
                </div>
              </div>
            </div>

            <div className="bg-sage-50 p-6 rounded-xl border border-sage-200">
              <h3 className="font-bold text-lg mb-3 flex items-center text-moss-green">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Rekomendasi
              </h3>
              {hasil.zscore.bbu < -2 ||
              hasil.zscore.tbu < -2 ||
              hasil.zscore.bbtb < -2 ? (
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong className="text-red-700">
                      Gizi kurang/stunting:
                    </strong>{" "}
                    Tingkatkan asupan protein hewani (telur, ikan, daging),
                    susu, dan makanan padat gizi. Pastikan pemberian makanan
                    seimbang dengan frekuensi yang cukup sesuai usia.
                  </p>
                  <p className="text-sm font-semibold text-red-600 p-3 bg-red-50 rounded-lg border border-red-100 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Konsultasikan segera ke Posyandu atau Puskesmas terdekat.
                  </p>
                </div>
              ) : hasil.zscore.bbtb > 1 ? (
                <p className="text-sm p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <strong className="text-blue-700">
                    Berisiko berat badan lebih/obesitas:
                  </strong>{" "}
                  Batasi makanan manis, berlemak, dan cepat saji. Tingkatkan
                  aktivitas fisik dan konsumsi buah serta sayur. Perhatikan pola
                  makan sehat dan tumbuh kembang anak.
                </p>
              ) : (
                <p className="text-sm p-3 bg-green-50 rounded-lg border border-green-100">
                  <strong className="text-green-700">
                    Pertumbuhan normal:
                  </strong>{" "}
                  Pertahankan pola makan seimbang dengan gizi sesuai kebutuhan
                  anak. Tetap lakukan pemantauan tumbuh kembang secara rutin di
                  Posyandu.
                </p>
              )}
            </div>

            <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p className="flex items-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Perhitungan menggunakan standar antropometri Permenkes No. 2
                tahun 2020
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Hasil evaluasi ini tidak menggantikan pemeriksaan langsung oleh
                tenaga medis
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
