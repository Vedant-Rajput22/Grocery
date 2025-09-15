import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";
import axiosLib from "axios";

const Cart = () => {
  const {
    products = [],
    cartItems = {},
    setCartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,       
    user,
  } = useAppContext();

  const http = axios ?? axiosLib;

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      const itemsPayload = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      if (paymentOption === "COD") {
        const { data } = await http.post("/api/order/cod", {
          userId: user._id,
          items: itemsPayload,
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await http.post("/api/order/stripe", {
          userId: user._id,
          items: itemsPayload,
          address: selectedAddress._id,
        });
        if (data.success) {
          setCartItems({});
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const getCart = () => {
    const temp = [];
    for (const key in cartItems) {
      const product = products.find((p) => p._id === key);
      if (product) {
        
        temp.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(temp);
  };

  const getUserAddress = async () => {
    if (!user) return; 
    try {
      const { data } = await http.get("/api/address/get");
      if (data.success) {
        const list = data.addresses || [];
        setAddresses(list);
        setSelectedAddress(list[0] ?? null);
        if (!list.length) toast.error(data.message || "No addresses found");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  useEffect(() => {
    getUserAddress();
  }, [user]);

  if (!(products.length > 0 && cartItems)) return null;

  return (
    <div className="flex flex-col md:flex-row mt-12">
      {/* LEFT: Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary/60">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={product._id || index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3 text-gray-700"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <button
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
                aria-label={`Go to ${product.name}`}
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product?.image?.[0] || ""}
                  alt={product?.name || "product"}
                />
              </button>

              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p className="mr-2">Qty:</p>
                    <select
                      onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                      value={cartItems[product._id]}
                      className="outline-none border border-gray-300 rounded px-2 py-1 bg-white"
                    >
                      {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9)
                        .fill("")
                        .map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">
              ${(product.offerPrice * product.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
              aria-label="Remove from cart"
            >
              <img
                src={assets.remove_icon}
                alt="remove icon"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            className="group-hover:-translate-x-1 transition"
            alt="arrow icon"
          />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT: Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2 gap-3">
            <p className="text-gray-600">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer shrink-0"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 left-0 py-1 bg-white border border-gray-300 text-sm w-full z-20 rounded shadow-sm">
                {addresses.map((address, i) => (
                  <p
                    key={address._id || i}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-600 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state}, {address.country}.
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            value={paymentOption}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-700 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${getCartAmount().toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${(getCartAmount() * 0.02).toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${(getCartAmount() * 1.02).toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition rounded"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
