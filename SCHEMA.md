# Database Schema: warungpos POS

## 1. Daftar Tabel
1. **users**: Menyimpan akun pengguna sistem (Owner dan Cashier).
2. **categories**: Menyimpan kategori pengelompokkan jenis produk (misal: Espresso Based, Pastry).
3. **products**: Menyimpan katalog produk, harga, dan ketersediaan.
4. **stock_movements**: Mencatat riwayat mutasi stok barang (pembelian, penjualan, penyesuaian).
5. **tables**: Menyimpan data meja restoran/coffee shop.
6. **promos**: Mengelola informasi potongan harga/kupon promosi.
7. **shifts**: Mencatat waktu dan data uang tunai shift kasir berjalan.
8. **orders**: Mencatat data *checkout* utama kasir.
9. **order_items**: Menyimpan baris detail produk dan harga historikal dalam setiap order.
10. **payments**: Menyimpan informasi pelunasan tagihan melalui sistem (termasuk Midtrans API).

---

## 2. Struktur Tabel & Kolom

### Tabel: `users`
Tabel ini menyimpan semua user: owner dan cashier.

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| name | VARCHAR(100) | NOT NULL | |
| email | VARCHAR(100) | UNIQUE, NOT NULL | |
| password | BYTEA | NOT NULL | |
| role | ENUM('owner','cashier') | NOT NULL | |
| is_active | BOOLEAN | DEFAULT TRUE | Toggle bisnis. Cashier dinonaktifkan histori tetap ada. |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Diupdate via aplikasi/trigger |
| deleted_at | TIMESTAMP | NULL | Penanda dihapus logis secara sistem |

### Tabel: `categories`
| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| name | VARCHAR(100) | NOT NULL | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Diupdate via aplikasi/trigger |
| deleted_at | TIMESTAMP | NULL | |

### Tabel: `products`
| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| category_id | UUID | NOT NULL, FK ke categories | |
| name | VARCHAR(100) | NOT NULL | |
| description | TEXT | NULL | |
| price | BIGINT | NOT NULL | Harga dalam sen (menghindari floating point error) |
| image_url | VARCHAR(255) | NULL | |
| is_available | BOOLEAN | DEFAULT TRUE | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Diupdate via aplikasi/trigger |
| deleted_at | TIMESTAMP | NULL | |

### Tabel: `stock_movements`
Menyimpan setiap perubahan stok sebagai record terpisah agar history bisa dilacak (bukan hanya menyimpan stok di products). Stok terkini dihitung dengan nilai SUM(quantity).

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| product_id | UUID | NOT NULL, FK ke products | |
| type | ENUM('purchase','sale','adjustment','return') | NOT NULL | Jenis mutasi stok |
| quantity | INT | NOT NULL | Bisa negatif untuk pengurangan |
| note | VARCHAR(255) | NULL | Alasan mutasi/adjustment manual |
| created_by | UUID | NOT NULL, FK ke users | Operator kasir/owner |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

### Tabel: `tables`
| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| name | VARCHAR(50) | NOT NULL, UNIQUE | |
| capacity | INT | NOT NULL | |
| is_active | BOOLEAN | DEFAULT TRUE | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Diupdate via aplikasi/trigger |
| deleted_at | TIMESTAMP | NULL | |

### Tabel: `promos`
| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| name | VARCHAR(100) | NOT NULL | |
| type | ENUM('percentage','nominal') | NOT NULL | |
| value | BIGINT | NOT NULL | |
| max_usage | INT | NULL | |
| current_usage | INT | DEFAULT 0 | |
| start_date | TIMESTAMP | NOT NULL | |
| end_date | TIMESTAMP | NULL | |
| is_active | BOOLEAN | DEFAULT TRUE | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Diupdate via aplikasi/trigger |
| deleted_at | TIMESTAMP | NULL | |

### Tabel: `shifts`
| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| cashier_id | UUID | NOT NULL, FK ke users | |
| opening_cash | BIGINT | NOT NULL | |
| closing_cash | BIGINT | NULL | |
| total_sales | BIGINT | DEFAULT 0 | Denormalisasi (rekap sales shift tanpa agregasi lagi) |
| status | ENUM('open','closed') | DEFAULT 'open' | |
| opened_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| closed_at | TIMESTAMP | NULL | |

### Tabel: `orders`
Dua tabel bersanding: `orders` bekerja dengan `order_items`. Tabel orders ini mengeksekusi header transaksi tersebut.

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| shift_id | UUID | NOT NULL, FK ke shifts | |
| table_id | UUID | NULL, FK ke tables | Nullable (bisa takeaway) |
| cashier_id | UUID | NOT NULL, FK ke users | |
| promo_id | UUID | NULL, FK ke promos | |
| status | ENUM('draft','pending_payment','paid','cancelled') | NOT NULL | |
| subtotal | BIGINT | NOT NULL | |
| discount_amount | BIGINT | DEFAULT 0 | |
| total | BIGINT | NOT NULL | |
| payment_method | VARCHAR(50) | NULL | |
| midtrans_order_id| VARCHAR(100) | UNIQUE, NULL | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Diupdate via aplikasi/trigger |

