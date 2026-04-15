# Product Requirements Document (PRD): warungpos POS

**Versi:** 1.1.0
**Tanggal Dibuat:** 14 April 2026
**Terakhir Diperbarui:** 14 April 2026
**Tim:** Fullstack Developer, Backend Developer (Go & PostgreSQL)
**Status:** In Progress

---

## Struktur Dokumen

```text
PRD.md
├── Deskripsi Produk
├── User Roles
│   ├── Owner
│   └── Cashier
├── Fitur Owner
│   ├── Manajemen Produk (+ acceptance criteria)
│   ├── Manajemen Kategori (+ acceptance criteria)
│   ├── Manajemen Stok (+ acceptance criteria)
│   ├── Manajemen Meja (+ acceptance criteria)
│   ├── Manajemen User Cashier (+ acceptance criteria)
│   ├── Dashboard Laporan (+ acceptance criteria)
│   ├── Manajemen Promo (+ acceptance criteria)
│   └── Export CSV (+ acceptance criteria)
├── Fitur Cashier
│   ├── Shift Management (+ acceptance criteria)
│   ├── Buat Transaksi (+ acceptance criteria)
│   ├── Apply Promo (+ acceptance criteria)
│   ├── Checkout Midtrans (+ acceptance criteria)
│   └── Riwayat Transaksi (+ acceptance criteria)
├── Business Rules
└── Out of Scope
```

---

## 1. Deskripsi Produk

**warungpos POS** adalah sistem Point of Sales (Kasir) yang dirancang khusus untuk operasional coffee shop berskala menengah. Sistem ini dibangun menggunakan **backend Golang (Go)** dengan **database relasional PostgreSQL**, mengekspos **REST API berbasis JSON**, yang kemudian akan dikonsumsi oleh frontend web.

**Tujuan utama sistem ini adalah:**
- Mendigitalisasi proses pemesanan dan mempercepat transaksi kasir di meja depan
- Mengelola inventaris dan stok secara akurat dan terlacak
- Menyajikan laporan penjualan komprehensif bagi pemilik bisnis
- Mendukung pembayaran digital melalui integrasi Midtrans Snap (QRIS, GoPay, Transfer Bank)

**Target Pengguna:** Pemilik dan kasir coffee shop berskala menengah (1 outlet, 2–10 karyawan).

---

## 2. User Roles

Sistem memiliki dua peran (role) pengguna utama dengan hak akses yang terpisah:

| Role | Deskripsi Akses |
|------|-----------------|
| **Owner (Pemilik)** | Akses penuh ke semua modul — operasional dan manajerial. Bertanggung jawab atas pendaftaran akun owner pertama kali, manajemen master data (produk, kategori, meja, promo, user), pemantauan stok, dan analisis bisnis melalui dashboard laporan. |
| **Cashier (Kasir)** | Akses terbatas untuk operasional kasir harian. Bertugas melakukan login/logout harian, membuka/menutup shift, melayani pelanggan, menginput pesanan, dan memproses pembayaran. |

---

## 3. Fitur Owner

### 3.1 Manajemen Produk

Manajemen katalog seluruh produk atau menu yang ditawarkan coffee shop.

**Acceptance Criteria:**
- [ ] Owner dapat menambah produk baru dengan field wajib: nama, deskripsi, harga, kategori, foto/gambar produk, dan status ketersediaan.
- [ ] Owner dapat melihat daftar semua produk (dengan fitur pencarian berdasar nama dan filter berdasar kategori/status).
- [ ] Owner dapat mengubah rincian produk yang sudah tersimpan.
- [ ] Owner dapat melakukan *soft delete* pada produk — produk hilang dari menu kasir, namun data tetap ada untuk menjaga integritas riwayat transaksi historis.
- [ ] Owner dapat mengaktifkan (Active) atau menonaktifkan (Inactive) produk, misalnya saat stok habis.
- [ ] Upload foto produk berhasil disimpan dan URL-nya dapat ditampilkan di frontend.

### 3.2 Manajemen Kategori Produk

Pengelompokan produk ke dalam kategori spesifik untuk memudahkan pencarian Cashier (contoh: Espresso Based, Manual Brew, Pastry, Snack).

