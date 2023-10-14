import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deliveryServices from "./deliveryServices";

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

export const loginDelivery = createAsyncThunk(
  "login/delivery",
  async (data, thunkAPI) => {
    try {
      return await deliveryServices.loginDelivery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
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

export const deliverySlice = createSlice({
  name: "delivery",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(loginDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginDelivery.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.delivery = action.payload;
        state.message = "success";
      })
      .addCase(loginDelivery.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
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
      });
  },
});

export default deliverySlice.reducer;
