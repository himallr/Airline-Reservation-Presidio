import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userActions } from './Store'
import Login from './Login'
import { addUser } from './ApiHelpers'
import { ToastContainer, toast } from 'react-toastify';

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getData = (datas) => {
        addUser(datas.inputs, datas.signup)
            .then((data) => {
                if (data.message === "No User Found!" || data.message === "Incorrect Password!") {
                    showSuccessToast(data.message)
                }
                else {
                    dispatch(userActions.login())
                    localStorage.setItem("UserID", data.id)
                    navigate("/")
                    console.log(userActions.login());
                }
            })
    }

    const showSuccessToast = (message) => {
        toast.warning(message);
    };

    return (
        <div>
            <Login OnSubmit={getData} isAdmin={false} />
            <ToastContainer
                position="top-center"
                autoClose="500"
            />
        </div>
    )
}

export default User
