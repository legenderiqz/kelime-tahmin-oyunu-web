//DOM elementlerini değişkenlere atıyoruz
const selectMenu = document.getElementById("selectMenu")
const kategori   = document.getElementById("kategori")
const kolay      = document.getElementById("kolayO")
const orta       = document.getElementById("ortaO")
const zor        = document.getElementById("zorO")
const gonder     = document.getElementById("submitBtn")
const input      = document.getElementById("textInput")
const hakText    = document.getElementById("kalanHak")
const sonucText  = document.getElementById("sonucSon")
const puanText   = document.getElementById("puan")
const listeLog   = document.getElementById("listeLog")

//Değişkenler
let meyveler     = ["elma","armut","muz","karpuz","kavun","nar","kayısı","şeftali","çilek","kiraz"]
let esyalar      = ["kalem","silgi","kitap","telefon","kaşık","çatal","tabak","kutu","oyuncak","bardak","klavye","fare","masa","defter","çanta","suluk","bıçak","kart","kapı","bilgisayar"]
let hayvanlar    = ["Aslan","Kaplan","Fil","Zürafa","Zebra","Gergedan","Su aygırı","Çita","Kurt","Tilki","Ayı","Kanguru","Koala","Timsah","Yılan","Kartal","Baykuş","Karga","At","Köpek","Kedi","Tavşan","Tavuk","İnek","Keçi","Koyun","Balina","Köpekbalığı","Penguen","Yunus"]
let zorluk       = "kolay";
let kalanHak     = 5;
let sonuc        = false;
let secilenMeyve = null;
let secilenEsya  = null;
let secilenHayvan= null;
let puan         = 0;

//Başlangıçta sıfırla
resetGame()

//Zorluk değiştirilince oyunu sıfırla
function resetGame() {
  listeLog.innerText = ""
  kalanHak = 5
  hakText.innerText = kalanHak + " Hak"
  sonucText.innerText = "Oyun başladı."
  puanText.innerText = "Puan: " + puan;
  gonder.disabled = false;
  degerleriSec()
}

// Meyve, eşya, hayvan değerleri seçimi
function degerleriSec() {
  secilenMeyve = meyveler[Math.floor(Math.random()*meyveler.length)].toLowerCase()
  secilenEsya = esyalar[Math.floor(Math.random()*esyalar.length)].toLowerCase()
  secilenHayvan = hayvanlar[Math.floor(Math.random()*hayvanlar.length)].toLowerCase()
  //console.log(`| ${secilenMeyve} | ${secilenEsya} | ${secilenHayvan} | (test)`)
}

// Zorluk seçilince çalıştır
kolay.addEventListener("click", function(){
  secileniYazdir(this)
  zorluk = "kolay";
  resetGame()
}); //kolay zorluk
orta.addEventListener("click", function(){
  secileniYazdir(this)
  zorluk = "orta";
  resetGame()
}); //orta zorluk
zor.addEventListener("click", function(){
  secileniYazdir(this)
  zorluk = "zor";
  resetGame()
}); //zor zorluk

//Gönder butonu
gonder.addEventListener("click", function(){
  if (input.value === "") return;
  let deger = input.value;
  input.value = "";
  checkValue(deger)
  const li = document.createElement("li")
  li.innerText = deger + " " + (sonuc ? "Doğru" : "Yanlış");
  document.getElementById("listeLog").appendChild(li)
});

//Seçilen zorluğu yazdır
function secileniYazdir(secim) {
  kategori.innerText = secim.innerText
  selectMenuToggle()
}

//Seçim butonlarını gizle
function selectMenuToggle() {
  selectMenu.style.display=selectMenu.style.display=="block" ? "none" : "block"
}

//Gönderilen cevabı kontrol et
function checkValue(deger) {
  kalanHak--;
  hakText.innerText = kalanHak + " Hak"
  let girilen = deger.trim().toLowerCase()
  if (zorluk === "kolay") {
    girilen === secilenMeyve ? dogruCevap("kolay") : yanlisCevap(secilenMeyve)
  } else if (zorluk === "orta") {
    girilen === secilenEsya ? dogruCevap("orta") : yanlisCevap(secilenEsya)
  } else if (zorluk === "zor") {
    girilen === secilenHayvan ? dogruCevap("zor") : yanlisCevap(secilenHayvan)
  }
}

//Doğru cevap verilince
function dogruCevap(zorluk) {
  sonuc = true
  sonucText.innerText = "✅ Doğru cevap! Oyun bitti."
  gonder.disabled=true
  let katsayi = null;
  if (zorluk === "kolay") katsayi = 1;
  else if (zorluk === "orta") katsayi = 2;
  else if (zorluk === "zor") katsayi = 3;
  puan += (kalanHak + 1) * 10 * katsayi;
  puanText.innerText = "Puan: " + puan
}

//Yanlış cevap verilince
function yanlisCevap(cevap) {
  sonuc = false
  if (kalanHak === 0) {
    sonucText.innerText = "❌ Hak kalmadı, oyun bitti. Cevap: " + cevap
    gonder.disabled=true
  }
  }
