import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseClient'

function Update() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null)


    useEffect(() => {
        const fetchSmoothie = async () => {

            const { data, error } = await supabase
                .from('smoothies')
                .select("*")
                // Filters
                .eq('id', id)
                .single();
    
            if (error) {
                console.log(error);
                navigate('/', { replace: true });
            }
            if (data) {
                //console.log(data);            
                setTitle(data.title)
                setMethod(data.method)
                setRating(data.rating)
            }    
        }
        fetchSmoothie();
    }, [id, navigate]);    

    const handleUpdate = async(e) => {
        e.preventDefault();
        if (!title || !method || !rating) {
            setFormError('Please fill in all the fields correctly');
            return;
        }
        const { data, error } = await supabase
            .from('smoothies')
            .update({ title, method, rating })
            .eq('id', id)
            .select()

        if (error) {
            setFormError('Something went wrong !! Could not insert data, please try again after some time.')
            console.log(error);
        }
        if (data) {
            setFormError(null);
            navigate('/');
        }

    }


    return (
        <div className="page update">
            <form onSubmit={handleUpdate}>
                <label htmlFor='title'>Title:</label>
                <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor='method'>Method:</label>
                <textarea type='text' id='method' value={method} onChange={(e) => setMethod(e.target.value)} />

                <label htmlFor='rating'>Rating:</label>
                <input type='number' id='rating' value={rating} onChange={(e) => setRating(e.target.value)} />

                <button>Update Smoothie Recepie</button>
                {formError && <p>{formError}</p>}
            </form>
        </div>
    )
}

export default Update