import { useEffect, useState } from "react";
import UploadJson from '../../components/UploadJson/UploadJson';
import EditModal from "../../components/EditModal/EditModal";

import "./PlayersPage.css";

import BackButton from "../../components/BackButton/BackButton";


function PlayersPage() {
    const [players, setPlayers] = useState([]);
    const [editingPlayer, setEditingPlayer] = useState(null);

    const playerFields = [
        { key: "name", label: "Imię" },
        { key: "surname", label: "Nazwisko" },
        { key: "class", label: "Klasa" },
    ]

    const fetchPlayers = () => {
        window.api.getPlayers().then(setPlayers);
    }

    useEffect(() => {
        fetchPlayers();
    }, []);

    const handleEdit = (id) => {
        const player = players.find(p => p.id === id);
        setEditingPlayer(player);
    };

    const handleSave = async (updatedPlayer) => {
        await window.api.updatePlayer(updatedPlayer);
        setEditingPlayer(null);
        fetchPlayers();
    };

    return (
        <>
            <BackButton />
            <div>
                <h2>Lista graczy</h2>
                <div className="players-table-container">
                    <table className="players-table">
                        <thead>
                            <tr>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Klasa</th>
                                <th>Edycja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => (
                                <tr key={player.id}>
                                    <td>{player.name}</td>
                                    <td>{player.surname}</td>
                                    <td>{player.class}</td>
                                    <td>
                                        <button onClick={() => handleEdit(player.id)}>Edytuj</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <UploadJson
                    title="Importuj graczy"
                    sendJsonFunc={window.api.sendJsonPlayers}
                    onUploadSuccess={fetchPlayers}
                />

                {editingPlayer && (<EditModal
                    title="Edytuj gracza"
                    data={editingPlayer}
                    fields={playerFields}
                    onClose={() => setEditingPlayer(null)}
                    onSave={handleSave}
                    />
                )}
            </div>
        </>
    );  
}

export default PlayersPage;