console.log("\n===== Soal 1 =====");
// Soal 1
console.log("LOOPING PERTAMA");
var angka = 2;
while (angka <= 20) {
    console.log(angka + " - I love coding");
    angka += 2
}

console.log("LOOPING KEDUA");
var angka2 = 20;
while (angka2 > 0) {
    console.log(angka2 + " - I will become a frontend developer");
    angka2 -= 2
}




console.log("\n===== Soal 2 =====");
// Soal 2
for (var i = 1; i <= 20; i++) {
    if (i % 2 != 0) {
        if (i % 3 == 0) {
            console.log(i + " - I Love Coding");
        } else {
            console.log(i + " - Santai");
        }
    } else {
        console.log(i + " - Berkualitas");
    }
}




console.log("\n===== Soal 3 =====");
// Soal 3
var pagar = "";
for (var i = 0; i < 7; i++) {
    for (var j = 0; j <= i; j++) {
        pagar += "# ";
    }
    pagar += "\n";
}
console.log(pagar);




console.log("\n===== Soal 4 =====");
// Soal 4
var kalimat = ["aku", "saya", "sangat", "sangat", "senang", "belajar", "javascript"];

kalimat.splice(2, 1);
kalimat.shift();

var kalimatDiJoin = kalimat.join(" ");
console.log(kalimatDiJoin);




console.log("\n===== Soal 5 =====");
// Soal 5
var sayuran = [];

// Menambahkan ke array menggunakan .push() dan berurut asc menggunakan .sort()
sayuran.push("Kangkung", "Bayam", "Buncis", "Kubis", "Timun", "Seledri", "Tauge");
sayuran.sort()
for (var i = 0; i < sayuran.length; i++) {
    console.log(i + 1 + ". " + sayuran[i]);
}