# TODO: Revisi 3 Section Terakhir

## Task
1. Kurangi jarak sub-headline ke carousel di section FeaturedWorks agar konsisten dengan section lain.
2. Sesuaikan jarak divider di 3 section terakhir (Advantage, FeaturedWorks, Services) agar lebih presisi dan konsisten.

## Analysis

### Current State
- **Advantage**: Tidak ada divider. Container `py-20 lg:py-28`. Header `mb-12 lg:mb-16`.
- **FeaturedWorks**: Ada divider. Header dalam wrapper terpisah `py-16 lg:py-20`. Carousel `py-6 lg:py-8` terpisah. Total jarak headline→carousel = 22/28px. Jarak divider→header = 16/20px.
- **Services**: Ada divider. Container `py-20 lg:py-28`. Header `mb-12 lg:mb-16`. Jarak divider→header = 20/28px.

### Target State
- Semua 3 section menggunakan container `py-20 lg:py-28`.
- Semua header menggunakan `mb-12 lg:mb-16`.
- Jarak divider→konten konsisten (~20/28px dari padding container).
- Jarak headline→carousel di FeaturedWorks = 12/16px (sama seperti section lain).

## Plan

### Step 1 — Refactor FeaturedWorks.jsx ✅
- Pindahkan header dan carousel ke dalam satu `<div className="page-container py-20 lg:py-28">`.
- Ganti padding `py-16 lg:py-20` pada header menjadi `mb-12 lg:mb-16`.
- Hapus padding `py-6 lg:py-8` pada carousel wrapper, gantikan dengan `pt-0 pb-0` (karena sudah diatur oleh container).
- Sesuaikan posisi fade gradients agar menempel ke edge container (ganti `left-6 lg:left-[240px]` menjadi `left-0`, dst).

### Step 2 — Verify Services.jsx & Advantage.jsx ✅
- Keduanya sudah konsisten, tidak perlu edit.

### Step 3 — Testing ✅
- Dev server berjalan, hot-reload aktif.
- Build berhasil tanpa error.

## Result
- Jarak sub-headline → carousel di FeaturedWorks sekarang `mb-12 lg:mb-16` (sama dengan Advantage & Services).
- Jarak divider → konten di FeaturedWorks dan Services sama: `py-20 lg:py-28`.
- Semua 3 section terakhir sekarang memiliki spacing yang konsisten.

