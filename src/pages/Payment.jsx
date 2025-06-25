"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Banknote,
  MapPin,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  ArrowLeft,
  Shield,
  ChevronRight,
} from "lucide-react";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock order data (would come from cart/context in real app)
  const orderData = {
    items: [
      {
        id: 1,
        name: "Cà Phê Phin Truyền Thống",
        size: "Vừa (200ml)",
        temperature: "Nóng",
        quantity: 2,
        price: 30000,
        notes: "Ít đường, nhiều sữa",
      },
      {
        id: 2,
        name: "Cà Phê Trứng",
        size: "Lớn (250ml)",
        temperature: "Nóng",
        quantity: 1,
        price: 35000,
        notes: "",
      },
      {
        id: 3,
        name: "Bánh Mì Thịt Nướng",
        size: "Tiêu chuẩn",
        quantity: 1,
        price: 45000,
        notes: "Không rau mùi",
      },
    ],
    subtotal: 140000,
    discount: 14000,
    total: 126000,
    pickupTime: "14:30",
    orderNotes: "Gọi điện khi đến quán",
  };

  const paymentMethods = [
    {
      id: "cash",
      name: "Tiền Mặt",
      description: "Thanh toán khi lấy hàng",
      icon: Banknote,
      color: "from-green-500 to-green-600",
    },
    {
      id: "card",
      name: "Thẻ Tín Dụng",
      description: "Visa, Mastercard, JCB",
      icon: CreditCard,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "ewallet",
      name: "Ví Điện Tử",
      description: "MoMo, ZaloPay, VNPay",
      icon: Smartphone,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const handleInputChange = (section, field, value) => {
    if (section === "customer") {
      setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "card") {
      setCardInfo((prev) => ({ ...prev, [field]: value }));
    }

    // Clear errors
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer info validation
    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }
    if (!customerInfo.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!customerInfo.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Card validation if card payment selected
    if (paymentMethod === "card") {
      if (!cardInfo.cardNumber) {
        newErrors.cardNumber = "Vui lòng nhập số thẻ";
      } else if (cardInfo.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Số thẻ không hợp lệ";
      }
      if (!cardInfo.expiryDate) {
        newErrors.expiryDate = "Vui lòng nhập ngày hết hạn";
      }
      if (!cardInfo.cvv) {
        newErrors.cvv = "Vui lòng nhập CVV";
      }
      if (!cardInfo.cardName) {
        newErrors.cardName = "Vui lòng nhập tên trên thẻ";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      console.log("Order submitted:", {
        customerInfo,
        paymentMethod,
        cardInfo: paymentMethod === "card" ? cardInfo : null,
        orderData,
      });
      setIsProcessing(false);
      // In real app, redirect to success page
      alert("Đặt hàng thành công! Mã đơn hàng: #VN2024001");
    }, 3000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-amber-700 transition-colors">
            Trang Chủ
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/cart" className="hover:text-amber-700 transition-colors">
            Giỏ Hàng
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-amber-700 font-medium">Thanh Toán</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Thanh Toán Đơn Hàng
          </h1>
          <p className="text-xl text-gray-600">
            Hoàn tất thông tin để xác nhận đơn hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Thông Tin Khách Hàng
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và Tên *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        handleInputChange(
                          "customer",
                          "fullName",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-4 pl-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                        errors.fullName
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                      }`}
                      placeholder="Nhập họ và tên"
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số Điện Thoại *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        handleInputChange("customer", "phone", e.target.value)
                      }
                      className={`w-full px-4 py-4 pl-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                      }`}
                      placeholder="Nhập số điện thoại"
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        handleInputChange("customer", "email", e.target.value)
                      }
                      className={`w-full px-4 py-4 pl-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                      }`}
                      placeholder="Nhập địa chỉ email"
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Phương Thức Thanh Toán
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        paymentMethod === method.id
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Thông Tin Thẻ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số Thẻ *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "card",
                            "cardNumber",
                            formatCardNumber(e.target.value)
                          )
                        }
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                          errors.cardNumber
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ngày Hết Hạn *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.expiryDate}
                        onChange={(e) =>
                          handleInputChange(
                            "card",
                            "expiryDate",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                          errors.expiryDate
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cvv}
                        onChange={(e) =>
                          handleInputChange("card", "cvv", e.target.value)
                        }
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                          errors.cvv
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                        }`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.cvv}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tên Trên Thẻ *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cardName}
                        onChange={(e) =>
                          handleInputChange(
                            "card",
                            "cardName",
                            e.target.value.toUpperCase()
                          )
                        }
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                          errors.cardName
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                        }`}
                        placeholder="NGUYEN VAN A"
                      />
                      {errors.cardName && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.cardName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* E-wallet Options */}
              {paymentMethod === "ewallet" && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Chọn Ví Điện Tử
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {["MoMo", "ZaloPay", "VNPay"].map((wallet) => (
                      <button
                        key={wallet}
                        className="p-4 border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Smartphone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="font-medium text-gray-800">
                          {wallet}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Xác Nhận Đơn Hàng
              </h3>

              {/* Pickup Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <MapPin className="w-5 h-5 text-amber-700 mt-0.5" />
                  <div>
                    <div className="font-semibold text-amber-800">
                      Lấy Hàng Tại Quán
                    </div>
                    <div className="text-sm text-amber-700">
                      123 Nguyễn Huệ, Quận 1, TP.HCM
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Clock className="w-5 h-5 text-blue-700 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-800">
                      Thời Gian Lấy Hàng
                    </div>
                    <div className="text-sm text-blue-700">
                      Hôm nay {orderData.pickupTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-800">Món Đã Đặt</h4>
                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start text-sm"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-gray-600">
                        {item.size}{" "}
                        {item.temperature && `• ${item.temperature}`} • SL:{" "}
                        {item.quantity}
                      </div>
                      {item.notes && (
                        <div className="text-gray-500 italic">
                          Ghi chú: {item.notes}
                        </div>
                      )}
                    </div>
                    <div className="font-medium text-gray-800 ml-4">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Notes */}
              {orderData.orderNotes && (
                <div className="mb-6 p-3 bg-gray-50 rounded-2xl">
                  <div className="text-sm font-medium text-gray-800 mb-1">
                    Ghi chú đơn hàng:
                  </div>
                  <div className="text-sm text-gray-600">
                    {orderData.orderNotes}
                  </div>
                </div>
              )}

              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{orderData.subtotal.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span>-{orderData.discount.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí lấy hàng</span>
                  <span className="text-green-600 font-medium">Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Tổng cộng</span>
                    <span className="text-amber-700">
                      {orderData.total.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-2xl border border-green-100 mb-6">
                <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  Thông tin của bạn được bảo mật và mã hóa an toàn
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Đang Xử Lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Xác Nhận Đặt Hàng
                    </>
                  )}
                </button>

                <Link
                  to="/cart"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-gray-200 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay Lại Giỏ Hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
