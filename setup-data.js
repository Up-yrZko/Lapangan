const sequelize = require('./config/database');
const User = require('./models/User');
const Field = require('./models/Field');
const bcryptjs = require('bcryptjs');

async function setupData() {
  try {
    await sequelize.sync();
    
    // Create admin user
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = bcryptjs.hashSync('admin123', 10);
      await User.create({
        username: 'admin',
        email: 'admin@lapangan.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created: admin / admin123');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    // Create sample fields
    const field1 = await Field.findOne({ where: { name: 'Lapangan Futsal A' } });
    if (!field1) {
      await Field.create({
        name: 'Lapangan Futsal A',
        description: 'Lapangan futsal ukuran standar',
        price: 100000,
        location: 'Jalan Merdeka No. 123',
        status: 'available'
      });
      console.log('✅ Field 1 created: Lapangan Futsal A');
    }
    
    const field2 = await Field.findOne({ where: { name: 'Lapangan Badminton' } });
    if (!field2) {
      await Field.create({
        name: 'Lapangan Badminton',
        description: 'Lapangan badminton dengan pencahayaan LED',
        price: 75000,
        location: 'Jalan Ahmad Yani No. 456',
        status: 'available'
      });
      console.log('✅ Field 2 created: Lapangan Badminton');
    }
    
    console.log('\n✅ Setup selesai!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupData();
