import { FaAddressBook, FaShoppingBag, FaCreditCard, FaBoxOpen } from "react-icons/fa";
import { formatPrice, formatPriceCalculation } from "../../utils/formatPrice";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-8/12 space-y-6">
          {/* BILLING ADDRESS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FaAddressBook className="text-indigo-600 text-2xl" />
              Billing Address
            </h2>

            {address ? (
              <div className="text-gray-700 leading-relaxed text-lg">
                <p className="font-medium text-gray-800">
                  {address?.buildingName}
                  {address?.street ? `, ${address?.street}` : ""}
                </p>
                <p>
                  {address?.city}
                  {address?.pinCode ? ` - ${address?.pinCode}` : ""}
                </p>
                <p>
                  {address?.state}, {address?.country}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No billing address provided.</p>
            )}
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
              <FaCreditCard className="text-indigo-600 text-2xl" />
              Payment Method
            </h2>
            <p className="text-gray-700 text-lg font-medium">
              {paymentMethod || "Not selected"}
            </p>
          </div>

          {/* ORDER ITEMS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FaShoppingBag className="text-indigo-600 text-2xl" />
              Order Items
            </h2>
            {cart?.length ? (
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div
                    key={item?.productId}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`${import.meta.env.VITE_BACK_END_URL}/images/${
                            item?.image
                        }`}
                        alt={item?.productName}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item?.productName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item?.quantity} × {formatPrice(item?.specialPrice)} ={" "}
                          <span className="font-semibold text-gray-800">
                            {formatPriceCalculation(
                              item?.quantity,
                              item?.specialPrice
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No items in cart.</p>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-4/12">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4 sticky top-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FaBoxOpen className="text-indigo-600 text-2xl" />
              Order Summary
            </h2>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Products Total</span>
                <span className="font-medium">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span className="font-medium">{formatPrice(0)}</span>
              </div>

              <div className="flex justify-between font-semibold text-gray-900 text-lg border-t border-gray-200 pt-3">
                <span>SubTotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
