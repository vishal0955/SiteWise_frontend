import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../utils/config';


export const fetchElements = createAsyncThunk(
  'element/fetchElements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/buildingCategory`);
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createElement = createAsyncThunk(
  'element/createElement',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/buildingCategory`, submissionData, {
        headers: {
          'Content-Type':  'application/json',  
        },
      });
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deleteElement = createAsyncThunk(
  'element/deleteElement',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/buildingCategory/${id}`);
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const elementSlice = createSlice({
  name: 'element',
  initialState: {
    elements: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchElements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.elements = action.payload;
      })
      .addCase(fetchElements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      

      .addCase(createElement.fulfilled, (state, action) => {

        state.elements.push(action.payload);
      })
      .addCase(createElement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

    
      .addCase(deleteElement.fulfilled, (state, action) => {
        state.elements = state.elements.filter(
          (element) => element.id !== action.payload  
        );
      })
      .addCase(deleteElement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default elementSlice.reducer;
