# Portfolio Siti Mutmainah
React + Vite + Tailwind CSS 4. Bahasa ID/EN dan tema tersimpan otomatis di browser. CV dan sertifikat asli berbahasa sesuai dokumen.

## Menjalankan
Node.js 22 disarankan. `npm install`, `npm run dev`, lalu buka URL yang tampil. `npm run build` menghasilkan `dist`, dan `npm run preview` membuka hasil build.

## Kontak
Buka `src/contact.js`. Untuk LinkedIn, salin URL profil dari halaman profil LinkedIn sendiri, tempel pada `linkedin: ''`. Sebelum diisi, tombol mencari nama di LinkedIn. Untuk WhatsApp, isi `whatsapp: ''` dengan nomor internasional tanpa +, spasi, atau tanda hubung (contoh 6281234567890). Tombol akan muncul otomatis setelah nomor valid. Jangan publikasikan nomor jika tidak ingin dihubungi publik.

## Hosting
Vercel: push folder proyek ke GitHub, import repository, pilih Vite, build `npm run build`, output `dist`. Netlify: gunakan build dan output yang sama. Tidak butuh database. Periksa semua link sebelum publish.

## Konten
Edit `src/App.jsx` dan `src/data.js` untuk isi bilingual. Pilihan bahasa berlaku pada seluruh UI; nama produk, institusi dan istilah teknis tetap aslinya. Dokumen PDF tidak diterjemahkan. Foto asli digunakan, proyek menggunakan enam screenshot asli di public/projects. CV publik memakai salinan tanpa nomor telepon.

## Proyek dan sertifikat
Tiga kartu proyek membuka galeri dialog dengan navigasi gambar dan keterangan masalah, tujuan serta kontribusi. Sertifikat dan CV terbuka di tab baru. Periksa izin publikasi screenshot bisnis sebelum hosting.
