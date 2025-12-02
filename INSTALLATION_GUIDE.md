# 📖 Panduan Instalasi Lengkap - Sistem Booking Lapangan

## 📋 Table of Contents
1. [Persyaratan Sistem](#persyaratan-sistem)
2. [Instalasi Step by Step](#instalasi-step-by-step)
3. [Konfigurasi Database](#konfigurasi-database)
4. [Menjalankan Aplikasi](#menjalankan-aplikasi)
5. [Setup Data Sample](#setup-data-sample)
6. [Troubleshooting](#troubleshooting)

---

## 🖥️ Persyaratan Sistem

Sebelum memulai, pastikan Anda sudah memiliki:

- **XAMPP** (Apache + MySQL + PHP) → [Download](https://www.apachefriends.org/download.html)
- **Node.js >= 14.x** → [Download](https://nodejs.org)
- **npm** (bundled dengan Node.js)
- **Code Editor** (VS Code, Sublime, dll)
- **Browser Modern** (Chrome, Firefox, Edge)

### Verifikasi Instalasi

Buka PowerShell/CMD dan jalankan:

```bash
node --version
npm --version
```

---

## 🚀 Instalasi Step by Step

### Step 1: Persiapan Folder

```bash
# Navigasi ke folder XAMPP
cd C:\xampp\htdocs

# Folder LAPANGAN sudah ada, jika belum:
mkdir LAPANGAN
cd LAPANGAN
```

### Step 2: Download Project Files

Jika project sudah ada, pastikan struktur folder seperti ini:

```
LAPANGAN/
├── app.js
├── package.json
├── .env
├── models/
├── controllers/
├── routes/
├── views/
├── middleware/
├── config/
└── public/
```

### Step 3: Install Dependencies

```bash
# Pastikan berada di folder LAPANGAN
cd C:\xampp\htdocs\LAPANGAN

# Install semua package
npm install
```

**Output yang diharapkan:**
```
npm notice
npm notice New minor version of npm available: X.X.X → Y.Y.Y
npm notice
added 150+ packages in Xs
```

### Step 4: Verifikasi File Konfigurasi

Buka file `.env` dan pastikan:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=lapangan
PORT=5000
SESSION_SECRET=bookingsecret123
```

**Catatan**: Jika MySQL Anda menggunakan password, ubah `DB_PASS=` menjadi `DB_PASS=your_password`

---

## 🗄️ Konfigurasi Database

### Option 1: Dengan phpMyAdmin (Rekomendasi untuk Pemula)

1. **Buka XAMPP Control Panel**
   - Klik "Start" untuk Apache dan MySQL
   - Tunggu sampai keduanya berwarna hijau

2. **Akses phpMyAdmin**
   - Buka browser
   - Ketik: `http://localhost/phpmyadmin`
   - Masuk dengan username `root` (password kosong)

3. **Buat Database**
   - Klik "New" di panel sebelah kiri
   - Nama database: `lapangan`
   - Collation: `utf8mb4_general_ci`
   - Klik "Create"

4. **Database sudah siap!**
   - Aplikasi akan membuat tabel secara otomatis

### Option 2: Dengan Command Line

1. **Buka Terminal/PowerShell**

2. **Jalankan Command MySQL**
```bash
# Masuk ke MySQL console
"C:\xampp\mysql\bin\mysql.exe" -u root

# Di dalam MySQL, ketik:
CREATE DATABASE lapangan;
EXIT;
```

---

## ▶️ Menjalankan Aplikasi

### Step 1: Buka Terminal di Folder Project

```bash
# Navigasi ke folder project
cd C:\xampp\htdocs\LAPANGAN

# Atau gunakan Terminal di VS Code (Ctrl + `)
```

### Step 2: Jalankan Server

**Untuk Development (dengan auto-reload):**
```bash
npm run dev
```

**Atau Production:**
```bash
npm start
```

### Step 3: Verifikasi Server Berjalan

**Output yang diharapkan:**
```
> booking-lapangan@1.0.0 start
> node app.js

Server running at http://localhost:5000
Database synced successfully
```

### Step 4: Buka di Browser

- Ketik di URL: `http://localhost:5000`
- Anda akan melihat halaman landing

---

## 📊 Setup Data Sample (Optional)

Untuk menambahkan data sample (pengguna dan lapangan):

### Dengan phpMyAdmin

1. Buka `http://localhost/phpmyadmin`
2. Pilih database `lapangan`
3. Tab "SQL"
4. Copy isi file `setup_data.sql`
5. Paste ke dalam field SQL
6. Klik "Go"

### Dengan MySQL Command

```bash
"C:\xampp\mysql\bin\mysql.exe" -u root lapangan < setup_data.sql
```

### Akun Test yang Dibuat

**Admin:**
- Username: `admin`
- Password: `user123`

**User 1:**
- Username: `user1`
- Password: `user123`

**User 2:**
- Username: `user2`
- Password: `user123`

---

## 👤 Membuat Akun Baru

### Melalui Aplikasi (Rekomendasi)

1. Buka `http://localhost:5000`
2. Klik "Register"
3. Isi form:
   - Username: minimal 3 karakter
   - Email: valid email
   - Password: minimal 6 karakter
   - Konfirmasi Password: sama dengan password
4. Klik "Daftar"
5. Redirect ke halaman login
6. Login dengan akun baru

### Membuat Admin (via Database)

1. Buka phpMyAdmin
2. Pilih tabel `users`
3. Insert row baru dengan role `admin`
4. Password harus di-hash dengan bcryptjs

---

## 🌍 Akses Aplikasi

### URL Utama

| Halaman | URL |
|---------|-----|
| Beranda | http://localhost:5000 |
| Daftar | http://localhost:5000/auth/register |
| Login | http://localhost:5000/auth/login |
| Lapangan | http://localhost:5000/fields |
| Dashboard User | http://localhost:5000/user/dashboard |
| Dashboard Admin | http://localhost:5000/admin/dashboard |
| Kelola Lapangan | http://localhost:5000/admin/fields |

---

## 🐛 Troubleshooting

### Error: "Port 5000 already in use"

**Solusi:**
```bash
# Option 1: Ubah port di .env
PORT=5001

# Option 2: Kill process di port 5000 (PowerShell Admin)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

### Error: "Cannot find module 'sequelize'"

**Solusi:**
```bash
npm install
npm install sequelize mysql2
```

### Error: "Database connection failed"

**Checklist:**
1. ✅ MySQL sudah running di XAMPP
2. ✅ Database `lapangan` sudah dibuat
3. ✅ File `.env` sudah sesuai
4. ✅ Username/password MySQL sesuai

**Test Koneksi:**
```bash
"C:\xampp\mysql\bin\mysql.exe" -u root -e "SELECT 1;"
```

### Error: "Cannot GET /"

**Solusi:**
1. Pastikan server running (`npm start`)
2. Refresh browser (Ctrl + F5)
3. Check console untuk error details

### Database Error saat Booking

**Solusi:**
1. Pastikan jam selesai > jam mulai
2. Pastikan tanggal tidak di masa lalu
3. Lihat console server untuk detail error

---

## 📱 Testing Aplikasi

### Test User Registration & Login

1. Buka `http://localhost:5000/auth/register`
2. Isi form dengan data baru
3. Klik "Daftar"
4. Redirect ke login
5. Masukkan kredensial baru
6. Login berhasil!

### Test Admin Features

1. Login sebagai admin
2. Klik "Kelola Lapangan"
3. Tambahkan lapangan baru
4. Klik "Dashboard"
5. Lihat booking pending
6. Test Approve/Decline

### Test Booking (User)

1. Login sebagai user biasa
2. Klik "Lapangan"
3. Pilih lapangan
4. Klik "Booking Sekarang"
5. Isi form dengan:
   - Tanggal: hari depan
   - Jam Mulai: 18:00
   - Jam Selesai: 19:00
6. Klik "Lakukan Booking"
7. Cek status di Dashboard

---

## 📚 Struktur Folder Lengkap

```
LAPANGAN/
├── app.js                      # Entry point
├── package.json               # Dependencies list
├── .env                       # Environment config
├── setup_data.sql            # Sample data
├── README.md                 # Dokumentasi
│
├── config/
│   ├── database.js           # Database config
│   └── db.js                 # Database export
│
├── models/
│   ├── User.js              # User model
│   ├── Field.js             # Field model
│   └── Booking.js           # Booking model
│
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── fieldController.js   # Field logic
│   └── bookingController.js # Booking logic
│
├── routes/
│   ├── auth.js              # Auth routes
│   ├── field.js             # Field routes
│   ├── booking.js           # Booking routes
│   ├── user.js              # User routes
│   └── index.js             # Admin routes
│
├── middleware/
│   └── auth.js              # Auth middleware
│
├── views/
│   ├── index.ejs            # Landing
│   ├── fields.ejs           # Field list
│   ├── 404.ejs              # Error page
│   ├── partials/            # Reusable views
│   ├── auth/                # Auth pages
│   ├── booking/             # Booking pages
│   ├── user/                # User pages
│   └── admin/               # Admin pages
│
├── public/
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── js/
│       └── script.js        # Client scripts
│
└── node_modules/            # Packages (auto-created)
```

---

## ✅ Checklist Instalasi

- [ ] Node.js dan npm terinstall
- [ ] XAMPP MySQL berjalan
- [ ] Folder project di `C:\xampp\htdocs\LAPANGAN`
- [ ] File `.env` sudah dikonfigurasi
- [ ] Database `lapangan` sudah dibuat
- [ ] `npm install` sudah dijalankan
- [ ] Server berjalan di `http://localhost:5000`
- [ ] Bisa akses halaman landing
- [ ] Bisa membuat akun baru
- [ ] Bisa login dengan akun

---

## 🎉 Selesai!

Aplikasi Sistem Booking Lapangan sudah siap digunakan!

### Berikutnya:
1. **Explore Features**: Coba semua fitur aplikasi
2. **Add Data**: Tambahkan lapangan dan data booking
3. **Customize**: Sesuaikan warna, teks, dll
4. **Deploy**: Deployment ke server production (optional)

---

## 📞 Bantuan Lebih Lanjut

Jika mengalami masalah:

1. **Check Console**: Buka DevTools (F12) untuk melihat error
2. **Check Server**: Lihat terminal aplikasi untuk error details
3. **Check Database**: Buka phpMyAdmin untuk verifikasi data
4. **Read Docs**: Baca file README.md untuk informasi lebih

---

**Happy Booking! 🏐⚽🏸**

Dibuat dengan ❤️ untuk kemudahan manajemen lapangan olahraga.
