import axios from "axios";

export const addUser = async (datas, signup) => {
    const res = await axios.post(`https://airline-reservation-server.vercel.app/user/${signup ? "login" : "signup"}`, {
        Name: signup ? "" : datas.Name,
        Email: datas.Email,
        Password: datas.Password
    })
        .catch((e) => {
            console.log("Enter Correct Username or Password!");
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const addAdmin = async (datas, signup) => {
    const res = await axios.post("https://airline-reservation-server.vercel.app/admin/login", {
        Email: datas.Email,
        Password: datas.Password
    })
        .catch((e) => {
            alert("Enter Correct Username or Password!");
        })
    if (res.status === 500) {
        return console.log("Unexpected error");
    }
    console.log(res.data);
    const resData = await res.data
    return resData;
}

export const getAdminById = async (id) => {
    const res = await axios.get(`https://airline-reservation-server.vercel.app/admin/${id}`)
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

//flights
export const getFlights = async () => {
    const res = await axios.get("https://airline-reservation-server.vercel.app/flight/")
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
    const res = await axios.get(`https://airline-reservation-server.vercel.app/flight/${id}`)
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
    const res = await axios.post("https://airline-reservation-server.vercel.app/flight/addFlight", {
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
    const res = await axios.put(`https://airline-reservation-server.vercel.app/flight/updateFlight/${id}`, {
        Flight_Name: datas.Flight_Name,
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

export const getFlightName = async (filter) => {
    const res = await axios.get(`https://airline-reservation-server.vercel.app/flight/Search?filter=${filter}`)
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
    const res = await axios.delete(`https://airline-reservation-server.vercel.app/flight/delete/${id}`)
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

export const filterSearch = async (flightClass, source, destination) => {
    const res = await axios.get(`https://airline-reservation-server.vercel.app/flight/Search/SDD/?flightClass=${flightClass}&source=${source}&destination=${destination}`)
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

//Bookings
export const getBookings = async () => {
    const res = await axios.get("https://airline-reservation-server.vercel.app/booking/")
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

export const getBookingsByID = async (id) => {
    const res = await axios.get(`https://airline-reservation-server.vercel.app/booking/${id}`)
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

export const getBookingsfromUser = async (id) => {
    const res = await axios.get(`https://airline-reservation-server.vercel.app/booking/fromUser/${id}`)
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

export const BookFlight = async (id, booking, Passenger, user) => {
    const res = await axios.post("https://airline-reservation-server.vercel.app/booking/", {
        flights: id,
        date: booking.date,
        no_of_seats: booking.no_of_seats,
        Passenger: Passenger,
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
    const res = await axios.delete(`https://airline-reservation-server.vercel.app/booking/Cancel/${id}`)
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
