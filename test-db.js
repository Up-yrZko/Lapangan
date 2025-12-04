const Booking = require('./models/Booking');
const Field = require('./models/Field');
const User = require('./models/User');
const sequelize = require('./config/database');

async function testDatabase() {
  try {
    // Sync models
    await sequelize.sync();
    
    // Cek data users
    console.log('\n=== USERS ===');
    const users = await User.findAll();
    console.log('Total users:', users.length);
    users.forEach(u => console.log(`- ${u.username} (${u.role})`));
    
    // Cek data fields
    console.log('\n=== FIELDS ===');
    const fields = await Field.findAll();
    console.log('Total fields:', fields.length);
    fields.forEach(f => console.log(`- ${f.name} (Rp ${f.price})`));
    
    // Cek data bookings
    console.log('\n=== BOOKINGS ===');
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Field, attributes: ['name'] }
      ]
    });
    console.log('Total bookings:', bookings.length);
    bookings.forEach(b => {
      console.log(`- ${b.User.username} -> ${b.Field.name}`);
      console.log(`  Tanggal: ${b.booking_date}, Jam: ${b.start_time} - ${b.end_time}`);
      console.log(`  Status: ${b.status}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testDatabase();
