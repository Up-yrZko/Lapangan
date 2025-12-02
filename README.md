# Sistem Booking Lapangan Online

Sistem manajemen booking lapangan olahraga yang komprehensif dibangun dengan Node.js, Express.js, dan MySQL.

## 🎯 Fitur Utama

### 1. **Autentikasi User**
- ✅ Register akun baru
- ✅ Login dengan validasi
- ✅ Logout
- ✅ Password hashing dengan bcryptjs
- ✅ Session management

### 2. **Role-Based Access Control**
- **Admin**: Kelola lapangan dan approval booking
- **User**: Booking lapangan

### 3. **Manajemen Lapangan (Admin)**
- ✅ Tambah lapangan baru
- ✅ Edit data lapangan
- ✅ Hapus lapangan
- ✅ Tentukan harga dan lokasi
- ✅ Status ketersediaan lapangan

### 4. **Sistem Booking (User)**
- ✅ Lihat daftar lapangan tersedia
- ✅ Booking lapangan dengan tanggal dan jam
- ✅ Deteksi otomatis jadwal bentrok
- ✅ Tambahkan catatan booking
- ✅ Lihat status booking (Pending/Approved/Declined)

### 5. **Dashboard Admin**
- ✅ Lihat semua booking
- ✅ Filter status booking
- ✅ Approve atau decline booking
- ✅ Statistik booking
- ✅ Kelola data lapangan

### 6. **Dashboard User**
- ✅ Lihat booking saya
- ✅ Track status booking
- ✅ Informasi detail booking

### 7. **Validasi & Keamanan**
- ✅ Validasi input di server-side
- ✅ Pendeteksian jadwal bentrok
- ✅ Middleware proteksi route
- ✅ Password hashing
- ✅ Session validation

## 📋 Persyaratan Sistem

- Node.js >= 14.x
- MySQL >= 5.7 atau MariaDB >= 10.3
- npm atau yarn

## 📦 Stack Teknologi

- **Backend**: Node.js + Express.js
- **Frontend**: EJS Template Engine
- **Database**: MySQL + Sequelize ORM
- **Authentication**: bcryptjs + express-session
- **UI Framework**: Bootstrap 5
- **Icons**: Bootstrap Icons

## 🚀 Instalasi

### 1. Clone atau ekstrak project
```bash
cd c:\xampp\htdocs\LAPANGAN
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Database

**Pilihan A: MySQL Command Line**
```sql
CREATE DATABASE lapangan;
USE lapangan;
```

**Pilihan B: phpMyAdmin**
1. Buka `http://localhost/phpmyadmin`
2. Buat database baru dengan nama `lapangan`

### 4. Konfigurasi `.env`
Buat file `.env` di root project dengan isi:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=lapangan
PORT=5000
SESSION_SECRET=bookingsecret123
```

**Sesuaikan dengan konfigurasi MySQL Anda**

### 5. Jalankan Server

**Dengan npm:**
```bash
npm start
```

**Dengan nodemon (development):**
```bash
npm run dev
```

Server akan berjalan di: `http://localhost:5000`

## 🔑 Akun Default

Setelah instalasi, buat akun dengan:

### Buat Admin (di database)
```sql
INSERT INTO users (username, email, password, role) VALUES (
  'admin',
  'admin@example.com',
  '[bcrypt hash dari "password123"]',
  'admin'
);
```

Atau daftar melalui interface dan ubah role ke 'admin' di database.

### Buat User Biasa
1. Buka `http://localhost:5000/auth/register`
2. Isi form registrasi
3. Login dengan akun yang baru dibuat

## 📂 Struktur Folder

