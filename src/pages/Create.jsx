import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

function Create() {

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null)

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(title+","+method+","+rating)

        if(!title || !method || !rating){
            setFormError('Please fill in all the fields correctly');
            return;
        }

        const { data, error } = await supabase
            .from('smoothies')
            .insert([
                { title: title, method: method, rating: rating },
            ])
            .select()

        if(error){
            setFormError('Something went wrong !! Could not insert data, please try again after some time.')
            console.log(error);
        }
        if(data){
            console.log(data);
            setFormError(null);
            navigate('/');            
        }
        

    }

    return (
        <div className="page create">
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label>
                <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor='method'>Method:</label>
                <textarea type='text' id='method' value={method} onChange={(e) => setMethod(e.target.value)} />

                <label htmlFor='rating'>Rating:</label>
                <input type='number' id='rating' value={rating} onChange={(e) => setRating(e.target.value)} />

                <button>Create Smoothie Recepie</button>

                {formError && <p className='error'>{formError}</p>}

            </form>
        </div>
    )
}

export default Create