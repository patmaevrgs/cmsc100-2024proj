// import image from '../assets/uplogo.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AdminTitle({title}){
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <>
        <div className='admintitle-container'>
            <div className='admintitle-title'>
                <button onClick={handleBack} className='backbutton'><i id='backbtn-icon' className="fas fa-chevron-left" />Back</button>
                <h2>{title}</h2>
            </div>
        </div>
        </>
    );
}

export default AdminTitle;