import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import User from "./User";
import Admin from "./Admin";
import ProfileAdmin from "./ProfileAdmin";
import UpdateFlight from "./UpdateFlight";
import AddFlights from "./AddFlights";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./Store";
import { useEffect } from "react";
import ViewFlights from "./ViewFlights";
import BookFlights from "./BookFlights";
import FlightCard from "./FlightCard";
import Bookings from "./Bookings";
import BookFlight from "./BookFlight";
import Book from "./Book";
import PassengerDetails from "./PassengerDetails";

function App() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  console.log("isUserLoggedIn : " + isUserLoggedIn);
  console.log("isAdminLoggedIn : " + isAdminLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("UserID")) {
      dispatch(userActions.login());
    }
    else if (localStorage.getItem("AdminID")) {
      dispatch(adminActions.login());
    }
  }, [dispatch])
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/User" element={<User />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        {isAdminLoggedIn &&
          <Route path="/ProfileAdmin" element={<ProfileAdmin />}></Route>
        }
        <Route path="/Update/:id" element={<UpdateFlight />}></Route>
        <Route path="/addFlight" element={<AddFlights />}></Route>
        {/* <Route path="/book" element={<BookFlights />}></Route> */}
        <Route path="/Card" element={<FlightCard />}></Route>
        <Route path="/view" element={<ViewFlights />}></Route>
        <Route path="/Bookings" element={<Bookings />}></Route>
        <Route path="/Book" element={<BookFlight />}></Route>
        <Route path="/BookFlights" element={<BookFlights />}></Route>
        <Route path="/Book/:id" element={<Book />}></Route>
        <Route path="/Passenger/:id" element={<PassengerDetails />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
