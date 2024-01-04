import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminActions } from './Store'
import Login from './Login'
import { addAdmin } from './ApiHelpers'

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getData = (datas) => {
        addAdmin(datas.inputs, datas.signup)
            .then((data) => {
                if (data.message === "Incorrrect Password") {
                    console.log(data.message);
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

    return (
        <div>
            <Login OnSubmit={getData} isAdmin={true} />
        </div>
    )
}

export default Admin
