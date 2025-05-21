import { Link } from 'react-router-dom';


function MainPage() {
    return (
        <>
            <h1 style={{ textAlign: 'center', padding: '2rem', fontSize: '4rem' }}>1z10 </h1>
                <nav style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Link to="/players">
                        <button>Lista graczy</button>
                    </Link>
                </nav>
        </>
    );
}

export default MainPage;