import React from 'react'
import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react';

//components
import SmoothieCard from '../components/SmoothieCard';

function Home() {
    const [fetchError, setFetchError] = useState(null);
    const [smoothies, setSmoothies] = useState(null);
    const [orderBy, setOrderBy] = useState('created_at');

    useEffect(() => {
        const fetchSmoothies = async () => {

            let { data, error } = await supabase
                .from('smoothies')
                .select('*')
                .order(orderBy, { ascending: false })
    
            if (error) {
                setFetchError('Could not fetc smoothies');
                setSmoothies(null);
                console.log(error);
            }
            if (data) {
                setSmoothies(data);
                setFetchError(null);
                //console.log(data)
            }
        }

        fetchSmoothies();
    }, [orderBy])

    

    const handleDelete = async(smoothieId) => {
        setSmoothies((prevSmoothies)=>{
            return prevSmoothies.filter(sm=>sm.id!=smoothieId)
        })
    }

    return (
        <div className="page home">
            {fetchError && (<p>{fetchError}</p>)}
            {
                smoothies &&
                (
                    <div className='smoothies'>
                        <div className="order-by">
                            <p>Order By:</p>
                            <button onClick={()=>setOrderBy('created_at')}>Time Created</button>
                            <button onClick={()=>setOrderBy('title')}>Title</button>
                            <button onClick={()=>setOrderBy('rating')}>Rating</button>
                        </div>
                        <div className='smoothie-grid'>
                        {
                            smoothies.map(smoothie => (
                                <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
                            ))
                        }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Home