**Acceptance Criteria:**
- [ ] Owner dapat membuat, melihat, mengubah nama, dan menghapus kategori.
- [ ] Sistem **menolak penghapusan** kategori jika masih ada produk aktif yang terikat dengannya, disertai pesan error yang jelas.

### 3.3 Manajemen Stok dengan Riwayat Pergerakan

Sistem pencatatan ketersediaan barang berbasis *simple inventory* untuk item penjualan.

**Acceptance Criteria:**
- [ ] Owner dapat melihat saldo jumlah stok barang saat ini untuk setiap produk.
- [ ] Owner dapat melakukan penyesuaian stok manual: penambahan (stock-in), pengurangan (stock-out), atau koreksi (adjustment) dengan wajib mengisi alasan/catatan.
- [ ] Sistem mencatat log riwayat pergerakan stok (Stock History): kapan stok ditambah manual, kapan dipotong otomatis oleh penjualan yang confirmed.
- [ ] Riwayat stok menampilkan: tanggal & waktu, jenis pergerakan, jumlah perubahan, saldo sebelum & sesudah, dan actor (siapa yang melakukan).

### 3.4 Manajemen Meja

Manajemen ruang makan internal coffee shop.

**Acceptance Criteria:**
- [ ] Owner dapat menambah meja baru dengan Nomor/Nama Meja dan kapasitas kursi.
- [ ] Owner dapat mengubah detail meja dan menonaktifkan meja yang tidak tersedia (contoh: sedang diperbaiki).
- [ ] Meja yang dinonaktifkan tidak muncul sebagai pilihan oleh Cashier saat membuat transaksi.

### 3.5 Manajemen User Cashier

Pengelolaan akses pekerja kasir oleh Owner.

**Acceptance Criteria:**
- [ ] Owner dapat membuat akun baru untuk cashier dengan mengisi: nama lengkap, username, email, dan password (disimpan dalam bentuk hash — tidak pernah plain text).
- [ ] Owner dapat melihat daftar semua user cashier beserta status aktif/nonaktif.
- [ ] Owner dapat mereset password cashier.
- [ ] Owner dapat menonaktifkan akun cashier — akun yang dinonaktifkan tidak dapat login, namun data transaksinya tetap tersimpan dan terlacak.

### 3.6 Dashboard Laporan

Pusat analitik dan pemantauan penjualan.

**Acceptance Criteria:**
- [ ] Menampilkan *metric cards* untuk: Total Revenue (dengan filter harian/mingguan/bulanan) dan Total Transaksi di periode tersebut.
- [ ] Menampilkan daftar atau grafik **Produk Terlaris** (*Top Selling Items*) di rentang waktu yang dipilih, beserta jumlah unit terjual.
- [ ] Menampilkan performa per Cashier: total jumlah transaksi dan total revenue yang diproses per kasir di periode tersebut.
- [ ] Data laporan diperbarui secara *near real-time* (maksimum jeda: setelah halaman di-refresh).

### 3.7 Manajemen Promo dan Diskon

Pengelolaan kampanye marketing dan potongan harga untuk transaksi.

**Acceptance Criteria:**
- [ ] Owner dapat membuat skema promo baru dengan pilihan dua tipe: **Persentase** (misal diskon 15%) atau **Nominal Fix** (misal potongan Rp 10.000).
- [ ] Owner dapat mengatur parameter promo: nama promo, kode promo, batas kuota maksimal penggunaan, tanggal mulai berlaku, dan tanggal berakhir.
- [ ] Promo yang sudah kedaluwarsa atau habis kuota secara otomatis tidak dapat dipilih oleh Cashier.
- [ ] Owner dapat menonaktifkan promo secara manual sebelum masa berlakunya habis.

### 3.8 Export Laporan ke CSV

Ekspor data penjualan untuk keperluan akuntansi atau dokumentasi eksternal.

**Acceptance Criteria:**
- [ ] Owner dapat menentukan rentang tanggal (dari tanggal sekian sampai tanggal sekian).
- [ ] Sistem men-generate dan mengunduh file berformat `.csv` yang berisi rekap penjualan historis untuk periode terkait.
- [ ] Kolom CSV minimal mencakup: No. Transaksi, Tanggal, Nama Cashier, Item (ringkasan), Subtotal, Diskon, Grand Total, Metode Bayar, Status.

