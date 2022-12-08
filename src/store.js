import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  alert: { variant: 'warning', label: '' }
}

const defaultSlice = createSlice({
  name: 'default',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload
    }
  }
})

export const { setAlert } = defaultSlice.actions
export const store = configureStore({ reducer: defaultSlice.reducer })