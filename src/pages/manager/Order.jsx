import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaPrint,
  FaFileDownload,
  FaCircle,
  FaChevronDown,
  FaChevronUp,
  FaCreditCard,
  FaMoneyBillWave,
  FaPaypal,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

const Order = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-5123",
      customer: "Anh Nguyen",
      email: "anh.nguyen@example.com",
      phone: "+1 (555) 123-4567",
      date: "2025-06-24",
      time: "10:15 AM",
      pickupTime: "11:30 AM",
      total: 24.99,
      status: "Completed",
      payment: {
        method: "Credit Card",
        status: "Paid",
        last4: "4242",
      },
      items: [
        { id: 1, name: "Highlands Arabica (1kg)", price: 14.99, quantity: 1 },
        { id: 2, name: "Vietnamese Coffee Sampler", price: 9.99, quantity: 1 },
      ],
    },
    {
      id: "ORD-5122",
      customer: "Minh Tran",
      email: "minh.tran@example.com",
      phone: "+1 (555) 987-6543",
      date: "2025-06-23",
      time: "2:30 PM",
      pickupTime: "4:00 PM",
      total: 35.5,
      status: "Processing",
      payment: {
        method: "PayPal",
        status: "Paid",
        email: "minh.tran@example.com",
      },
      items: [
        { id: 3, name: "Saigon Phin Filter Set", price: 19.99, quantity: 1 },
        { id: 4, name: "Robusta Dark Roast (500g)", price: 8.99, quantity: 1 },
        { id: 5, name: "Ceramic Coffee Mug", price: 6.52, quantity: 1 },
      ],
    },
    {
      id: "ORD-5121",
      customer: "Linh Pham",
      email: "linh.pham@example.com",
      phone: "+1 (555) 456-7890",
      date: "2025-06-23",
      time: "11:45 AM",
      pickupTime: "1:15 PM",
      total: 49.99,
      status: "Completed",
      payment: {
        method: "Credit Card",
        status: "Paid",
        last4: "1234",
      },
      items: [
        { id: 6, name: "Classic Coffee Bundle", price: 49.99, quantity: 1 },
      ],
    },
    {
      id: "ORD-5120",
      customer: "Hoa Le",
      email: "hoa.le@example.com",
      phone: "+1 (555) 789-0123",
      date: "2025-06-22",
      time: "9:20 AM",
      pickupTime: "10:45 AM",
      total: 32.99,
      status: "Shipped",
      payment: {
        method: "Cash",
        status: "Pending",
      },
      items: [
        { id: 7, name: "Vietnamese Coffee Sampler", price: 32.99, quantity: 1 },
      ],
    },
    {
      id: "ORD-5119",
      customer: "Tuan Vu",
      email: "tuan.vu@example.com",
      phone: "+1 (555) 234-5678",
      date: "2025-06-22",
      time: "3:15 PM",
      pickupTime: "5:00 PM",
      total: 39.98,
      status: "Completed",
      payment: {
        method: "Credit Card",
        status: "Paid",
        last4: "5678",
      },
      items: [
        { id: 8, name: "Robusta Dark Roast (2kg)", price: 39.98, quantity: 1 },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply filtering and sorting to orders
  const filteredOrders = orders
    .filter((order) => {
      // Filter by search term
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status
      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Handle sorting
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Processing":
        return "text-blue-500";
      case "Shipped":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  // Get payment method icon
  const getPaymentIcon = (method) => {
    switch (method) {
      case "Credit Card":
        return <FaCreditCard className="mr-2" />;
      case "PayPal":
        return <FaPaypal className="mr-2" />;
      case "Cash":
        return <FaMoneyBillWave className="mr-2" />;
      default:
        return null;
    }
  };

  // Get sorting indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <FaChevronUp className="ml-1 text-xs" />
    ) : (
      <FaChevronDown className="ml-1 text-xs" />
    );
  };

  return (
    <div className="px-1">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="md:flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div>
          <div className="relative">
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Completed">Completed</option>
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
            <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center">
            <FaPrint className="mr-2" /> Print
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center">
            <FaFileDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  <div className="flex items-center">
                    Order ID
                    {getSortIndicator("id")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("customer")}
                >
                  <div className="flex items-center">
                    Customer
                    {getSortIndicator("customer")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("date")}
                >
                  <div className="flex items-center">
                    Date
                    {getSortIndicator("date")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pickup Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("total")}
                >
                  <div className="flex items-center">
                    Total
                    {getSortIndicator("total")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {getSortIndicator("status")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customer}
                      </p>
                      <p className="text-xs">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <span className="text-xs text-gray-500">{order.time}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-gray-400" />
                      <span>{order.pickupTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      {getPaymentIcon(order.payment.method)}
                      <span>{order.payment.method}</span>
                    </div>
                    <span
                      className={`text-xs ${
                        order.payment.status === "Paid"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaCircle
                        className={`mr-2 text-xs ${getStatusColor(
                          order.status
                        )}`}
                      />
                      <span className="text-sm font-medium">
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-[#8B4513] hover:text-[#6B3105]"
                      onClick={() => viewOrderDetails(order)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredOrders.length}</span>{" "}
                  of <span className="font-medium">{orders.length}</span> orders
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#8B4513] text-sm font-medium text-white"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order Details - {selectedOrder.id}
                      </h3>
                      <div className="flex items-center">
                        <FaCircle
                          className={`mr-2 text-xs ${getStatusColor(
                            selectedOrder.status
                          )}`}
                        />
                        <span className="font-medium">
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Customer Information
                          </h4>
                          <p className="mt-1 font-medium">
                            {selectedOrder.customer}
                          </p>
                          <p className="text-sm text-gray-500">
                            {selectedOrder.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            {selectedOrder.phone}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Order Information
                          </h4>
                          <p className="mt-1 text-sm">
                            <span className="font-medium">Date: </span>
                            {new Date(selectedOrder.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Time: </span>
                            {selectedOrder.time}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Pickup Time: </span>
                            {selectedOrder.pickupTime}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Payment Information
                          </h4>
                          <div className="mt-1 flex items-center">
                            {getPaymentIcon(selectedOrder.payment.method)}
                            <span className="font-medium">
                              {selectedOrder.payment.method}
                            </span>
                          </div>
                          <p className="text-sm">
                            <span className="font-medium">Status: </span>
                            <span
                              className={
                                selectedOrder.payment.status === "Paid"
                                  ? "text-green-500"
                                  : "text-yellow-500"
                              }
                            >
                              {selectedOrder.payment.status}
                            </span>
                          </p>
                          {selectedOrder.payment.last4 && (
                            <p className="text-sm text-gray-500">
                              Card ending in {selectedOrder.payment.last4}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Order Items
                      </h4>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Item
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Qty
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedOrder.items.map((item) => (
                              <tr key={item.id}>
                                <td className="px-4 py-3 text-sm text-gray-900">
                                  {item.name}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-500">
                                  {item.quantity}
                                </td>
                                <td className="px-4 py-3 text-right text-sm text-gray-500">
                                  ${item.price.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50">
                            <tr>
                              <td
                                colSpan="3"
                                className="px-4 py-3 text-right text-sm font-medium text-gray-500"
                              >
                                Subtotal:
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                                ${selectedOrder.total.toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan="3"
                                className="px-4 py-3 text-right text-sm font-medium text-gray-500"
                              >
                                Tax:
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                                ${(selectedOrder.total * 0.08).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan="3"
                                className="px-4 py-3 text-right text-sm font-bold text-gray-900"
                              >
                                Total:
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                                ${(selectedOrder.total * 1.08).toFixed(2)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#8B4513] text-base font-medium text-white hover:bg-[#6B3105] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Order
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <FaPrint className="mr-2" /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
