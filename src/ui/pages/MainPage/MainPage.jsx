import { Link } from 'react-router-dom';

import "./MainPage.css";


function MainPage() {
    return (
        <>
            <h1 className='game-title'>1z10 </h1>
                <nav className='main-page-nav'>
                    <Link to="/players">
                        <button>Gracze</button>
                    </Link>
                    <Link to="/questions">
                        <button>Pytania</button>
                    </Link>
                </nav>
        </>
    );
}

export default MainPage;