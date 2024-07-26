This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
"# PatikaGraduationNext" 

# Patika && Fmmss Bilişim FullStack Bootcamp Frontend Projesi

ilk olarak gerekli modüller eklenmeli. (npm i   veya npm install)

## projeyi ayağa kaldırdıktan sonra backend tarafı için  https://github.com/Mustafa-Cam/PatikaMsGp   bu bağlantıdaki backend projesini git clone ile bilgisayarınıza clone edip ayağa kaldırdıktan sonra projeyi tamamıyla çalıştırabilirsiniz.(Frontend kötü oldu biliyorum ama düzenleyeceğim. )

# Projeden görseller.

## Terminal
![Ekran görüntüsü 2024-07-22 010624](https://github.com/user-attachments/assets/67d5f47b-c688-40af-804b-a53d89677676)

## Ana Sayfa
![Ekran Görüntüsü (63)](https://github.com/user-attachments/assets/39a59b6c-583a-46ff-8ce1-c6f197366f6f)

## Kayıt Sayfası
![Ekran Görüntüsü (67)](https://github.com/user-attachments/assets/2a8927a3-4289-4c41-bb4a-fdab6df763f6)

Kayıt sayfasında eğer şifreyi 8 karakterden kısa ise  ve 1 rakam içermiyorsa hata verecektir. Ve username  zaten kayıtllı ise hata verecektir. 

## Giriş Sayfası
![Ekran Görüntüsü (66)](https://github.com/user-attachments/assets/6cae5706-6f3c-4d99-aca9-5d35979d3449)

giriş sayfasında doğru bilgiler girilmelidir (Sadece Frontend de yaptım backend tarafında da yapacağım). Giriş yapmadan diğer sayfalara erişilemez(jwt auth). 

## Dashboard sayfası
![Ekran Görüntüsü (65)](https://github.com/user-attachments/assets/be536d9d-28f8-41b9-a7ff-bc46cf3a6edf)

Kendi ilanı değilse ilanlarda satın al butonu olacak. Kendi ilanı ise düzenle, sil, pasif yap butonu olacak.

![Ekran görüntüsü 2024-07-22 020252](https://github.com/user-attachments/assets/44072f64-ad13-442d-aae8-f9635f654d36)

## ilan detay sayfası 
![Ekran görüntüsü 2024-07-22 020636](https://github.com/user-attachments/assets/241f778c-1fc8-4e05-bbfc-45d8c55d733d)

## Kullanıcı ilan vermek isterse ve paketi yoksa hata verecektir.(Backend tarafında Error handling yaptıktan sonra mesajları oradan alacağım.)
![Ekran görüntüsü 2024-07-22 113849](https://github.com/user-attachments/assets/972bfe3b-6478-4947-9bbd-634b713e522c)

## Paket sayfası

Kullanıcı satın al'a bastıktın sonra numara al butonu çıkacaktır. Bu butona basınca 1 ile 1000 arasında random bir sayı olacaktır. O sayıyı doğru girdikten sonra paket başarılı şekilde alınacaktır.
Ardından kendi paket bilgilerini görebilecektir.

![Ekran görüntüsü 2024-07-22 114202](https://github.com/user-attachments/assets/ea221fc7-c088-41e4-8fe7-42e7bd9696af)
![Ekran görüntüsü 2024-07-22 114913](https://github.com/user-attachments/assets/dc31c7d4-87bd-411d-8df8-b37b6adb47fe)
![Ekran görüntüsü 2024-07-22 114944](https://github.com/user-attachments/assets/9e8fe8f2-1ecd-454f-b64b-e2993e856431)
![Ekran görüntüsü 2024-07-22 115019](https://github.com/user-attachments/assets/14c36e1f-e91c-4767-9fda-39fca9d94778)
![Ekran görüntüsü 2024-07-22 115047](https://github.com/user-attachments/assets/4c249371-9790-4a19-bdb1-b0a48ac9bddb)
![Ekran görüntüsü 2024-07-22 115253](https://github.com/user-attachments/assets/698b9aeb-df77-4d88-b623-891d80d4ea2f)
![Ekran görüntüsü 2024-07-22 115253](https://github.com/user-attachments/assets/15a21b5b-6b94-42cf-9b78-80faf7590dc4)

bir paket daha satın alınırsa ilan hakkı small için 10 medium için 20 big için 30 artacaktır
![Ekran görüntüsü 2024-07-22 120133](https://github.com/user-attachments/assets/f12f701e-a64f-4ab9-8afb-feb7e40ab6d6)
![Ekran görüntüsü 2024-07-22 120820](https://github.com/user-attachments/assets/4b719931-01bf-488b-9d9c-03584beb1ef2)


## kullanıcı ilan verdikten sonra kullanıcının ilanı(Status'u In_Review sadece admin değiştirebilir).
![Ekran görüntüsü 2024-07-22 121623](https://github.com/user-attachments/assets/93698810-b200-44fb-9719-a1c3c599bddc)

## Dashboard'da kendi ilanı
![Ekran görüntüsü 2024-07-22 121746](https://github.com/user-attachments/assets/8b682c19-24a4-4dcc-a507-7c7028561013)

## ilan detayı
![Ekran Görüntüsü (69)](https://github.com/user-attachments/assets/35fe0ba8-0373-4317-aed9-de340f50ccba)
![Ekran görüntüsü 2024-07-22 122206](https://github.com/user-attachments/assets/ce4f0adb-084a-4af9-8f42-7d630f7ee1d6)

## Profil alanı
![Ekran görüntüsü 2024-07-22 122444](https://github.com/user-attachments/assets/1384aca5-7031-4381-9c32-8f3fad87761d)

## Admin
![Ekran görüntüsü 2024-07-22 122609](https://github.com/user-attachments/assets/cf418f8a-5a42-4a0f-a3fc-a66a2713b5d4)

## Admin ilanlar
Admin ilanlarn durumunu değiştirebilir. Asıl görevi ise In_review olan ilanları aktif yapmak.
![Ekran görüntüsü 2024-07-22 123237](https://github.com/user-attachments/assets/c21f0412-cc0b-48f4-acd0-21619d04ce37)
![Ekran görüntüsü 2024-07-22 123702](https://github.com/user-attachments/assets/8ca3681c-161b-4dfe-b2f2-bf09a56802c8)
![Ekran görüntüsü 2024-07-22 123732](https://github.com/user-attachments/assets/ac4cbf2b-a84c-4371-974d-4ebd3aab4b6d)
![Ekran görüntüsü 2024-07-22 123753](https://github.com/user-attachments/assets/811fe09f-ca9c-4f1d-8f29-2b16540a94e6)

## Kullanıcı artık ilanlarının durumunu değiştirebilir.
![Ekran görüntüsü 2024-07-22 124209](https://github.com/user-attachments/assets/093fd0e8-ff2c-4301-b7c0-8c83044dd189)
![Ekran görüntüsü 2024-07-22 124234](https://github.com/user-attachments/assets/7d996388-d997-483c-8259-05abb590309b)

## Güncelleme işlemlerim de eksik tamamlayacağım. Silme işlemini yapmıyoruz zaten pasif ve aktif yapıyoruz. Aktif ve pasif ilanlar için de ayrı bir sayfa oluşturacağım.
