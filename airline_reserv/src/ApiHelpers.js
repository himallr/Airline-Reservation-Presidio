import axios from "axios";

export const addUser = async (datas, signup) => {
    const res = await axios.post(`http://localhost:3001/user/${signup ? "login" : "signup"}`, {
        Name: signup ? "" : datas.Name,
        Email: datas.Email,
        Password: datas.Password
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const addAdmin = async (datas, signup) => {
    const res = await axios.post("http://localhost:3001/admin/login", {
        Email: datas.Email,
        Password: datas.Password
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getAdminById = async (id) => {
    const res = await axios.get(`http://localhost:3001/admin/${id}`)
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getFlights = async () => {
    const res = await axios.get("http://localhost:3001/flight/")
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const addFlight = async (datas) => {
    const res = await axios.post("http://localhost:3001/flight/addFlight", {
        Flight_No: datas.Flight_No,
        Flight_Name: datas.Flight_Name,
        Source: datas.Source,
        Destination: datas.Destination,
        Timings: datas.Timings,
        Max_seats: datas.Max_seats,
        Pricing: datas.Pricing,
        Classes: datas.Classes,
        admin: localStorage.getItem("AdminID"),

    },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }

    )
        .catch((e) => console.log(e))
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    const resData = res.data;
    return resData;
}

export const updateFlights = async (id, datas) => {
    const res = await axios.put(`http://localhost:3001/flight/updateFlight/${id}`, {
        Timings: datas.Timings,
        Max_seats: datas.Max_seats,
        Pricing: datas.Pricing
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getFlightDetails = async (id) => {
    const res = await axios.get(`http://localhost:3001/flight/${id}`)
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getFlightName = async (filter) => {
    const res = await axios.get(`http://localhost:3001/flight/Search?filter=${filter}`)
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getBookings = async () => {
    const res = await axios.get("http://localhost:3001/booking/")
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const BookFlight = async (id, datas, user) => {
    const res = await axios.post("http://localhost:3001/booking/", {
        flights: id,
        date: datas.date,
        no_of_seats: datas.no_of_seats,

        user: user
    })
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const cancelTicket = async (id) => {
    const res = await axios.delete(`http://localhost:3001/booking/Cancel/${id}`)
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const removeFlight = async (id) => {
    const res = await axios.delete(`http://localhost:3001/flight/delete/${id}`)
        .catch((e) => {
            console.log(e);
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}