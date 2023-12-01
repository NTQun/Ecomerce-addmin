import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deliveryServices from "./deliveryServices";
import { toast } from "react-toastify";

const getUserfromLocalStorage = localStorage.getItem("delivery")
  ? JSON.parse(localStorage.getItem("delivery"))
  : null;
const initialState = {
  delivery: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllOrderDeliver = createAsyncThunk(
  "order/delivery-allorder",
  async (thunkAPI) => {
    try {
      return await deliveryServices.getOrdersDelivery();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderDelivery = createAsyncThunk(
  "order/delivery-order",
  async (id, thunkAPI) => {
    try {
      return await deliveryServices.getOrderDelivery(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderDeliver = createAsyncThunk(
  "order/delivery-order-update",
  async (id, thunkAPI) => {
    try {
      return await deliveryServices.updateOrderDelivery(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateDelivery = createAsyncThunk(
  "orders/update-delivery",
  async (data, thunkAPI) => {
    try {
      return await deliveryServices.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderByShipper = createAsyncThunk(
  "orders/order-by-shipper",
  async (data, thunkAPI) => {
    try {
      return await deliveryServices.getOrderShipper(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteOrderByShipper = createAsyncThunk(
  "orders/delete-order-by-shipper",
  async (data, thunkAPI) => {
    try {
      return await deliveryServices.deleteOrderShipper(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deliverySlice = createSlice({
  name: "delivery",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer

      .addCase(getAllOrderDeliver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderDeliver.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deliveryOrder = action.payload;
        state.message = "success";
      })
      .addCase(getAllOrderDeliver.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDelivery.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleOrderDelivery = action.payload;
        state.message = "success";
      })
      .addCase(getOrderDelivery.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })

      .addCase(updateOrderDeliver.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderDeliver.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updateOrderDelivery = action.payload;
        state.message = "success";
      })
      .addCase(updateOrderDeliver.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDelivery.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedDelivery = action.payload;
        state.message = "success";
        let currentUserData = JSON.parse(localStorage.getItem("delivery"));
        console.log(currentUserData.token);
        let newUserData = {
          _id: currentUserData?._id,
          token: currentUserData?.token,
          firstname: action?.payload?.firstname,
          lastname: action?.payload?.lastname,
          email: action?.payload?.email,
          mobile: action?.payload?.mobile,
        };
        localStorage.setItem("delivery", JSON.stringify(newUserData));
        state.delivery = newUserData;

        toast.success("Profile Updated Successfully!");
      })
      .addCase(updateDelivery.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError) {
          toast.error(action.payload?.response?.data?.message);
        }
      })
      .addCase(getOrderByShipper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByShipper.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getOrderByShippery = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByShipper.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(deleteOrderByShipper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrderByShipper.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteOrderByShippery = action.payload;
        state.message = "success";
      })
      .addCase(deleteOrderByShipper.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});

export default deliverySlice.reducer;
