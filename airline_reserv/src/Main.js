import React from 'react'
import flight from "./images/flight.jpg"
import FlightCard from './FlightCard'

const Main = () => {
  return (
    <div className="container-fluid" >
      <div className='row'>
        <div className='col-md-12'>
          <div className='card border-0 text-center'>
            <h2 className='text-primary'>Welcome to Our Arline Reservation!</h2>
            <div className='card-body'>
              <img className='card-img-top embed-responsive-item' src={flight} alt="slide2" height={400}></img>
            </div>
          </div>
        </div>
      </div>
      <FlightCard />
    </div>
  )
}

export default Main
