import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminActions } from './Store'
import Login from './Login'
import { addAdmin } from './ApiHelpers'
import { ToastContainer, toast } from 'react-toastify';

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getData = (datas) => {
        addAdmin(datas.inputs, datas.signup)
            .then((data) => {
                if (data.message === "No Admin Found!" || data.message === "Incorrect password") {
                    showSuccessToast(data.message)
                }
                else {
                    dispatch(adminActions.login())
                    localStorage.setItem("AdminID", data.id)
                    localStorage.setItem("Token", data.token)
                    navigate("/")
                    console.log(adminActions.login());
                }
            })
    }

    const showSuccessToast = (message) => {
        toast.warning(message);
    };

    return (
        <div>
            <Login OnSubmit={getData} isAdmin={true} />
            <ToastContainer
                position="top-center"
                autoClose="500"
            />
        </div>
    )
}

export default Admin