### Tabel: `order_items`
Tabel ini digunakan untuk menyalurkan detail produk yang dipesan. 

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| order_id | UUID | NOT NULL, FK ke orders | |
| product_id | UUID | NOT NULL, FK ke products | |
| quantity | INT | NOT NULL | |
| price | BIGINT | NOT NULL | Harga snapshot saat transaksi, bukan mengacu table produk saat ini |
| subtotal | BIGINT | NOT NULL | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

### Tabel: `payments`
| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | UUID | PRIMARY KEY | |
| order_id | UUID | NOT NULL, FK ke orders | |
| midtrans_order_id | VARCHAR(100) | NOT NULL | |
| midtrans_transaction_id | VARCHAR(100) | NULL | |
| status | ENUM('pending','paid','failed','expired') | NOT NULL | |
| amount | BIGINT | NOT NULL | |
| payment_type | VARCHAR(50) | NULL | |
| raw_notification | JSONB | NULL | Sangat penting untuk bukti dispute pembayaran |
| paid_at | TIMESTAMP | NULL | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Diupdate via aplikasi/trigger |

---

## 3. Relasi Antar Tabel

| Foreign Key Relationships | Keterangan |
|---|---|
| `[users.id]` ➔ `[orders.cashier_id]` | Mencatat kasir yang melayani pesanan |
| `[users.id]` ➔ `[shifts.cashier_id]` | Menghubungkan shift ke kasir tertentu |
| `[users.id]` ➔ `[stock_movements.created_by]` | Melacak aktor siapa yang merubah stok |
| `[categories.id]` ➔ `[products.category_id]` | Mengelompokkan tabel produk spesifik |
| `[products.id]` ➔ `[order_items.product_id]` | Menunjuk produk yang dibeli di dalam suatu nota order |
| `[products.id]` ➔ `[stock_movements.product_id]`| Melacak pergerakan mutasi inventaris pada produk tersebut |
| `[orders.id]` ➔ `[order_items.order_id]` | Menautkan baris item-item tunggal ke header nota utama |
| `[orders.id]` ➔ `[payments.order_id]` | Konfirmasi dan penerimaan pembayaran atas nota pesanan |
| `[shifts.id]` ➔ `[orders.shift_id]` | Merekam serangkaian transaksi kasir ke dalam shift hariannya |
| `[tables.id]` ➔ `[orders.table_id]` | Keterkaitan ketersediaan letak meja makan pada pesanan **Dine-in** |
| `[promos.id]` ➔ `[orders.promo_id]` | Tagihan pembayaran akan dipotong dari nilai promo referal ini |

---

## 4. Keputusan Desain Penting

1. **Tipe Data UUID untuk Semua Primary Key**
   - Menjamin skalabilitas database jika sistem perlu dipecah atau disinkronisasi online di masa depan.
   - Mengamankan sistem URL dari rentannya **IDOR** (Insecure Direct Object Reference).

2. **Dualitas `is_active` dan `deleted_at`**
   - Kolom `is_active` merupakan _toggle business logic_ di mana administrator (owner) dapat melarang _behavior_ sistem (menonaktifkan kasir agar tidak bisa login). Sebaliknya, `deleted_at` digunakan sebagai penanda logis terhapusnya _record_ demi memproteksi integritas **Foreign Key** terhadap bon masa lampau dari resiko kehancuran sistem.

3. **Penyimpanan Matriks Keuangan Menggunakan `BIGINT` (Sen)**
   - Sangat diharamkan melakukan pencatatan finansial melalui format `FLOAT` atau `DECIMAL` karena adanya insiden penumpukan defisit kecil (*rounding issues*). Dengan menetapkan `BIGINT` untuk nominal pecahan terkecil (sen Rp), server kebal terhadap _floating point error_.

4. **Kekakuan Historis Struk (*Harga Snapshot*)**
   - Kolom `price` pada tabel `order_items` meng-copy rujukan nilai harga dari `products` pada sepersekian detik terjadinya *Checkout*. Ini adalah arsitektur keharusan karena sistem mutlak _tidak boleh memanggil_ tarif terkini saat query cetak laporan nota kuno masa kemarin apabila produk telah berevolusi nilai harganya.

5. **Trade-Off Denormalisasi Data Akuntansi Shift**
   - Hadirnya `total_sales` pada kolom _shifts_ semata-mata adalah praktik denormalisasi untuk memangkas resiko kinerja dan kemacetan kueri. Daripada memaksa mesin mengeksekusi operasi _JOIN_ masif beserta kalkulasi Agregasi (SUM) atas ratusan ribu deret tabel pesanan, informasi rekap ini di-_hardcoded_ pada satu titik rekam.

6. **Merekam Notifikasi Payload Asli (Raw JSON)**
   - Parameter tipe `JSON` digunakan untuk mengabadikan entitas asli Webhook / _Third party event_. Data notifikasi Midtrans akan diserap mentah-mentah via kolom `payments.raw_notification`, yang bertindak ibarat **Black Box (flight recorder)** ketika adanya persengketaan verifikasi saldo atau putusnya jaringan di luar dari sistem lokal aplikasi ini.
