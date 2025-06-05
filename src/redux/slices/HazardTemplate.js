import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";


export const getallhazardTemplates = createAsyncThunk(
  "getallHazardTemplate",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/hazardTemplate`);
      console.log("hazardTemplate", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);     


export const addhazardTemplate = createAsyncThunk( "addHazardTemplate", async( payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`${apiUrl}/hazardTemplate`, payload)
        return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
            }
})

export const updatehazardTemplate = createAsyncThunk( "updateHazardTemplate", async( {id , payload}, thunkAPI) => {
    try {
        const response = await axiosInstance.patch(`${apiUrl}/hazardTemplate/${id}`,
            payload)
            return response.data;
        } 
        catch(error) {
     return thunkAPI.rejectWithValue(error.message)
    }
}
)



const initialState = {
     hazardtemplate: [],
     loading: false,
     error: null

}
const hazardTemplateSlice =  createSlice(
  {
      name: "hazardtemplate",
    initialState,
    reducers: [],
extraReducers: (builder) =>
{
   builder
    .addCase(getallhazardTemplates.pending, (state, action) =>
        {
            state.loading = true,
            state.error = null

            })

    .addCase(getallhazardTemplates.fulfilled, (state, action) =>
    {
        state.loading = false,
        state.hazardtemplate = action.payload
    })
    .addCase(getallhazardTemplates.rejected, (state, action) =>
        {
            state.loading = false,
            state.error = action.payload
})

 .addCase(addhazardTemplate.pending, (state, action) =>
 {
    state.loading  = true,
    state.error = null
 })
 .addCase(addhazardTemplate.fulfilled, (state, action) =>
    {
        state.loading = false,
        state.hazardtemplate = [...state.hazardtemplate, action.payload];
    })
        .addCase(addhazardTemplate.rejected, (state, action) =>
            {
                state.loading = false,
                state.error = action.payload
        })

        .addCase(updatehazardTemplate.pending , (state) =>
        {
            state.loading = true,
            state.error = null;
        })
        .addCase(updatehazardTemplate.fulfilled, (state, action) => {
            state.loading = false;
            state.hazardtemplate = state.hazardtemplate.map((item) =>   
                {
                    if (item.id === action.payload.id) {
                        return action.payload;
                        }
        })
    }
)

.addCase(updatehazardTemplate.rejected, (state, action) =>
{
    state.loading = false,
      state .error = action.payload
})
                
  }
}
)

export default hazardTemplateSlice.reducer;