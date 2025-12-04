const sequelize = require('./config/database');
const User = require('./models/User');
const Field = require('./models/Field');
const Booking = require('./models/Booking');

async function checkDatabase() {
  try {
    await sequelize.sync();
    
    console.log('\n====== DATABASE STATUS ======\n');
    
    // Check Users
    const users = await User.findAll();
    console.log(`📌 USERS (${users.length}):`);
    users.forEach(u => console.log(`   - ${u.username} (${u.role})`));
    
    // Check Fields
    const fields = await Field.findAll();
    console.log(`\n📌 FIELDS (${fields.length}):`);
    fields.forEach(f => console.log(`   - ${f.name} - Rp ${f.price.toLocaleString('id-ID')}`));
    
    // Check Bookings
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Field, attributes: ['name'] }
      ],
      order: [['id', 'DESC']]
    });
    console.log(`\n📌 BOOKINGS (${bookings.length}):`);
    
    if (bookings.length === 0) {
      console.log('   Belum ada booking. Silakan buat booking melalui website.');
    } else {
      bookings.forEach(b => {
        console.log(`   ✓ ${b.User.username} -> ${b.Field.name}`);
        console.log(`     📅 ${b.booking_date} | ⏰ ${b.start_time} - ${b.end_time}`);
        console.log(`     Status: ${b.status}`);
        if (b.note) console.log(`     Note: ${b.note}`);
      });
    }
    
    console.log('\n==============================\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();
