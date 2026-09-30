# PT. Cipta Piramida Mandiri — Website Shipyard

Website company profile statis (HTML/CSS/JS, tanpa build step) untuk galangan kapal PT. Cipta Piramida Mandiri, Bengkalis – Riau. Konten dan palet warna diambil dari dokumen company profile.

## Struktur

```
index.html          Halaman utama (single page)
assets/css/style.css
assets/js/main.js   Header, menu mobile, scroll-spy, lightbox galeri
assets/img/         Foto & logo (diambil dari PDF company profile)
```

## Palet warna

| Token        | Hex       | Pemakaian                         |
|--------------|-----------|-----------------------------------|
| `--blue`     | `#4B8ABE` | Warna utama, tombol, aksen        |
| `--blue-light` | `#8CC2E6` | Aksen pada latar gelap          |
| `--red`      | `#F90E08` | Aksen tipis (garis, penomoran)    |
| `--navy`     | `#0E2438` | Latar gelap (hero, visi-misi, footer) |

## Menjalankan

Buka `index.html` langsung di browser, atau jalankan server lokal:

```
python3 -m http.server 8000
```

Bisa di-deploy ke hosting statis apa pun (GitHub Pages, Netlify, Vercel, cPanel).

## Belum ada di company profile

Nomor telepon, email, dan nomor NPWP tidak tercantum di PDF, sehingga belum ditampilkan. Tambahkan di bagian `#kontak` dan `#legalitas` pada `index.html`.
