# ⚡ QUICK START GUIDE

## 30 Detik Setup

```bash
# 1. Navigasi ke folder
cd C:\xampp\htdocs\LAPANGAN

# 2. Install dependencies
npm install

# 3. Buat database di phpMyAdmin
# Login ke http://localhost/phpmyadmin
# Buat database baru: lapangan

# 4. Jalankan aplikasi
npm start

# 5. Buka browser
# http://localhost:5000
```

---

## 🔐 Login Credentials (After Running setup_data.sql)

### Admin Account
- **Username:** admin
- **Password:** user123

### Regular User Accounts
- **Username:** user1 / user2
- **Password:** user123

---

## 🗺️ Main Pages

| Page | URL | Access |
|------|-----|--------|
| Home | http://localhost:5000 | Public |
| Fields | http://localhost:5000/fields | Public |
| Register | http://localhost:5000/auth/register | Public |
| Login | http://localhost:5000/auth/login | Public |
| User Dashboard | http://localhost:5000/user/dashboard | User Login Required |
| Admin Dashboard | http://localhost:5000/admin/dashboard | Admin Login Required |
| Manage Fields | http://localhost:5000/admin/fields | Admin Login Required |

---

## 📋 Common Tasks

### Create New User
1. Go to http://localhost:5000/auth/register
2. Fill in username, email, password
3. Click "Daftar"
4. Login with new credentials

### Add New Field (Admin)
1. Login as admin
2. Go to /admin/fields
3. Fill form at top
4. Click "Tambah Lapangan"

### Make a Booking (User)
1. Login as regular user
2. Go to /fields
3. Click "Booking Sekarang"
4. Select date & time
5. Click "Lakukan Booking"
6. Wait for admin approval

### Approve Booking (Admin)
1. Login as admin
2. Go to /admin/dashboard
3. Find booking in "Menunggu Approval"
4. Click "Setujui" button

---

## 🛠️ Troubleshooting

### "Port 5000 already in use"
```bash
# Change in .env
PORT=5001

# Then restart app
```

### "Cannot connect to database"
```bash
# Make sure MySQL is running in XAMPP
# Check DB credentials in .env
# Verify database 'lapangan' exists
```

### "Module not found"
```bash
npm install
```

---

## 📁 Project Structure

```
LAPANGAN/
├── models/          → Database schemas
├── controllers/     → Business logic
├── routes/          → URL routing
├── views/           → HTML templates
├── middleware/      → Authentication
├── public/          → CSS, JS, images
├── config/          → Database config
├── app.js           → Main app file
└── .env             → Environment vars
```

---

## 🚀 Development Mode

For auto-reload on file changes:

```bash
npm run dev
```

---

## 📊 Database

All tables created automatically on first run:
- `users` - User accounts
- `fields` - Lapangan data
- `bookings` - Booking records

---

## 🎨 Default Styling

- **Framework:** Bootstrap 5
- **Icons:** Bootstrap Icons
- **Color:** Blue primary (#0d6efd)
- **Layout:** Responsive Grid

---

## 📝 File Guide

| File | Purpose |
|------|---------|
| README.md | Full documentation |
| INSTALLATION_GUIDE.md | Detailed setup |
| FEATURES_CHECKLIST.md | Feature list |
| setup_data.sql | Sample data |
| .env | Configuration |

---

## 🔑 Key Features at a Glance

✅ User Registration & Login with password hashing
✅ Role-based access (Admin/User)
✅ Admin: Manage fields & approve bookings
✅ User: View fields & make bookings
✅ Automatic conflict detection
✅ Responsive mobile-friendly UI
✅ Form validation
✅ Database protection

---

## ⚡ Performance

- Server: Node.js + Express
- Database: MySQL + Sequelize ORM
- Frontend: EJS templates + Bootstrap 5
- Start time: < 2 seconds
- DB queries: Optimized

---

## 📞 Need Help?

1. Check console errors (F12)
2. Review terminal output
3. Check INSTALLATION_GUIDE.md
4. Verify database connection
5. Ensure all packages installed

---

## 🎯 Next Steps

1. **Explore:** Try all features
2. **Customize:** Edit colors, text, layouts
3. **Add Data:** Create fields and make bookings
4. **Deploy:** Move to production server (future)

---

**Ready? Start with:** `npm start`

Happy Booking! 🚀
