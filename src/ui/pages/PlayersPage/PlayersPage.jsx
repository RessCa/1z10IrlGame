import { useEffect, useState } from "react";
import InfoTable from "../../components/InfoTable/InfoTable";
import UploadJson from '../../components/UploadJson/UploadJson';
import EditModal from "../../components/EditModal/EditModal";
import BackButton from "../../components/BackButton/BackButton";

import "./PlayersPage.css";


function PlayersPage() {
    const [players, setPlayers] = useState([]);
    const [editingPlayer, setEditingPlayer] = useState(null);

    const playerFields = [
        {key: "id", label: "ID"},
        {key: "name", label: "Imię" },
        {key: "surname", label: "Nazwisko" },
        {key: "class", label: "Klasa" },
    ]

    const fetchPlayers = () => {
        window.api.getPlayers().then(setPlayers);
    }

    useEffect(() => {
        fetchPlayers();
        console.log(players);
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
                <h2>Gracze</h2>
                <InfoTable
                    data={players}
                    fields={playerFields}
                    onEdit={handleEdit} 
                />

                <UploadJson
                    title="Importuj graczy"
                    sendJsonFunc={window.api.sendJsonPlayers}
                    onUploadSuccess={fetchPlayers}
                />

                {editingPlayer && (
                    <EditModal
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