---

## 4. Fitur Authentication (Shared)
 
 ### 4.1 Login & Logout
 
 Mekanisme keamanan untuk mengakses sistem bagi Owner dan Cashier.
 
 **Acceptance Criteria:**
 - [ ] Pengguna dapat masuk (Login) menggunakan kredensial email dan password.
 - [ ] Pengguna dapat keluar (Logout) untuk mengakhiri sesi.
 - [ ] Sistem memberikan token akses (JWT) yang valid setelah login sukses.
 
 ### 4.2 Registrasi Owner Utama
 
 Pendaftaran akun admin pertama kali saat instalasi sistem.
 
 **Acceptance Criteria:**
 - [ ] Menyediakan endpoint khusus untuk registrasi Owner pertama.
 - [ ] Mencegah registrasi Owner ganda jika sudah ada akun Owner aktif.
 
 ---
 
 ## 5. Fitur Cashier

### 4.1 Manajemen Shift

Mekanisme kontrol kas harian agar selisih uang dapat terdeteksi dan dilaporkan.

**Acceptance Criteria:**
- [ ] Cashier **wajib** membuka shift lebih dahulu (mengisi jumlah uang modal awal / petty cash di laci kas) sebelum bisa mengakses layar POS dan membuat transaksi baru.
- [ ] Satu cashier hanya bisa memiliki **satu shift aktif** pada satu waktu tertentu.
- [ ] Sebelum mengakhiri tugas, Cashier menutup shift — sistem menampilkan rekapitulasi: modal awal, total penerimaan tunai, total penerimaan digital, dan jumlah transaksi di shift tersebut.
- [ ] Shift yang sudah ditutup **tidak dapat dibuka kembali**.

### 4.2 Buat Transaksi Baru

Layar Point of Sales interaktif untuk melayani pelanggan.

**Acceptance Criteria:**
- [ ] Cashier dapat membuat keranjang pesanan baru.
- [ ] Cashier memilih tipe layanan: **Dine In** (wajib memilih nomor meja aktif) atau **Takeaway**.
- [ ] Cashier dapat memilih produk dari daftar menu yang aktif dan mengatur quantity setiap item.
- [ ] Subtotal keranjang dihitung secara real-time berdasarkan harga dari backend, termasuk pajak (bila dikonfigurasi).
- [ ] Cashier mendapat notifikasi atau peringatan jika stok produk tidak mencukupi untuk item yang dipilih.

### 4.3 Apply Promo Aktif ke Transaksi

Penggunaan diskon oleh kasir pada saat checkout.

**Acceptance Criteria:**
- [ ] Di halaman checkout, Cashier dapat melihat daftar promo/diskon yang masih aktif dan valid.
- [ ] Cashier hanya dapat menerapkan **1 (satu) promo** per transaksi.
- [ ] Setelah promo diterapkan, nilai grand total akhir yang harus dibayar ter-update secara otomatis dan ditampilkan dengan jelas.

### 4.4 Checkout dengan Midtrans Snap

Integrasi *payment gateway* untuk pembayaran non-tunai.

**Acceptance Criteria:**
- [ ] Cashier dapat memilih metode pembayaran: **Cash** atau **Midtrans**.
- [ ] Jika memilih **Midtrans**, sistem backend membuat *Snap Token* dan frontend menampilkan Midtrans Snap UI (pop-up) kepada Cashier/pelanggan.
- [ ] Dari Midtrans Snap UI, pelanggan dapat memilih metode: GoPay, QRIS, Transfer Bank, dll.
- [ ] Sistem otomatis **menyelesaikan (confirm) transaksi** setelah backend Go menerima *webhook success callback* dari Midtrans.
- [ ] Stok produk baru dikurangi **setelah** webhook konfirmasi pembayaran diterima, bukan saat order dibuat atau checkout di-trigger.

### 4.5 Lihat Riwayat Transaksi Shift Hari Ini

Sistem histori pemesanan ringkas untuk shift aktif.

