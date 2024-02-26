import './formStyle.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Form({selectedSeats, setFormData, formData}) {
    const navigate = useNavigate();
    
    function handleChange(e, numbSeat, newValue) {
        setFormData((prevFormData) => {
            const updatedData = prevFormData.map((elm) =>
                elm.idAssento === numbSeat ? { ...elm, [newValue]: e.target.value } : elm
            );
            return updatedData;
        });
    }

    function isValidsCPF() {
        for(let i=0; i<formData.length; i++){
            if(formData[i].cpf.length !== 11 || !/^\d+$/.test(formData[i].cpf)){
                alert("type only valid(s) CPF (just 11 numbers)");
                return false;                                                                                                                                   
            }
        }
        return true;
    }

    function handleForm(e){
        e.preventDefault();
        if (!isValidsCPF()) return;
    
        const object = {
            ids: formData.map(elm => elm.idAssento),
            compradores: formData
        }
        console.log(object);
        const promise = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', object);
            promise
                .catch(() => alert("error reserving seats"))
                .then(() => navigate('/success'));
    }

    return (
        <form onSubmit={handleForm}>
            {selectedSeats.map((elm) => (
                <div key={elm}>
                    <h5>Seat {elm}</h5>
                    <label>Name: </label>
                    <br/>
                    <input type="text" placeholder="Type your name..." onChange={(e) => handleChange(e, elm, 'nome')} required />
                    <br/>
                    <label>CPF:</label>
                    <br/>
                    <input type="text" placeholder="Type your CPF..." onChange={(e) => handleChange(e, elm, 'cpf')} required />
                </div>
            ))}
            <button>Reserve seat(s)</button>
        </form>
    );
}   