const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Manually parse .env file
const envPath = path.resolve(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    acc[key.trim()] = value.trim();
  }
  return acc;
}, {});

const MONGODB_URI = envVars.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  email: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function setAdmin(email) {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    if (!email) {
      console.log('No email provided. Listing all users...');
      const users = await User.find({});
      if (users.length === 0) {
        console.log('No users found.');
      } else {
        users.forEach(u => console.log(`- ${u.email} (${u.role || 'user'})`));
        console.log('\nUsage: node scripts/set-admin.js <email>');
      }
      return;
    }

    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log(`Successfully updated ${user.email} to role: ${user.role}`);
    } else {
      console.log(`User with email ${email} not found.`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

const email = process.argv[2];
setAdmin(email);
