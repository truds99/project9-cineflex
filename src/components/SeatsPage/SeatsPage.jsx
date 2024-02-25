import { useEffect, useState } from 'react'
import './seatsPageStyle.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SeatCircle from '../SeatCircle/SeatCircle'
import Form from '../Form/Form'
import Bottom from '../Bottom/Bottom'

export default function SeatsPage({ movieSessions }) {
    const { idSession } = useParams();
    const [seats, setSeats] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [formData, setFormData] = useState([]);
    
    useEffect (() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`)
        promise
            .catch(() => alert("error getting seats"))
            .then(res => setSeats(res.data))
    }, [])

    return (
        <div className='seatsPage'>
            <h1>Select the seat(s)</h1>
            <div className='seats'>
                { seats.seats ? seats.seats.map((elm, idx) => 
                <SeatCircle 
                    key={idx} numberSeat={elm.name} isAvailable={elm.isAvailable}
                    setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats}
                    formData={formData} setFormData={setFormData}
                />) : ''
                }
            </div>
            <div className='labelSeats'>
                <div className='labelDuo'>
                    <div className='label selected'></div>
                    <h4>Selected</h4>
                </div>
                <div className='labelDuo'>
                    <div className='label true'></div>
                    <h4>Available</h4>
                </div>
                <div className='labelDuo'>
                    <div className='label false'></div>
                    <h4>Unavailable</h4>
                </div>
            </div>
            <Form selectedSeats={selectedSeats} formData={formData} setFormData={setFormData}/>
            <Bottom posterURL={movieSessions.posterURL} title={movieSessions.title} session={seats.day ? {hour: seats.name, weekday: seats.day.weekday} : ''}/>
        </div>
    )
}
 