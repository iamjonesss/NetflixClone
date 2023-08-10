import './Header.css'
import LogoNetflix from '../assets/Netflix.png'
import Avatar from '../assets/Netflix-Avatar.png'

export default ({black}) => {
    
    return (
        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <a className='logo-netflix' href="/">
                    <img src={LogoNetflix}  alt="Netflix" />
                </a>
            </div>

            <div className='header--user'>
                <a className='logo-user' href="/">
                    <img src={Avatar} alt="Usuário" />
                </a>
            </div>
        </header>    

    )
}