**Acceptance Criteria:**
- [ ] Cashier dapat mengakses daftar transaksi yang telah diproses pada shift aktif atau hari tersebut.
- [ ] Daftar menampilkan: No. Transaksi, Waktu, Nama Meja / Takeaway, Grand Total, dan Status (Lunas / Menunggu Pembayaran).
- [ ] Cashier dapat melihat detail item dari setiap transaksi di riwayat tersebut.

---

## 6. Business Rules

### Tentang Stok
- Stok hanya berkurang setelah webhook Midtrans confirmed diterima
- Cashier **tidak bisa** menambah item ke order jika stok produk tidak mencukupi.
- Owner bisa melakukan adjustment stok manual, namun **wajib mengisi alasan** yang akan dicatat di riwayat pergerakan.

### Tentang Shift
- Cashier harus buka shift sebelum bisa membuat transaksi baru
- Satu cashier hanya bisa punya **satu shift aktif** di satu waktu.
- Shift yang sudah ditutup **tidak bisa dibuka kembali**.
- Laporan shift hanya bisa dilihat oleh cashier pemilik shift tersebut dan oleh Owner.

### Tentang Transaksi
- Order yang sudah checkout tidak bisa diubah itemnya
- Satu transaksi hanya bisa menggunakan satu promo
- Promo hanya bisa diaplikasikan jika: (1) masih dalam periode aktif, (2) belum mencapai batas kuota penggunaan, dan (3) status promo masih aktif.
- Transaksi yang gagal bayar (timeout Midtrans) berstatus **FAILED** dan stok tidak berkurang.

### Tentang User
- Owner **tidak bisa dihapus** dari sistem; hanya bisa ada satu akun Owner.
- Cashier yang dinonaktifkan **tidak bisa login**, namun seluruh data transaksinya tetap tersimpan dan dapat dilacak di laporan Owner.
- Password disimpan menggunakan algoritma hashing yang aman (bcrypt).

### Tentang Promo
- Satu promo hanya bisa memotong harga total, **tidak berlaku untuk item spesifik** (berlaku untuk keseluruhan transaksi).
- Apabila diskon melebihi total harga, grand total minimum adalah **Rp 0** (tidak bisa negatif).

---

## 7. Out of Scope

Hal-hal berikut secara tegas **tidak masuk** dalam lingkup pengerjaan versi ini (v1.0):

- Aplikasi mobile (iOS/Android)
- Multi-outlet — sistem ini untuk satu outlet
- Loyalty program dan membership pelanggan
- Integrasi dengan mesin kasir atau printer struk hardware
- Manajemen karyawan selain user cashier
- Fitur reservasi meja
- Notifikasi real-time (WebSocket/Push)
- Manajemen supplier / purchase order

