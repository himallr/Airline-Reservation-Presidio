import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userActions } from './Store'
import Login from './Login'
import { addUser } from './ApiHelpers'

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getData = (datas) => {
        addUser(datas.inputs, datas.signup)
            .then((data) => {
                if (data.message === "Unable to find user") {
                    alert("Incorrect");
                }
                else {
                    dispatch(userActions.login())
                    localStorage.setItem("UserID", data.id)
                    navigate("/")
                    console.log(userActions.login());
                }
            })
    }

    return (
        <div>
            <Login OnSubmit={getData} isAdmin={false} />
        </div>
    )
}

export default User
