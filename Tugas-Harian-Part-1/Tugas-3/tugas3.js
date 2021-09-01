console.log("\n===== Soal 1 =====");
// Soal 1
var kataPertama = "saya";
var kataKedua = "senang";
var kataKetiga = "belajar";
var kataKeempat = "javascript";

// Perubahan
var kataKeduaBerubah = kataKedua.charAt(0).toUpperCase() + kataKedua.substr(1).toLowerCase();
var kataKetigaBerubah = kataKetiga.substr(0, 6).toLowerCase() + kataKetiga.charAt(6).toUpperCase();
var kataKeempatBerubah = kataKeempat.toUpperCase();

// Gabungan
var kataGabungan = kataPertama + " " + kataKeduaBerubah + " " + kataKetigaBerubah + " " + kataKeempatBerubah;
console.log(kataGabungan);




console.log("\n===== Soal 2 =====");
// Soal 2
// Persegi Panjang
var panjangPersegiPanjang = "8";
var lebarPersegiPanjang = "5";

// Segitiga
var alasSegitiga = "6";
var tinggiSegitiga = "7";

// Perubahan Dari String Ke Int
// Persegi Panjang
var panjangPersegiPanjangInt = parseInt(panjangPersegiPanjang);
var lebarPersegiPanjangInt = parseInt(lebarPersegiPanjang);

// Segitiga
alasSegitigaInt = parseInt(alasSegitiga);
tinggiSegitigaInt = parseInt(tinggiSegitiga);

// Perhitungan Keliling Persegi Panjang
// Rumus: K = 2(p + l)
var kelilingPersegiPanjang = 2 * (panjangPersegiPanjangInt + lebarPersegiPanjangInt);
console.log("Keliling dari persegi panjang adalah " + kelilingPersegiPanjang);

// Perhitungan Luas Segitiga
// Rumus: L = 1/2 × a x t
var luasSegitiga = 0.5 * alasSegitigaInt * tinggiSegitigaInt;
console.log("Luas dari segitiga adalah " + luasSegitiga);




console.log("\n===== Soal 3 =====");
// Soal 3
var sentences = "wah javascript itu keren sekali";

var firstWord = sentences.substring(0, 3);
var secondWord = sentences.substring(4, 14)
var thirdWord = sentences.substring(14, 18)
var fourthWord = sentences.substring(19, 24)
var fifthWord = sentences.substring(25, 31)

console.log("Kata Pertama: " + firstWord);
console.log("Kata Kedua: " + secondWord);
console.log("Kata Ketiga: " + thirdWord);
console.log("Kata Keempat: " + fourthWord);
console.log("Kata Kelima: " + fifthWord);




console.log("\n===== Soal 4 =====");
// Soal 4
var nilaiJohn = 80;
var nilaiDoe = 50;

// Kondisi untuk nilai John
if (nilaiJohn >= 80) {
    console.log("Nilai John : A");
} else if (nilaiJohn >= 70 && nilaiJohn < 80) {
    console.log("Nilai John : B");
} else if (nilaiJohn >= 60 && nilaiJohn < 70) {
    console.log("Nilai John : C");
} else if (nilaiJohn >= 50 && nilaiJohn < 60) {
    console.log("Nilai John : D");
} else {
    console.log("Nilai John : E");
}

// Kondisi untuk nilai Doe
if (nilaiDoe >= 80) {
    console.log("Nilai Doe : A");
} else if (nilaiDoe >= 70 && nilaiDoe < 80) {
    console.log("Nilai Doe : B");
} else if (nilaiDoe >= 60 && nilaiDoe < 70) {
    console.log("Nilai Doe : C");
} else if (nilaiDoe >= 50 && nilaiDoe < 60) {
    console.log("Nilai Doe : D");
} else {
    console.log("Nilai Doe : E");
}




console.log("\n===== Soal 5 =====");
// Soal 5
var tanggal = 16;
var bulan = 7;
var tahun = 2002;
switch (bulan) {
    case 1: { bulan = "Januari"; break; }
    case 2: { bulan = "Februari"; break; }
    case 3: { bulan = "Maret"; break; }
    case 4: { bulan = "April"; break; }
    case 5: { bulan = "Mei"; break; }
    case 6: { bulan = "Juni"; break; }
    case 7: { bulan = "Juli"; break; }
    case 8: { bulan = "Agustus"; break; }
    case 9: { bulan = "September"; break; }
    case 10: { bulan = "Oktober"; break; }
    case 11: { bulan = "November"; break; }
    case 12: { bulan = "Desember"; break; }
    default: { break; }
}

// Hasil
console.log(tanggal + " " + bulan + " " + tahun)
