import dbConnect from '@/lib/db';
import User from '@/models/User';
// import Order from '@/models/Order'; // Will be created later
// import Product from '@/models/Product'; // Will be created later

export default async function AdminDashboard() {
  await dbConnect();
  const userCount = await User.countDocuments();
  // const orderCount = await Order.countDocuments();
  // const productCount = await Product.countDocuments();
  
  // Mocks for now until models exist
  const orderCount = 0; 
  const productCount = 12; // Static products count
  const revenue = 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-500">Welcome to your admin control center</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <i className="fas fa-users text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold text-navy">{userCount}</h3>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <i className="fas fa-shopping-bag text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-navy">{orderCount}</h3>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
            <i className="fas fa-fish text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Products</p>
            <h3 className="text-2xl font-bold text-navy">{productCount}</h3>
          </div>
        </div>

        {/* Metric Card 4 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
            <i className="fas fa-rupee-sign text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <h3 className="text-2xl font-bold text-navy">₹{revenue}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Recent Activity</h2>
        <div className="text-center py-12 text-gray-400">
          <i className="fas fa-chart-line text-4xl mb-4 opacity-30"></i>
          <p>No recent activity to show</p>
        </div>
      </div>
    </div>
  );
}
