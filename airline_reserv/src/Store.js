import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("UserID");
            state.isLoggedIn = false;
        }
    },
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
            console.log(state.isLoggedIn);
        },
        logout(state) {
            localStorage.removeItem("Token");
            localStorage.removeItem("AdminID");
            state.isLoggedIn = false;
        }
    },
});

export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin: adminSlice.reducer,
    },
});
