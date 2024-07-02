import image from '../assets/agrilogo.png';

function HomeTitleSignUp(){
    return (
        <>
        <div className="hometitlepage-su">
            <ul className="hometitle-navtop-su">
                <li><img src={image} className="icslogo-su" /></li>
                <li className="hometitle-title-su">Department of <br />Agriculture</li>
            </ul>
            <div className='hometitle-name-su'>FieldFare</div>
            <div className='hometitle-desc-su'>Skip the middleman, support farmers, savor freshness!</div>
        </div>
        </>
    );
}

export default HomeTitleSignUp