# API Contract: warungpos POS

## 1. Base URL & Versioning
- **Base URL:** `/api/v1`
- **Content-Type:** `application/json`

## 2. Authentication
Sebagian besar endpoint memerlukan autentikasi kecuali untuk `Login` dan `Webhook Payment`.
- **Header:** `Authorization: Bearer <jwt_token>`

## 3. Standard Response Format

### Success Responses

**General Success (200 OK / 201 Created):**
```json
{
  "success": true,
  "message": "Operasi berhasil",
  "data": {
    // ... object or null
  }
}
```

**Success with Paginated List:**
```json
{
  "success": true,
  "message": "Daftar data berhasil diambil",
  "data": [
    // ... array of objects
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total_items": 100,
    "total_pages": 10
  }
}
```

### Error Responses

**Validation Error (422 Unprocessable Entity):**
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "field_name": ["deskripsi error", "error lainnya"],
    "email": ["format email tidak valid"]
  }
}
```

**General Error (4xx, 500):**
```json
{
  "success": false,
  "message": "Deskripsi singkat kesalahan"
}
```

---

## 4. HTTP Status Codes
- **200 OK:** Sukses untuk request GET dan PUT.
- **201 Created:** Sukses untuk request POST (penciptaan data).
- **400 Bad Request:** Request tidak valid atau tidak dapat diproses.
- **401 Unauthorized:** Tidak ada token, token tidak valid, atau token expired.
- **403 Forbidden:** Authenticated tapi tidak memiliki izin akses (Role tidak sesuai).
- **404 Not Found:** Resource/data yang dicari tidak ditemukan.
- **422 Unprocessable Entity:** Validasi input gagal.
- **429 Too Many Requests:** Terlalu banyak request (Rate limit).
- **500 Internal Server Error:** Terjadi kesalahan pada server.

---

## 5. Daftar Endpoint Berdasarkan Domain

### A. Auth

#### 1. Login
- **Method & Path:** `POST /api/v1/auth/login`
- **Akses:** Public
- **Request Body:**
  ```json
  {
    "email": "cashier1@warungpos.com",
    "password": "secretpassword"
  }
  ```
- **Response Sukses:**
  ```json
  {
    "success": true,
    "message": "Login berhasil",
    "data": {
      "user_id": "uuid-1234",
      "name": "Ahmad Cashier",
      "role": "cashier",
      "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
    }
  }
  ```

#### 2. Register (Owner)
- **Method & Path:** `POST /api/v1/auth/register`
- **Akses:** Public (Khusus pendaftaran Owner pertama kali)
- **Request Body:**
  ```json
  {
    "name": "Owner Warung",
    "email": "owner@warungpos.com",
    "password": "strongpassword"
  }
  ```
- **Response Sukses:**
  ```json
  {
    "success": true,
    "message": "Pendaftaran berhasil",
    "data": {
      "user_id": "uuid-owner-1",
      "name": "Owner Warung",
      "role": "owner"
    }
  }
  ```

#### 3. Logout
- **Method & Path:** `POST /api/v1/auth/logout`
- **Akses:** Protected (Bearer Token)
- **Response Sukses:**
  ```json
  {
    "success": true,
    "message": "Logout berhasil"
  }
  ```

---

### B. Categories

#### 1. Get All Categories
- **Method & Path:** `GET /api/v1/categories`
- **Akses:** Owner, Cashier
- **Response Sukses:**
  ```json
  {
    "success": true,
    "message": "Daftar kategori berhasil diambil",
    "data": [
      {
        "id": "uuid-cat-1",
        "name": "Espresso Based"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total_items": 1,
      "total_pages": 1
    }
  }
  ```

#### 2. Create Category
- **Method & Path:** `POST /api/v1/categories`
- **Akses:** Owner
- **Request Body:**
  ```json
  {
    "name": "Pastry"
  }
  ```

#### 3. Update Category
- **Method & Path:** `PUT /api/v1/categories/:id`
- **Akses:** Owner

#### 4. Delete Category
- **Method & Path:** `DELETE /api/v1/categories/:id`
- **Akses:** Owner
- **Response Error (Jika masih ada produk aktif):** `400 Bad Request`
  ```json
  {
    "success": false,
    "message": "Kategori tidak dapat dihapus karena masih digunakan oleh produk aktif"
  }
  ```

---

### C. Products

#### 1. Get All Products
- **Method & Path:** `GET /api/v1/products?category_id=uuid&status=active&search=latte`
- **Akses:** Owner, Cashier

#### 2. Create Product
- **Method & Path:** `POST /api/v1/products`
- **Akses:** Owner
- **Request Body:**
  ```json
  {
    "category_id": "uuid-cat-1",
    "name": "Cafe Latte",
    "description": "Espresso with steamed milk",
    "price": 2500000,
    "image_url": "https://storage.etc/latte.jpg",
    "is_available": true
  }
  ```

#### 3. Update Product
- **Method & Path:** `PUT /api/v1/products/:id`
- **Akses:** Owner

#### 4. Toggle Product Status (Active/Inactive)
- **Method & Path:** `PATCH /api/v1/products/:id/status`
- **Akses:** Owner
- **Request Body:** `{"is_available": false}`

#### 5. Soft Delete Product
- **Method & Path:** `DELETE /api/v1/products/:id`
- **Akses:** Owner

---

### D. Stock

#### 1. Get Latest Stock Balances
- **Method & Path:** `GET /api/v1/stocks`
- **Akses:** Owner
- **Response Sukses:**
  ```json
  {
    "success": true,
    "message": "Data stok berhasil diambil",
    "data": [
      {
        "product_id": "uuid-prod-1",
        "product_name": "Cafe Latte",
        "current_stock": 50
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total_items": 1,
      "total_pages": 1
    }
  }
  ```

#### 2. Stock Adjustment (Manual In/Out)
- **Method & Path:** `POST /api/v1/stocks/adjust`
- **Akses:** Owner
- **Request Body:**
  ```json
  {
    "product_id": "uuid-prod-1",
    "type": "adjustment", // purchase | adjustment | return
    "quantity": -5, // Minus untuk pengurangan
    "note": "Barang expired"
  }
  ```

#### 3. Get Stock Movement History
- **Method & Path:** `GET /api/v1/stocks/movements?product_id=uuid`
- **Akses:** Owner

---

### E. Tables

#### 1. Get All Tables
- **Method & Path:** `GET /api/v1/tables`
- **Akses:** Owner, Cashier (Cashier hanya bisa melihat `is_active=true`)

#### 2. Create Table
- **Method & Path:** `POST /api/v1/tables`
- **Akses:** Owner
- **Request Body:** `{"name": "Meja 01", "capacity": 4}`

#### 3. Update Table / Status
- **Method & Path:** `PUT /api/v1/tables/:id`
- **Akses:** Owner

---

### F. Users / Cashier Management

#### 1. Get All Cashiers
- **Method & Path:** `GET /api/v1/users`
- **Akses:** Owner

#### 2. Create Cashier
- **Method & Path:** `POST /api/v1/users`
- **Akses:** Owner
- **Request Body:** `{"name": "Budi", "email": "budi@email.com", "password": "password123", "role": "cashier"}`

#### 3. Reset Password Cashier
- **Method & Path:** `PATCH /api/v1/users/:id/reset-password`
- **Akses:** Owner

#### 4. Toggle Cashier Status (Activate/Deactivate)
- **Method & Path:** `PATCH /api/v1/users/:id/status`
- **Akses:** Owner
- **Request Body:** `{"is_active": false}`

---

### G. Promos

#### 1. Get All Promos
- **Method & Path:** `GET /api/v1/promos?is_active=true`
- **Akses:** Owner, Cashier (Cashier butuh filter aktif)

#### 2. Create Promo
- **Method & Path:** `POST /api/v1/promos`
- **Akses:** Owner
- **Request Body:**
  ```json
  {
    "name": "Diskon Akhir Tahun",
    "type": "percentage", // atau 'nominal'
    "value": 15,
    "max_usage": 100,
    "start_date": "2026-12-01T00:00:00Z",
    "end_date": "2026-12-31T23:59:59Z"
  }
  ```

#### 3. Deactivate Promo Manually
- **Method & Path:** `PATCH /api/v1/promos/:id/status`
- **Akses:** Owner

---

### H. Reports

#### 1. Get Dashboard Metrics
- **Method & Path:** `GET /api/v1/reports/dashboard?range=today` // today, week, month
- **Akses:** Owner
- **Response Sukses:**
  ```json
  {
    "success": true,
    "message": "Dashboard metrics retrieved",
    "data": {
      "total_revenue": 150000000,
      "total_transactions": 45,
      "top_selling_products": [
        {"product_name": "Cafe Latte", "qty": 20}
      ],
      "cashier_performance": [
        {"cashier_name": "Ahmad", "total_revenue": 80000000, "transactions": 25}
      ]
    }
  }
  ```

#### 2. Export CSV
- **Method & Path:** `GET /api/v1/reports/export?start_date=2026-04-01&end_date=2026-04-30`
- **Akses:** Owner
- **Catatan:** Response dapat berupa file binary/CSV download langsung.

---

### I. Shifts

#### 1. Check Current Shift
- **Method & Path:** `GET /api/v1/shifts/current`
- **Akses:** Cashier

#### 2. Open Shift
- **Method & Path:** `POST /api/v1/shifts/open`
- **Akses:** Cashier
- **Request Body:**
  ```json
  {
    "opening_cash": 50000000 // dalam sen (Rp 500.000)
  }
  ```

#### 3. Close Shift
- **Method & Path:** `POST /api/v1/shifts/close`
- **Akses:** Cashier
- **Request Body:**
  ```json
  {
    "closing_cash": 120000000 // jumlah fisik cash yang ada dilaci
  }
  ```
- **Response Sukses:**
  ```json
  {
    "success": true,
    "message": "Shift ditutup",
    "data": {
      "expected_cash": 100000000,
      "total_sales": 150000000,
      "difference": 20000000 
    }
  }
  ```

---

### J. Orders

#### 1. Create Transaction (Checkout)
- **Method & Path:** `POST /api/v1/orders`
- **Akses:** Cashier (Wajib Shift Aktif)
- **Request Body:**
  ```json
  {
    "table_id": "uuid-table-1", // null jika takeaway
    "promo_id": "uuid-promo-1", // null jika tidak pakai promo
    "payment_method": "midtrans", // midtrans | cash
    "items": [
      {
        "product_id": "uuid-prod-1",
        "quantity": 2
      }
    ]
  }
  ```
- **Response Sukses:**
  ```json
  {
    "success": true,
    "message": "Order dibuat",
    "data": {
      "order_id": "uuid-order-1",
      "grand_total": 5000000,
      "payment_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/...", // Jika midtrans
      "status": "pending_payment"
    }
  }
  ```
- **Response Error (Stok Kurang):** `422 Unprocessable Entity`

#### 2. Get Transaction History for Current Shift
- **Method & Path:** `GET /api/v1/orders/history`
- **Akses:** Cashier (shift-nya sendiri) / Owner
- **Response Sukses:** Menampilkan histori ringkas dan status (Lunas / Menunggu Pembayaran).

#### 3. Get Order Details
- **Method & Path:** `GET /api/v1/orders/:id`
- **Akses:** Cashier / Owner

---

### K. Payments

#### 1. Midtrans Webhook Notification
- **Method & Path:** `POST /api/v1/payments/midtrans/notification`
- **Akses:** Public (Midtrans server only)
- **Request Body:** Standard Midtrans JSON payload (transaction_status, order_id, gross_amount, fraud_status).
- **Behavior Sistem:**
  - Verifikasi signature.
  - Update status order menjadi "paid" jika `settlement` atau `capture`.
  - Potong otomatis ketersediaan stok (`stock_movements` sale) **hanya jika berhasil dibayar**.
  - Simpan JSON murni ke field `raw_notification`.
