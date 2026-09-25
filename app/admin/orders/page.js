export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy">Orders</h1>
          <p className="text-gray-500">View and manage customer orders</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
          <i className="fas fa-shopping-basket text-3xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No Orders Yet</h3>
        <p className="text-gray-500 mt-2">When customers place orders, they will appear here.</p>
      </div>
    </div>
  );
}
