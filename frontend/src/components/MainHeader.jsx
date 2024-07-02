import image from '../assets/logo.png';

function MainHeader({title}){
    return (
        <>
        <header>
            <div className="mainheader-container">
                <ul className="mainheader-navtop">
                    <li><img src={image} className="mainheader-logo" /></li>
                    <li className="mainheader-title">{title}</li>
                </ul>
            </div>
        </header>
        </>
    );
}

export default MainHeader