const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  unit: String,
  image: String,
  icon: String,
  certification: String,
  inStock: Boolean,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Hardcoded products from app/data/products.js
const products = [
  {
    name: 'Premium Tiger Prawns',
    category: 'Prawns',
    price: 899,
    unit: '/kg',
    description: 'Large, fresh tiger prawns sourced from sustainable farms. Perfect for grilling and curries.',
    icon: 'fas fa-shrimp',
    certification: 'MSC Certified',
    inStock: true
  },
  {
    name: 'Fresh Atlantic Salmon',
    category: 'Fish',
    price: 1299,
    unit: '/kg',
    description: 'Rich, flavorful Atlantic salmon, perfect for pan-searing or baking.',
    icon: 'fas fa-fish',
    certification: 'ASC Certified',
    inStock: true
  },
  {
    name: 'Jumbo Crab Meat',
    category: 'Crabs',
    price: 1599,
    unit: '/kg',
    description: 'Sweet and tender jumbo lump crab meat, ideal for crab cakes or salads.',
    icon: 'fas fa-align-center',
    certification: 'ISO 22000',
    inStock: true
  },
  {
    name: 'Live Lobster',
    category: 'Lobster',
    price: 2499,
    unit: '/kg',
    description: 'Premium live lobster for the ultimate seafood feast.',
    icon: 'fas fa-dragon',
    certification: 'HACCP Certified',
    inStock: true
  },
  {
    name: 'Sea Bass Fillet',
    category: 'Fish',
    price: 799,
    unit: '/kg',
    description: 'Delicate, white-fleshed sea bass fillets, boneless and ready to cook.',
    icon: 'fas fa-fish',
    certification: 'MSC Certified',
    inStock: true
  },
  {
    name: 'Squid Rings',
    category: 'Squid',
    price: 599,
    unit: '/kg',
    description: 'Cleaned and cut squid rings, perfect for calamari.',
    icon: 'fas fa-ring', 
    certification: 'ISO 22000',
    inStock: true
  },
  {
    name: 'Fresh Tuna Steak',
    category: 'Fish',
    price: 1099,
    unit: '/kg',
    description: 'Thick, meaty tuna steaks, great for grilling or searing.',
    icon: 'fas fa-fish',
    certification: 'MSC Certified',
    inStock: true
  },
  {
    name: 'Mussels',
    category: 'Shellfish',
    price: 399,
    unit: '/kg',
    description: 'Fresh mussels, cleaned and ready for steaming.',
    icon: 'fas fa-venus-mars',
    certification: 'HACCP Certified',
    inStock: true
  },
  {
    name: 'King Prawns',
    category: 'Prawns',
    price: 699,
    unit: '/kg',
    description: 'Large, juicy king prawns, excellent for pasta or stir-fries.',
    icon: 'fas fa-shrimp',
    certification: 'ASC Certified',
    inStock: true
  },
  {
    name: 'Pomfret',
    category: 'Fish',
    price: 899,
    unit: '/kg',
    description: 'Whole pomfret fish, prized for its delicate flavor and texture.',
    icon: 'fas fa-fish',
    certification: 'ISO 22000',
    inStock: true
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products to avoid duplicates
    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log('Seeded products successfully');

  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedProducts();
