import '../css/Home_Button.css'

interface HomeButtonProps {
    message: string;
    iconUrl: string;
}
const HomeButton: React.FC<HomeButtonProps> = ({ message,iconUrl }) => {
    return(
        <div className="homeButton">
            <img src={iconUrl} alt="" className='homeButton__image'/>
            <p>{message}</p>
        </div>
    );
}

export default HomeButton;