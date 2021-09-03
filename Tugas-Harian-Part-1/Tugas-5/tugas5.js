console.log("\n===== Soal 1 =====")
// Soal 1
// Fungsi menghitung luas persegi panjang
function luasPersegiPanjang(panjang, lebar) {
    return panjang * lebar
}

// Fungsi menghitung keliling persegi panjang
function kelilingPersegiPanjang(panjang, lebar) {
    return 2 * (panjang + lebar)
}

// Fungsi menghitung volume balok
function volumeBalok(panjang, lebar, tinggi) {
    return panjang * lebar * tinggi
}

var panjang = 12
var lebar = 4
var tinggi = 8
 
var luasPersegiPanjang = luasPersegiPanjang(panjang, lebar)
var kelilingPersegiPanjang = kelilingPersegiPanjang(panjang, lebar)
var volumeBalok = volumeBalok(panjang, lebar, tinggi)

console.log(luasPersegiPanjang) 
console.log(kelilingPersegiPanjang)
console.log(volumeBalok)




console.log("\n===== Soal 2 =====")
// Soal 2
function introduce(name, age, address, hobby) {
    return "Nama saya " + name +", umur saya " + age + " tahun, alamat saya di " + address + ", dan saya punya hobby yaitu " + hobby + "!"
}

var name = "John"
var age = 30
var address = "Jalan belum jadi"
var hobby = "Gaming"

var perkenalan = introduce(name, age, address, hobby)
console.log(perkenalan)




console.log("\n===== Soal 3 =====")
// Soal 3
var arrayDaftarPeserta = ["John Doe", "laki-laki", "baca buku" , 1992]

var objectDaftarPeserta = {
    nama: arrayDaftarPeserta[0],
    jenisKelamin: arrayDaftarPeserta[1],
    hobi: arrayDaftarPeserta[2],
    tahunLahir: arrayDaftarPeserta[3],
}
console.log(objectDaftarPeserta)




console.log("\n===== Soal 4 =====")
// Soal 4
var buahBuahan = [
    {
        nama: "Nanas",
        warna: "Kuning",
        adaBijinya: false,
        harga: 9000
    }, {
        nama: "jeruk",
        warna: "Oranye",
        adaBijinya: true,
        harga: 8000
    }, {
        nama: "Semangka",
        warna: "Merah",
        adaBijinya: true,
        harga: 10000
    }, {
        nama: "Pisang",
        warna: "Kuning",
        adaBijinya: false,
        harga: 5000
    }
]

var buahBuahanFilter = buahBuahan.filter(function (buah) {
    return buah.adaBijinya == false
})

console.log(buahBuahanFilter)




console.log("\n===== Soal 5 =====")
// Soal 5
function tambahDataFilm (nama, durasi, genre, tahun) {
    var newFilm = {
        nama: nama,
        durasi: durasi,
        genre: genre,
        tahun: tahun
    }

    dataFilm.push(newFilm)
}

var dataFilm = []

tambahDataFilm("LOTR", "2 jam", "action", "1999")
tambahDataFilm("avenger", "2 jam", "action", "2019")
tambahDataFilm("spiderman", "2 jam", "action", "2004")
tambahDataFilm("juon", "2 jam", "horror", "2004")
console.log(dataFilm)