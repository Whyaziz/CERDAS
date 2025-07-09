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

  const getDetailedRecommendation = (
    bbuZscore: number,
    tbuZscore: number,
    bbtbZscore: number
  ) => {
    // Default recommendations
    let recommendation = {
      title: "Status Gizi Normal",
      description: "Pertumbuhan anak normal sesuai standar.",
      energy: "Sesuai AKG (~1.250–1.350 kkal)",
      protein: "Sesuai kebutuhan (~25 g)",
      micronutrients: "Seimbang (zat besi, zinc, vitamin A)",
      foodExamples: "Nasi + ayam kecap + sayur bening, buah-buahan segar",
      alertLevel: "normal", // 'severe', 'warning', 'normal', 'excess'
    };

    // BB/U - Berat badan menurut umur
    if (bbuZscore < -3) {
      recommendation = {
        title: "Severely Underweight (Berat Badan Sangat Kurang)",
        description: "Dibutuhkan catch-up growth secara cepat.",
        energy: "20–30% di atas AKG (~1.500–1.700 kkal)",
        protein: "3–4 g/kg BB (~30–40 g)",
        micronutrients: "Zinc, zat besi, vitamin A, kalsium, vitamin D",
        foodExamples:
          "Bubur ayam santan, hati ayam, telur dadar mini, sup sayur",
        alertLevel: "severe",
      };
    } else if (bbuZscore < -2) {
      recommendation = {
        title: "Underweight (Berat Badan Kurang)",
        description: "Perlu upaya menaikkan berat badan ke normal.",
        energy: "10–20% di atas AKG (~1.400–1.600 kkal)",
        protein: "2–3 g/kg BB (~25–35 g)",
        micronutrients: "Zinc, zat besi, vitamin A, kalsium, vitamin D",
        foodExamples: "Pepes ikan, nasi tim telur + wortel, pisang + keju",
        alertLevel: "warning",
      };
    } else if (bbuZscore > 1) {
      recommendation = {
        title: "Risiko Berat Badan Lebih",
        description: "Hindari kenaikan berat badan berlebih.",
        energy: "Sesuai AKG, kurangi snack manis dan berlemak",
        protein: "Sesuai kebutuhan (~25 g)",
        micronutrients: "Serat, vitamin D",
        foodExamples: "Nasi + ikan kukus + tumis brokoli, buah-buahan segar",
        alertLevel: "excess",
      };
    }

    // TB/U - Tinggi badan menurut umur (prioritaskan jika stunting)
    if (tbuZscore < -3) {
      recommendation = {
        title: "Severely Stunted (Sangat Pendek)",
        description: "Fokus pada optimalisasi pertumbuhan tinggi badan.",
        energy: "20% di atas AKG (~1.500–1.600 kkal)",
        protein: "Tinggi protein (3–4 g/kg BB)",
        micronutrients: "Zinc, kalsium, vitamin D",
        foodExamples: "Sup ikan tahu, nasi tim, susu",
        alertLevel: "severe",
      };
    } else if (tbuZscore < -2) {
      recommendation = {
        title: "Stunted (Pendek)",
        description: "Perlu upaya mengejar pertumbuhan tinggi badan.",
        energy: "10–20% di atas AKG",
        protein: "Tinggi protein (2-3 g/kg BB)",
        micronutrients: "Zinc, kalsium, vitamin D",
        foodExamples: "Nasi + telur dadar + sayur bayam, susu",
        alertLevel: "warning",
      };
    }

    // BB/TB - Berat badan menurut tinggi badan (prioritaskan jika wasting atau obesitas)
    if (bbtbZscore < -3) {
      recommendation = {
        title: "Severely Wasted (Gizi Buruk)",
        description: "Dibutuhkan catch-up growth secara cepat.",
        energy: "20–30% di atas AKG (~1.500–1.700 kkal)",
        protein: "3–4 g/kg BB",
        micronutrients: "Zinc, zat besi, vitamin A",
        foodExamples: "Bubur kacang hijau santan, hati ayam, telur",
        alertLevel: "severe",
      };
    } else if (bbtbZscore < -2) {
      recommendation = {
        title: "Wasted (Gizi Kurang)",
        description: "Perlu upaya menaikkan berat badan.",
        energy: "10–20% di atas AKG",
        protein: "2–3 g/kg BB",
        micronutrients: "Zinc, zat besi, vitamin A",
        foodExamples: "Nasi + pepes ikan + tumis sayur",
        alertLevel: "warning",
      };
    } else if (bbtbZscore > 3) {
      recommendation = {
        title: "Obesitas (Obese)",
        description: "Perlu penurunan berat badan secara bertahap.",
        energy: "10–20% di bawah AKG",
        protein: "Cukup sesuai kebutuhan",
        micronutrients: "Serat, vitamin D, zat besi",
        foodExamples: "Nasi + ikan kukus, sayur rebus, snack buah",
        alertLevel: "excess",
      };
    } else if (bbtbZscore > 2) {
      recommendation = {
        title: "Gizi Lebih (Overweight)",
        description: "Perlu penurunan berat badan perlahan.",
        energy: "10–15% di bawah AKG (~1.000–1.150 kkal)",
        protein: "Cukup sesuai kebutuhan",
        micronutrients: "Serat, vitamin D, zat besi",
        foodExamples: "Nasi + ayam rebus, sayur",
        alertLevel: "excess",
      };
    } else if (bbtbZscore > 1) {
      recommendation = {
        title: "Berisiko Gizi Lebih (Possible Risk of Overweight)",
        description: "Cegah kenaikan berat badan berlebih.",
        energy: "Sesuai AKG, kurangi snack manis",
        protein: "Sesuai kebutuhan (~25 g)",
        micronutrients: "Serat, vitamin D",
        foodExamples: "Nasi + ikan kukus + sayur rebus",
        alertLevel: "warning",
      };
    }

    return recommendation;
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
                Rekomendasi Gizi
              </h3>

              {(() => {
                const rec = getDetailedRecommendation(
                  hasil.zscore.bbu,
                  hasil.zscore.tbu,
                  hasil.zscore.bbtb
                );

                let alertStyle = "bg-green-50 border-green-100";
                let titleStyle = "text-green-700";

                if (rec.alertLevel === "severe") {
                  alertStyle = "bg-red-50 border-red-100";
                  titleStyle = "text-red-700";
                } else if (rec.alertLevel === "warning") {
                  alertStyle = "bg-yellow-50 border-yellow-100";
                  titleStyle = "text-yellow-700";
                } else if (rec.alertLevel === "excess") {
                  alertStyle = "bg-blue-50 border-blue-100";
                  titleStyle = "text-blue-700";
                }

                return (
                  <div className={`p-4 rounded-lg border ${alertStyle}`}>
                    <h4 className={`font-bold ${titleStyle} text-lg mb-2`}>
                      {rec.title}
                    </h4>
                    <p className="text-sm mb-3">{rec.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h5 className="font-semibold text-sm mb-1">
                          Kebutuhan Gizi:
                        </h5>
                        <ul className="text-sm space-y-1.5 list-disc pl-4">
                          <li>
                            <span className="font-medium">Energi:</span>{" "}
                            {rec.energy}
                          </li>
                          <li>
                            <span className="font-medium">Protein:</span>{" "}
                            {rec.protein}
                          </li>
                          <li>
                            <span className="font-medium">
                              Mikronutrien fokus:
                            </span>{" "}
                            {rec.micronutrients}
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-sm mb-1">
                          Contoh Menu:
                        </h5>
                        <p className="text-sm">{rec.foodExamples}</p>
                      </div>
                    </div>

                    {rec.alertLevel === "severe" && (
                      <div className="mt-4 flex items-center p-3 bg-red-100 rounded-lg border border-red-200 text-red-700 text-sm">
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
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <span>
                          Konsultasikan segera ke Posyandu atau Puskesmas
                          terdekat untuk penanganan lebih lanjut.
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Additional general advice section */}
              <div className="mt-4 text-sm text-gray-700">
                <h5 className="font-semibold mb-1">Saran Umum:</h5>
                <ul className="space-y-1 list-disc pl-4">
                  <li>Berikan makanan beragam dengan pola gizi seimbang</li>
                  <li>Pantau pertumbuhan anak secara rutin di Posyandu</li>
                  <li>Perhatikan kebersihan dalam penyiapan makanan</li>
                  <li>Ajak anak bermain aktif setiap hari minimal 60 menit</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
