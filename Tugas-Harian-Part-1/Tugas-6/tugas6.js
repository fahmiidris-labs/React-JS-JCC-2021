console.log("\n===== Soal 1 =====")
// Soal 1
// Luas lingkaran
const default_phi = 22 / 7
const luasLingkaran = (jari_jari, phi = default_phi) => {
    const diameter = jari_jari ** 2
    const luas = phi * diameter
    return luas
}

// keliling lingkaran
const kelilingLingkaran = (jari_jari, phi = default_phi) => {
    const keliling = 2 * phi * jari_jari
    return keliling
}

// Eksekusi
const hasilLuas = luasLingkaran(7)
const hasilKeliling = kelilingLingkaran(7)

console.log(hasilLuas)
console.log(hasilKeliling)




console.log("\n===== Soal 2 =====")
// Soal 2
const introduce = (...params) => {
    const [name, age, gender, hobby] = params
    const hasil = gender === "Laki-Laki" ? `Pak ${name} adalah seorang ${hobby} yang berusia ${age} tahun` : `Ops Salah Gender!`
    return hasil
}

// Ketentuan output
// "Pak John adalah seorang penulis yang berusia 30 tahun"

const perkenalan = introduce("John", "30", "Laki-Laki", "penulis")
console.log(perkenalan) // Menampilkan "Pak John adalah seorang penulis yang berusia 30 tahun"




console.log("\n===== Soal 3 =====")
// Soal 3
const newFunction = (firstName, lastName) => {
    return {
        firstName,
        lastName,
        fullName: () => {
            console.log(firstName + " " + lastName)
        }
    }
}

// kode di bawah ini jangan diubah atau dihapus sama sekali
console.log(newFunction("John", "Doe").firstName)
console.log(newFunction("Richard", "Roe").lastName)
newFunction("William", "Imoh").fullName()




console.log("\n===== Soal 4 =====")
// Soal 4
let phone = {
    name: "Galaxy Note 20",
    brand: "Samsung",
    year: 2020,
    colors: ["Mystic Bronze", "Mystic White", "Mystic Black"]
}

const { 
    name: phoneName,
    brand: phoneBrand,
    year,
    colors: [colorBronze, colorWhite, colorBlack]
} = phone

console.log(phoneBrand, phoneName, year, colorBlack, colorBronze)




console.log("\n===== Soal 5 =====")
// Soal 5
let warna = ["biru", "merah", "kuning", "hijau"]

let dataBukuTambahan = {
    penulis: "john doe",
    tahunTerbit: 2020
}

let buku = {
    nama: "pemograman dasar",
    jumlahHalaman: 172,
    warnaSampul: ["hitam"]
}

buku.warnaSampul = [...buku.warnaSampul, ...warna]
const combineBuku = {
    ...buku,
    ...dataBukuTambahan,
}

console.log(combineBuku)