---
 
 ## 8. Git & Workflow Development
 
 ### 8.1 Tujuan
 
 - **`main`** selalu stabil dan siap deploy.
 - **`develop`** untuk integrasi semua fitur sebelum rilis.
 - Perubahan dikerjakan terisolasi di **feature branch** agar paralel dan mudah di-review.
 
 ### 8.2 Struktur Branch (Arsitektur)
 
 ```mermaid
 flowchart LR
 	A[Developer Workstation] -->|git push| B[(GitHub Remote)]
 	B --> C[Pull Request]
 	C -->|review + checks| D[develop]
 	D -->|release merge| E[main]
 	E -->|tag| F[(Release Tags)]
 
 	subgraph Branches
 		D
 		E
 	end
 
 	subgraph Feature Work
 		G[feature/*]
 		H[fix/*]
 		I[hotfix/*]
 	end
 
 	G --> C
 	H --> C
 	I -->|PR to main| E
 	I -->|back-merge| D
 ```
 
 ### 8.3 Peran Tiap Branch
 
 - **`main`**
     - Berisi kode produksi.
     - Setiap merge ke `main` harus lewat PR dan menghasilkan **tag versi**.
 - **`develop`**
     - Branch integrasi untuk QA internal.
     - Tempat semua `feature/*` dan `fix/*` digabungkan.
 - **`feature/<nama-fitur>`**
     - Untuk pengembangan fitur baru.
     - Dibuat dari `develop` dan merge kembali ke `develop` via PR.
 - **`fix/<nama-bug>`**
     - Untuk bugfix non-kritis yang ditujukan ke `develop`.
 - **`hotfix/<nama-issue>`**
     - Untuk perbaikan kritis produksi.
     - Dibuat dari `main`, merge ke `main`, lalu **back-merge** ke `develop`.
 
 ### 8.4 Konvensi Penamaan Branch
 
 - `feature/<nama-fitur>`
 - `fix/<nama-bug>`
 - `hotfix/<nama-issue>`
 - `chore/<nama-task>`
 - `docs/<nama-dokumen>`
 
 **Contoh:**
 
 - `feature/product-management`
 - `feature/cashier-shift`
 - `feature/midtrans-integration`
 - `fix/stock-not-decreasing-after-payment`
 - `hotfix/login-jwt-expired`
 - `docs/update-api-contract`
 
 ### 8.5 Aturan PR (Governance)
 
 - PR target default: **ke `develop`**.
 - PR wajib:
     - Deskripsi singkat perubahan.
     - Checklist testing (minimal: unit test atau manual steps).
     - Screenshot untuk perubahan UI (if ada).
 - Strategi merge yang disarankan: **Squash and merge** agar riwayat `develop` rapi.
 - CI checks (minimal):
     - Lint.
     - Unit test.
     - Build.
 
 ### 8.6 Alur Release (Arsitektur)
 
 ```mermaid
 sequenceDiagram
     actor Dev as Developer
     participant GH as GitHub
     participant DV as develop
     participant MN as main
     participant RL as Release/Tag
 
     Dev->>GH: Push feature/*
     Dev->>GH: Open PR to develop
     GH-->>Dev: Review + checks
     GH->>DV: Merge PR (squash)
     Dev->>DV: QA / smoke test
     Dev->>GH: Open PR develop -> main (release)
     GH->>MN: Merge release PR
     Dev->>RL: Create tag vX.Y.Z on main
 ```
 
 ### 8.7 Versioning & Tagging
 
 Gunakan **Semantic Versioning**: `vMAJOR.MINOR.PATCH`.
 
 - **MAJOR**: breaking change.
 - **MINOR**: fitur baru, backward compatible.
 - **PATCH**: bugfix.
 
 **Aturan:**
 
 - Tag dibuat **di `main`** setelah release merge.
 - Pesan merge release di `main` mengandung versi, contoh: `release: v1.0.0`.
 
 ---
 
 ## 9. Git Command Flow
 
 ### 9.1 Setup Repository Awal
 
 ```bash
 # clone
 git clone https://github.com/sulthan18/warungpos.git
 cd warungpos
 
 # pastikan main up-to-date
 git checkout main
 git pull origin main
 
 # buat develop dari main
 git checkout -b develop
 git push -u origin develop
 ```
 
 ### 9.2 Konfigurasi Awal (Sekali per Developer)
 
 ```bash
 git config --global user.name "Nama Lengkap"
 git config --global user.email "email@kamu.com"
 
 git config --global init.defaultBranch main
 
 # jika Windows
 git config --global core.autocrlf true
 ```
 
 ### 9.3 Workflow Fitur Baru (Ringkas)
 
 ```bash
 # sync develop terbaru
 git checkout develop
 git pull origin develop
 
 # buat feature branch
 git checkout -b feature/nama-fitur
 
 # kerja + commit kecil
 git add .
 git commit -m "feat(scope): deskripsi singkat"
 
 # push dan buat PR
 git push -u origin feature/nama-fitur
 ```
 
 ### 9.4 Rebase ke Develop (Saat Develop Bergerak)
 
 ```bash
 git checkout feature/nama-fitur
 git fetch origin
 git rebase origin/develop
 
 # jika conflict
 # selesaikan conflict -> git add -> lanjut
 git rebase --continue
 
 # push setelah rebase
 git push --force-with-lease
 ```
 
 ### 9.5 Hotfix (Produksi)
 
 ```bash
 # buat hotfix dari main
 git checkout main
 git pull origin main
 git checkout -b hotfix/nama-issue
 
 # commit
 git add .
 git commit -m "fix(scope): deskripsi hotfix"
 
 # PR ke main
 git push -u origin hotfix/nama-issue
 
 # setelah merge ke main, back-merge ke develop
 git checkout develop
 git pull origin develop
 git merge --no-ff main
 git push origin develop
 ```

