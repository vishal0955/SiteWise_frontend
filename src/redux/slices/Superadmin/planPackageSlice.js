import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance.jsx' 
import { apiUrl } from '../../../utils/config.js';
import { toast } from 'react-toastify';


export const fetchPlans = createAsyncThunk(
  'Plans/fetchPlans',
  async () => {
    const response = await axiosInstance.get(`${apiUrl}/planPackage`);
    return response.data; 
  }
);


// Add a new Plans
export const addPlans = createAsyncThunk(
  "Plan/addPlans",
  async (PlansData, thunkAPI) => {
    console.log(PlansData, "PlansData");
    try {
      const response = await axiosInstance.post(`${apiUrl}/planPackage`, PlansData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error adding Plans"
      );
    }
  }
);


export const fetchPlanDetails = createAsyncThunk(
  'Plan/fetchPlanDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/planPackage/${id}`);
      return response.data;
    } catch (error) {
      toast.error(" details");
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch ITP details");
    }
  }
);

export const updatePlan = createAsyncThunk(
    'Plans/updatePlan',
    async ({ id, updatedForm }, thunkAPI) => {
        console.log(updatedForm);
        
      try {
        const response = await axiosInstance.patch(`${apiUrl}/planPackage/${id}`,updatedForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "Error updating drawing");
      }
    });


export const deletePlan = createAsyncThunk('Plan/deletePlan', async (_id, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/planPackage/${_id}`);
    toast.success("Itps deleted successfully!");
    dispatch(fetchPlans());
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete planPackage!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

export const superadmindashboard = createAsyncThunk(
    'Plans/superadmindashboard',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/superadmindashboard`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data || "Dashboard fetch failed");
      }
    }
  );
  

const PlanSlice = createSlice({
  name: 'Plan',
  initialState: {
    Plans: [],
    dashboardData:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.Plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPlanDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.PlanDetails = action.payload;
      })
      .addCase(fetchPlanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    //    .addCase(deletePlan.pending, (state) => {
    //           state.loading = true;
    //           state.error = null;
    //           state.deleteSuccessMsg = '';
    //         })
    //         .addCase(deletePlan.fulfilled, (state, action) => {
    //           state.loading = false;
    //           state.data = state.data.filter((itp) => itp._id !== action.payload.id);
    //           state.deleteSuccessMsg = action.payload.message;
    //         })
    //         .addCase(deletePlan.rejected, (state, action) => {
    //           state.loading = false;
    //           state.error = action.payload;
    //         })
     .addCase(superadmindashboard.pending, (state) => {
        state.loading = true;
     })
     .addCase(superadmindashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload; 
      })
      
      .addCase(superadmindashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default PlanSlice.reducer;
