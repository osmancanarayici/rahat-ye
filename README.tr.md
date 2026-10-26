[🇬🇧 English](README.md) | 🇹🇷 Türkçe
https://github.com/user-attachments/assets/0dedb58b-e3f0-473f-935e-926798b8bee5

# Rahat Ye 🍽️

Yedikleri yemekleri ve sonrasında yaşadıkları mide rahatsızlıklarını kaydetmek
isteyenler için, internet olmadan da çalışan mini bir React Native (Expo) uygulaması.

## Özellikler

- Yemek adı, kategori (ev yemeği / restoran / paketli gıda) ve tetikleyiciler (acılı, süt ürünü, glüten, kızartma vb.)
- 1-5 arası rahatsızlık şiddeti ve şikayet tipi (şişkinlik, kramp, reflü vb.)
- Yemek adı boşsa "Gönder" butonu devre dışı kalır ve hata mesajı gösterilir
- Veriler telefonun yerel hafızasında saklanır, internet olmasa da kaybolmaz
- Geçmiş ekranında kayıtlar tarihleriyle birlikte listelenir
- Sahte sunucu: 1.5 sn gecikme, yükleniyor göstergesi, %10 hata ihtimali, "Tekrar dene" seçeneği ve başarı mesajı

## Kurulum

Gereksinimler: Node.js (LTS) ve telefonda Expo Go uygulaması.

```
git clone https://github.com/osmancanarayici/rahat-ye.git
cd rahat-ye
npm install
npx expo start
```

Terminalde çıkan QR kodu Expo Go ile okut (telefon ve bilgisayar aynı Wi-Fi'da olmalı).

## Klasör yapısı

```
App.js                  Navigasyon (alt sekmeler)
src/
  constants/options.js  Kategori, tetikleyici ve şikayet listeleri
  services/storage.js   AsyncStorage ile yerel kayıt
  services/fakeApi.js   Sahte sunucu (1.5 sn, %10 hata)
  screens/
    KayitEkrani.js      Yemek kayıt formu
    GecmisEkrani.js     Geçmiş kayıtlar listesi
```

## Neden bu kütüphaneler?

- **Expo:** Android Studio/Xcode kurmadan hızlı geliştirme ve telefonda anında test.
- **AsyncStorage:** Veri küçük ve basit bir liste. Hafif ve yeterli. SQLite gibi çözümler bu ölçekte gereksiz karmaşıklık olurdu.
- **React Navigation (bottom tabs):** İki ekran (Kayıt, Geçmiş) arasında standart ve kolay geçiş.
- **useState:** Uygulama küçük olduğu için Redux gibi bir state kütüphanesine gerek görülmedi.

## Tasarım kararları

- **Önce yerel kayıt, sonra sunucu:** Kayıt önce telefona yazılır, sonra sahte sunucuya gönderilir. Gönderim başarısız olsa bile veri kaybolmaz, kullanıcı "Tekrar dene" diyebilir.
- Yemek adı `trim()` ile kontrol edilir, sadece boşluk girilirse de hata verilir.
- Geçmişte her kaydın sunucuya gönderilip gönderilmediği görünür.

## Yapılmayanlar / geliştirme fikirleri

TypeScript, dark mode ve unit test eklenmedi. Başarısız kayıtların internet gelince otomatik yeniden gönderilmesi eklenebilir.Ben ekstraları eklemedim.

## Geliştirme süreci

Bu projeyi geliştirirken yapay zekâ asistanından (Claude) yardım aldım. Kodu
adım adım birlikte yazdık. Her dosyanın ne yaptığını, verinin ekranlar ve
storage arasında nasıl aktığını ve tasarım kararlarının nedenlerini tek tek anlattırıp kendim eklemeye çalıştım çoğunu açıklayabilirim.
