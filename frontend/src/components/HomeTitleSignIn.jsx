import image from '../assets/agrilogo.png';

function HomeTitleSignIn(){
    return (
        <>
        <div className="hometitlepage">
            <ul className="hometitle-navtop">
                <li><img src={image} className="icslogo" /></li>
                <li className="hometitle-title">Department of <br />Agriculture</li>
            </ul>
            <div className='hometitle-name'>FieldFare</div>
            <div className='hometitle-desc'>Skip the middleman, support farmers, savor <br />freshness!</div>
        </div>
        </>
    );
}

export default HomeTitleSignIn