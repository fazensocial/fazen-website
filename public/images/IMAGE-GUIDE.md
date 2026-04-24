# Image Placement Guide

## shared/
Gambar yang dipakai lintas halaman — siapkan sekali, reuse di mana saja.

### shared/trusted-by/
**20 logo** klien (komponen `TrustedBy.tsx` — muncul di Homepage, Works, Services, Pricing)
- Format: PNG transparan atau SVG
- Ukuran export: **80 × 80 px** (bulat, jadi tidak perlu detail halus)
- Nama: `client-01.png` sampai `client-20.png`

### shared/testimonials/
**16 foto profil** unik — dipakai ulang di Works, Services, Pricing
- Format: JPG atau PNG
- Ukuran export: **112 × 112 px** (2× retina, ditampilkan 56×56 circle)
- Nama: `marcus-t.jpg`, `sarah-k.jpg`, `andi-r.jpg`, `james-l.jpg`, `priya-m.jpg`, `lisa-c.jpg`, `tom-w.jpg`, `reza-a.jpg` + 8 untuk Homepage

---

## homepage/
### homepage/cta-carousel/
**8 gambar** kartu karya di carousel CTA (`components/sections/CTA.tsx`)
- Format: JPG atau WebP
- Ukuran export: **560 × 442 px** (2×), rasio ≈ 5:3
- Konten: screenshot mockup branding, feed IG, slide deck, banner
- Nama: `card-01.jpg` sampai `card-08.jpg`

*(hafaz.jpg sudah ada di sini — biarkan di tempat)*

---

## works/
### works/portfolio/logo-brand/
8 gambar portofolio kategori Logo & Brand
- Ukuran: **600 × 450 px**, rasio 4:3

### works/portfolio/social-media/
8 gambar portofolio Social Media

### works/portfolio/print-media/
6 gambar portofolio Print Media

### works/portfolio/event/
6 gambar portofolio Event

### works/portfolio/packaging/
6 gambar portofolio Packaging

### works/portfolio/presentation/
6 gambar portofolio Presentation

### works/portfolio/others/
8 gambar portofolio Others

**Total portfolio Works: 24–48 gambar** (min 24)
- Format: JPG atau WebP, ukuran: **600 × 450 px** (2×), rasio 4:3
- Nama per folder: `01.jpg`, `02.jpg`, dst.

---

## services/
### services/brand-identity/
**3 gambar** untuk hero grid di subpage Brand Identity
- `hero-square.jpg` — **560 × 560 px**, rasio 1:1 (sel kiri atas)
- `hero-portrait.jpg` — **560 × 1000 px**, rasio ≈ 9:16 (sel kanan, tall)
- `hero-landscape.jpg` — **560 × 420 px**, rasio 4:3 (sel kiri bawah)

### services/social-media/
**3 gambar** untuk hero grid di subpage Social Media (format sama)

### services/presentation/
**3 gambar** untuk hero grid di subpage Presentation (format sama)

### services/marketing/
**3 gambar** untuk hero grid di subpage Marketing (format sama)

### services/what-we-do/
**4 gambar** untuk mosaic "What We Do" di halaman Services utama
- `sel-1.jpg` — **560 × 560 px**, rasio 1:1
- `sel-2.jpg` — **560 × 1000 px**, rasio ≈ 1:2 (portrait)
- `sel-3.jpg` — **560 × 420 px**, rasio 4:3
- `sel-4.jpg` — **1120 × 420 px**, rasio 16:6 (ultra-wide, full row)

### services/our-process/
**4 gambar** untuk section "Our Process" (1 per step, tampil bergantian)
- `step-01.jpg` — brief/moodboard visual
- `step-02.jpg` — sketsa/concept
- `step-03.jpg` — revisi/iterasi
- `step-04.jpg` — file delivery/handover
- Ukuran: **1200 × 900 px** (2×), rasio 4:3

### services/selected-works/
**20 gambar** untuk carousel "Selected Works" di halaman Services utama
- Format: JPG atau WebP
- Ukuran: **520 × 360 px** (2×), rasio ≈ 3:2
- Nama: `row1-01.jpg` s/d `row1-10.jpg` dan `row2-01.jpg` s/d `row2-10.jpg`
- Boleh overlap/reuse dari portfolio Works

---

## resources/
### resources/featured-products/
**4 gambar** untuk kartu produk unggulan di halaman Resources
- `instagram-bundle.jpg`
- `pitch-deck-kit.jpg`
- `branding-kit.jpg`
- `campaign-template.jpg`
- Ukuran: **1200 × 900 px** (2×), rasio 4:3 — **harus paling premium**

### resources/library/
**12–16 gambar** untuk grid Resource Library (rekomendasi 16 = 4 baris)
- Format: JPG atau WebP
- Ukuran: **600 × 450 px** (2×), rasio 4:3
- Konten: preview template Canva/Figma (carousel IG, slide deck, brand kit, flyer)
- Nama: `resource-01.jpg` sampai `resource-16.jpg`

---

## pricing/
### pricing/service-cards/
**4 gambar** untuk kartu harga project-based di halaman Pricing
- `brand-identity.jpg`
- `social-media.jpg`
- `presentation.jpg`
- `marketing.jpg`
- Ukuran: **600 × 375 px** (2×), rasio 8:5
- Boleh crop/resize dari gambar subpage service

---

## Ringkasan Total

| Folder | Jumlah |
|--------|--------|
| shared/trusted-by | 20 logo |
| shared/testimonials | 16 foto |
| homepage/cta-carousel | 8 gambar |
| works/portfolio/* | 24–48 gambar |
| services/brand-identity | 3 gambar |
| services/social-media | 3 gambar |
| services/presentation | 3 gambar |
| services/marketing | 3 gambar |
| services/what-we-do | 4 gambar |
| services/our-process | 4 gambar |
| services/selected-works | 20 gambar |
| resources/featured-products | 4 gambar |
| resources/library | 12–16 gambar |
| pricing/service-cards | 4 gambar |
| **TOTAL** | **≈ 128–156 file** |