```
LAPANGAN/
├── app.js                 # Entry point aplikasi
├── package.json          # Dependencies
├── .env                  # Environment variables
├── config/
│   ├── database.js       # Sequelize configuration
│   └── db.js             # Database export
├── models/
│   ├── User.js           # User model
│   ├── Field.js          # Field (Lapangan) model
│   └── Booking.js        # Booking model
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── fieldController.js     # Field management logic
│   └── bookingController.js   # Booking logic
├── routes/
│   ├── auth.js           # Auth routes
│   ├── field.js          # Field routes
│   ├── booking.js        # Booking routes
│   ├── user.js           # User routes
│   └── index.js          # Admin routes
├── middleware/
│   └── auth.js           # Authentication middleware
├── views/
│   ├── index.ejs         # Landing page
│   ├── fields.ejs        # Daftar lapangan
│   ├── 404.ejs           # Error page
│   ├── partials/
│   │   ├── header.ejs    # HTML header
│   │   ├── navbar.ejs    # Navigation bar
│   │   └── footer.ejs    # Footer
│   ├── auth/
│   │   ├── login.ejs     # Login form
│   │   └── register.ejs  # Register form
│   ├── booking/
│   │   └── form.ejs      # Booking form
│   ├── user/
│   │   └── dashboard.ejs # User dashboard
│   └── admin/
│       ├── dashboard.ejs # Admin dashboard
│       └── fields.ejs    # Lapangan management
└── public/
    ├── css/
    │   └── style.css     # Custom styles
    └── js/
        └── script.js     # Client-side scripts
```

## 🔄 Alur Penggunaan

### 1. **Untuk User Baru**
```
Register → Login → Lihat Lapangan → Booking Lapangan → 
Dashboard (Lihat Status) → Menunggu Approval Admin
```

### 2. **Untuk Admin**
```
Login Admin → Dashboard → Lihat Booking Pending → 
Approve/Decline → User Melihat Update Status
```

## 📊 Database Schema

### Tabel Users
```sql
id (INT, PK, AI)
username (VARCHAR(100), UNIQUE)
email (VARCHAR(100), UNIQUE)
password (VARCHAR(255))
role (ENUM: 'admin', 'user')
```

### Tabel Fields
```sql
id (INT, PK, AI)
name (VARCHAR(100))
description (TEXT)
price (INT)
location (VARCHAR(255))
status (ENUM: 'available', 'unavailable')
```

### Tabel Bookings
```sql
id (INT, PK, AI)
user_id (INT, FK → users)
field_id (INT, FK → fields)
booking_date (DATE)
start_time (TIME)
end_time (TIME)
status (ENUM: 'Pending', 'Approved', 'Declined')
note (TEXT)
```

## 🎨 UI/UX

- **Responsive Design**: Kompatibel dengan desktop, tablet, dan mobile
- **Bootstrap 5**: Framework CSS modern dan fleksibel
- **Bootstrap Icons**: Ikon yang indah dan konsisten
- **Dark Mode Support**: Interface yang menyenangkan untuk mata

## ⚡ Fitur Keamanan

1. **Password Hashing**: Menggunakan bcryptjs dengan salt rounds 10
2. **SQL Injection Prevention**: Query parameterized dengan Sequelize
3. **Session Protection**: Session management dengan express-session
4. **CSRF Protection**: Dapat ditambahkan dengan middleware
5. **Input Validation**: Server-side validation di semua input
6. **Role-Based Access**: Middleware untuk proteksi route berdasarkan role

## 🐛 Troubleshooting

### Error: "Cannot find module 'sequelize'"
```bash
npm install sequelize mysql2
```

### Error: "Database connection failed"
1. Pastikan MySQL berjalan
2. Check `.env` configuration
3. Pastikan database sudah dibuat

### Error: "Port 5000 already in use"
```bash
# Change PORT in .env atau gunakan port lain
# Atau kill process yang menggunakan port 5000
```

### Booking tidak bisa dibuat
1. Check status lapangan di database
2. Pastikan jam mulai < jam selesai
3. Lihat console error untuk detail

## 📈 Pengembangan Lebih Lanjut

Fitur yang bisa ditambahkan:
- [ ] Payment gateway integration (Midtrans, Xendit)
- [ ] Email notification
- [ ] SMS notification
- [ ] Rating & review system
- [ ] Cancellation policy
- [ ] Recurring booking
- [ ] Export laporan (PDF/Excel)
- [ ] WhatsApp integration
- [ ] Multi-language support

## 📞 Dukungan

Untuk bantuan atau pertanyaan:
1. Check console error messages
2. Review database structure
3. Pastikan semua dependencies terinstall
4. Restart server dan database

## 📝 Lisensi

Project ini bebas digunakan untuk keperluan pendidikan dan komersial.

## 👨‍💻 Dibuat dengan ❤️

Sistem booking lapangan yang user-friendly dan feature-rich untuk kemudahan manajemen lapangan olahraga Anda.

---

**Happy Booking! 🏐⚽🏸**
