import { useState } from "react";
import {
  FaShoppingBag,
  FaUsers,
  FaMoneyBillWave,
  FaBoxOpen,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisV,
  FaSearch,
} from "react-icons/fa";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [period, setPeriod] = useState("week");

  // Sales data for different time periods
  const salesData = {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [2100, 1800, 2300, 2800, 3200, 4100, 3800],
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [9500, 11200, 12800, 14500],
    },
    year: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      values: [
        32000, 28000, 34000, 36000, 39000, 42000, 45000, 48000, 51000, 54000,
        58000, 62000,
      ],
    },
  };

  const recentOrders = [
    {
      id: "#ORD-5123",
      customer: "Anh Nguyen",
      product: "Highlands Arabica (1kg)",
      date: "2025-06-24",
      amount: "$24.99",
      status: "Completed",
    },
    {
      id: "#ORD-5122",
      customer: "Minh Tran",
      product: "Saigon Phin Filter Set",
      date: "2025-06-23",
      amount: "$35.50",
      status: "Processing",
    },
    {
      id: "#ORD-5121",
      customer: "Linh Pham",
      product: "Classic Coffee Bundle",
      date: "2025-06-23",
      amount: "$49.99",
      status: "Completed",
    },
    {
      id: "#ORD-5120",
      customer: "Hoa Le",
      product: "Vietnamese Coffee Sampler",
      date: "2025-06-22",
      amount: "$32.99",
      status: "Shipped",
    },
    {
      id: "#ORD-5119",
      customer: "Tuan Vu",
      product: "Robusta Dark Roast (2kg)",
      date: "2025-06-22",
      amount: "$39.98",
      status: "Completed",
    },
  ];

  // Top selling products data
  const topSellingProducts = [
    { name: "Highlands Arabica", sales: 432, percent: 28 },
    { name: "Saigon Phin Filter", sales: 327, percent: 21 },
    { name: "Robusta Dark Roast", sales: 251, percent: 16 },
    { name: "Vietnamese Coffee Sampler", sales: 189, percent: 12 },
    { name: "Coconut Coffee", sales: 153, percent: 10 },
  ];

  // Chart data for Sales Overview
  const salesChartData = {
    labels: salesData[period].labels,
    datasets: [
      {
        label: "Sales",
        data: salesData[period].values,
        backgroundColor: "rgba(139, 69, 19, 0.6)",
        borderColor: "#8B4513",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Chart data for Product Distribution
  const productChartData = {
    labels: topSellingProducts.map((product) => product.name),
    datasets: [
      {
        data: topSellingProducts.map((product) => product.percent),
        backgroundColor: [
          "#8B4513",
          "#A0522D",
          "#CD853F",
          "#D2B48C",
          "#DEB887",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Doughnut chart options
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="px-1">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back to your coffee shop management system
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium">
              Total Revenue
            </div>
            <div className="bg-blue-50 p-2 rounded-full">
              <FaMoneyBillWave className="text-blue-500" />
            </div>
          </div>
          <div className="flex items-end">
            <h3 className="text-2xl font-bold text-gray-800">$48,295.70</h3>
            <span className="ml-2 text-xs flex items-center text-green-500 font-medium">
              <FaArrowUp className="mr-1" /> +5.2%
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">Compared to last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium">
              Total Orders
            </div>
            <div className="bg-green-50 p-2 rounded-full">
              <FaShoppingBag className="text-green-500" />
            </div>
          </div>
          <div className="flex items-end">
            <h3 className="text-2xl font-bold text-gray-800">1,543</h3>
            <span className="ml-2 text-xs flex items-center text-green-500 font-medium">
              <FaArrowUp className="mr-1" /> +12.5%
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">Compared to last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium">
              Total Customers
            </div>
            <div className="bg-purple-50 p-2 rounded-full">
              <FaUsers className="text-purple-500" />
            </div>
          </div>
          <div className="flex items-end">
            <h3 className="text-2xl font-bold text-gray-800">842</h3>
            <span className="ml-2 text-xs flex items-center text-green-500 font-medium">
              <FaArrowUp className="mr-1" /> +8.3%
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">Compared to last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium">Products</div>
            <div className="bg-orange-50 p-2 rounded-full">
              <FaBoxOpen className="text-orange-500" />
            </div>
          </div>
          <div className="flex items-end">
            <h3 className="text-2xl font-bold text-gray-800">62</h3>
            <span className="ml-2 text-xs flex items-center text-red-500 font-medium">
              <FaArrowDown className="mr-1" /> -3.2%
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">4 products low in stock</p>
        </div>
      </div>

      {/* Sales Overview Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Sales Overview
            </h2>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setPeriod("week")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  period === "week"
                    ? "bg-[#8B4513] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Week
              </button>
              <button
                onClick={() => setPeriod("month")}
                className={`px-4 py-2 text-sm font-medium ${
                  period === "month"
                    ? "bg-[#8B4513] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border-t border-b border-gray-200`}
              >
                Month
              </button>
              <button
                onClick={() => setPeriod("year")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  period === "year"
                    ? "bg-[#8B4513] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } border border-gray-200`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-80">
            <Line data={salesChartData} options={chartOptions} />
          </div>
        </div>

        {/* Product Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Product Distribution
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              <FaEllipsisV />
            </button>
          </div>
          <div className="h-80 flex items-center justify-center">
            <Doughnut data={productChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="text-sm text-[#8B4513] font-medium hover:underline">
              View All Orders
            </button>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Top Selling Products
            </h2>
          </div>
          <div className="p-6">
            {topSellingProducts.map((product, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-3 ${
                  index !== topSellingProducts.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#8B4513] h-2 rounded-full"
                    style={{ width: `${product.percent}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {product.percent}%
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="text-sm text-[#8B4513] font-medium hover:underline">
              View All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
