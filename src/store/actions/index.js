import { data } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

export const fetchProducts = (queryString) => async (dispatch) => {
     try {
          dispatch({type: "IS_FETCHING"});
          const { data } = await api.get(`public/products?${queryString}`);
          dispatch({
               type: "FETCH_PRODUCTS",
               payload: data.content,
               pageNumber: data.pageNumber,
               pageSize: data.pageSize,
               totalElements: data.totalElements,
               totalPages: data.totalPages,
               lastPage: data.lastPage,
          });
          dispatch({type: "IS_SUCCESS"});
     } catch (error) {
          console.log(error);
          dispatch({
               type: "IS_ERROR",
               payload: error?.response?.data?.message || "Failed to Fetch Products",

          })
     }
};


export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "CATEGORY_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
         });
    }
};

export const addToCart = (data,qty = 1,toast) => 
     (dispatch, getState) => {
          console.log(getState());
          // Find the product
          const {products} = getState().products;
           
          const getProduct = products.find(
               (item) => item.productId === data.productId
          );

          if (!getProduct) {
               toast.error("Product details unavailable. Please refresh.");
               return;
          }
          
          // Check for stocks
          const isQuantityExist = getProduct.quantity >= qty;
          
          // If in stock ->add
          if(isQuantityExist) {
               dispatch({type: "ADD_CART", payload: {...data, quantity:qty}});
               localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
               toast.success(`${data?.productName} added to the Cart!`)
          } else {
               // If not -> error 

               toast.error("Out of Stock!");
          }
     };

export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    // Get the current cart state from Redux
    const { cart } = getState().carts;
 
    // Find the product in the cart using its productId
    const getProduct = cart.find(item => item.productId === data.productId);
 
    // If product is not found in the cart, stop and log a message
    if (!getProduct) {
      console.log("Product not in cart yet");
      return;
    }
 
    // Get the available stock of the product from backend
    // Use 'stock' if available, otherwise use the 'quantity' property
    const availableStock = getProduct.stock ?? getProduct.quantity;
 
    // Check if the current quantity in cart is less than available stock
    if (availableStock > currentQuantity) {
      // Increase the cart quantity by 1
      const newQuantity = currentQuantity + 1;
 
      // Update the local state to reflect the new quantity immediately
      setCurrentQuantity(newQuantity);
 
      // Dispatch an action to update the quantity in the Redux store
      dispatch({
        type: "ADD_CART",
        payload: { ...getProduct, quantity: newQuantity },
      });
 
      // Save the updated cart in localStorage for persistence
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      // If stock limit is reached, show an error message to the user
      toast.error("Quantity reached available stock limit.");
    }
  };


export const descreaseCartQuantity = (data, newQuantity) =>
     (dispatch,getState) => {
          dispatch({
               type: "ADD_CART",
               payload: {...data, quantity: newQuantity}
          });
          localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
     };

export const removeFromCart = (data,toast) =>
     (dispatch,getState) => {
          dispatch({
               type: "REMOVE_CART",
               payload: data
          });
          toast.success(`${data.productName} removed from cart.`);
          localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart)); 
     };

export const authenticateSignInUser 
      = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
          try {
               setLoader(true);
               const { data } = await api.post("/auth/signin",sendData);
               dispatch({
                    type: "LOGIN_USER",
                    payload: data
               });
               
               localStorage.setItem("auth", JSON.stringify(data));
               reset();
               toast.success("Login Success");
               navigate("/");
          } catch (error) {
               console.log(error);
               toast.error(error.response.data.message || "Internal Server Error");
          } finally {
               setLoader(false);
          }
};

export const registerNewUser
 = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
     try {
          setLoader(true);
          const { data } = await api.post("/auth/signup", sendData);
          reset();
          toast.success(data?.message || "User Register Successfully.")
          navigate("/login");
     } catch (error) {
          console.log(error);
          toast.error(error.response.data.message || "Internal Server Error")
     } finally {
          setLoader(false);
     }
 };

 export const logoutUser = (navigate) => (dispatch) => {
     dispatch({type:"LOG_OUT"});
     localStorage.removeItem("auth");
     navigate("/login")
 };

 // 🏠 Add or Update User Address
export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) =>
  async (dispatch, getState) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
      if (!addressId) {
        await api.post(`/addresses`, sendData); // interceptor adds token
      } else {
        await api.put(`/addresses/${addressId}`, sendData);
      }

      dispatch(getUserAddresses());
      toast.success("Address saved successfully");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      setOpenAddressModal(false);
    }
  };


export const getUserAddresses = () => async (dispatch, getState) => {
     try {
          dispatch({type: "IS_FETCHING"});
          const { data } = await api.get(`/addresses`);
          dispatch({type:"USER_ADDRESS",payload: data});
          dispatch({type:"IS_SUCCESS"});
     } catch (error) {
          console.log(error);
          dispatch({
               type: "IS_ERROR",
               payload: error?.response?.data?.message || "Failed to fetch user address"
          });
     }
};

export const selectUserCheckoutAddress = (address) => {
     localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
     return {
          type: "SELECT_CHECKOUT_ADDRESS",
          payload: address,
     }
};

export const deleteUserAddress
 = ({toast, addressId, setOpenDeleteModal, setSelectedAddress}) => async (dispatch, getState) => {
     try {
          dispatch(clearCheckoutAddress());
          setSelectedAddress(null); 
          dispatch({type: "BUTTON_LOADER"})
          await api.delete(`/addresses/${addressId}`);
          dispatch({type: "IS_SUCCESS"});
          dispatch(getUserAddresses());
          toast.success("Address Deleted Successfully.");
     } catch (error) {
          console.log(error)
          dispatch({
               type: "IS_ERROR",
               payload: error?.response?.data?.message || "Some Error Occurred",
          });
     } finally {
          setOpenDeleteModal(false);
          setSelectedAddress(null);  
     }
};

export const clearCheckoutAddress =() => {
     return {
          type: "REMOVE_CHECKOUT_ADDRESS",
     }
};

export const addPaymentMethod = (method) => {
     return {
          type: "ADD_PAYMENT_METHOD",
          payload: method,
     }
};

export const getUserCart = () => async (dispatch,getState) => {
     try {
          dispatch({type: "IS_FETCHING"});
          const {data} = await api.get('/carts/users/cart');
          dispatch({
               type: "GET_USER_CART_PRODUCTS",
               payload: data.products,
               totalPrice: data.totalPrice,
               cartId: data.cartId
          });
          localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
          dispatch({type: "IS_SUCCESS"});
     } catch (error) {
          dispatch({
               type: "IS_ERROR",
               payload: error?.response?.data?.message || "Failed to fetch cart items"
          });
     }
};

export const createUserCart = (sendCartItems) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    await api.post('/cart/create', sendCartItems); // send items in body

    await dispatch(getUserCart()); // refresh cart
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create cart items",
    });
  }
};
