-- ============================================
-- SCRIPT SETUP DATA SAMPLE
-- ============================================

-- Insert Admin User (password: admin123)
INSERT INTO users (username, email, password, role) VALUES (
  'admin',
  'admin@example.com',
  '$2a$10$SX/YjOxvKH7kn8kGxiEBJu7d9l/BfAGqAOl9kJuYVKq9bVVVvt9aG',
  'admin'
);

-- Insert Regular Users (password: user123)
INSERT INTO users (username, email, password, role) VALUES (
  'user1',
  'user1@example.com',
  '$2a$10$SX/YjOxvKH7kn8kGxiEBJu7d9l/BfAGqAOl9kJuYVKq9bVVVvt9aG',
  'user'
);

INSERT INTO users (username, email, password, role) VALUES (
  'user2',
  'user2@example.com',
  '$2a$10$SX/YjOxvKH7kn8kGxiEBJu7d9l/BfAGqAOl9kJuYVKq9bVVVvt9aG',
  'user'
);

-- Insert Fields (Lapangan)
INSERT INTO fields (name, description, price, location, status) VALUES (
  'Lapangan Futsal Premium A',
  'Lapangan futsal berstandar internasional dengan AC',
  100000,
  'Jalan Merdeka No. 123, Jakarta',
  'available'
);

INSERT INTO fields (name, description, price, location, status) VALUES (
  'Lapangan Futsal Standard B',
  'Lapangan futsal standar dengan pencahayaan bagus',
  75000,
  'Jalan Sudirman No. 456, Jakarta',
  'available'
);

INSERT INTO fields (name, description, price, location, status) VALUES (
  'Lapangan Bulu Tangkis C',
  'Lapangan bulu tangkis indoor berstandar nasional',
  120000,
  'Jalan Gatot Subroto No. 789, Jakarta',
  'available'
);

INSERT INTO fields (name, description, price, location, status) VALUES (
  'Lapangan Voli D',
  'Lapangan voli indoor dengan net berkualitas',
  80000,
  'Jalan Diponegoro No. 321, Bandung',
  'available'
);

INSERT INTO fields (name, description, price, location, status) VALUES (
  'Lapangan Tenis E',
  'Lapangan tenis outdoor dengan permukaan clay',
  150000,
  'Jalan Ahmad Yani No. 654, Surabaya',
  'available'
);

-- Insert Sample Bookings
INSERT INTO bookings (user_id, field_id, booking_date, start_time, end_time, status, note) VALUES (
  2,
  1,
  DATE_ADD(CURDATE(), INTERVAL 7 DAY),
  '18:00:00',
  '19:30:00',
  'Approved',
  'Untuk pertandingan internal'
);

INSERT INTO bookings (user_id, field_id, booking_date, start_time, end_time, status, note) VALUES (
  3,
  2,
  DATE_ADD(CURDATE(), INTERVAL 5 DAY),
  '19:00:00',
  '20:30:00',
  'Pending',
  'Latihan rutin'
);

INSERT INTO bookings (user_id, field_id, booking_date, start_time, end_time, status, note) VALUES (
  2,
  3,
  DATE_ADD(CURDATE(), INTERVAL 10 DAY),
  '08:00:00',
  '09:30:00',
  'Pending',
  'Turnamen bulutangkis'
);

-- ============================================
-- NOTE: Passwords adalah hash dari "user123" dan "admin123"
-- Gunakan aplikasi untuk register user baru jika ingin membuat user dengan password yang diketahui
-- ============================================
