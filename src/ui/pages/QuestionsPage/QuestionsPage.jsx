import { useEffect, useState } from "react";
import InfoTable from "../../components/InfoTable/InfoTable";
import UploadJson from '../../components/UploadJson/UploadJson';
import EditModal from "../../components/EditModal/EditModal";
import BackButton from "../../components/BackButton/BackButton";

import "./QuestionsPage.css";

function QuestionsPage() {
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const questionFields = [
        {key: "id", label: "ID"},
        {key: "category", label: "Kategoria"},
        {key: "question", label: "Pytanie"},
        {key: "answer", label: "Poprawna odpowiedź"},
        {key: "answerA", label: "Odpowiedź A"},
        {key: "answerB", label: "Odpowiedź B"},
        {key: "answerC", label: "Odpowiedź C"},
        {key: "answerD", label: "Odpowiedź D"} 
    ];

    const fetchQuestions = () => {
        window.api.getQuestions().then(setQuestions);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleEdit = (id) => {
        const question = questions.find(q => q.id === id);
        setEditingQuestion(question);
    };

    const handleSave = async (updatedQuestion) => {
        await window.api.updateQuestion(updatedQuestion);
        setEditingQuestion(null);
        fetchQuestions();
    }

    return (
        <>
            <BackButton />
            <div>
                <h2>Pytania</h2>
                <InfoTable
                    data={questions}
                    fields={questionFields}
                    onEdit={handleEdit}
                />

                <UploadJson
                    title="Importuj Pytania"
                    sendJsonFunc={window.api.sendJsonQuestions}
                    onUploadSuccess={fetchQuestions}
                />

                {editingQuestion && (
                    <EditModal
                        title="Edytuj pytanie"
                        data={editingQuestion}
                        fields={questionFields}
                        onSave={handleSave}
                        onClose={() => setEditingQuestion(null)}
                    />
                )}
            </div>
        </>
    );
}

export default QuestionsPage;