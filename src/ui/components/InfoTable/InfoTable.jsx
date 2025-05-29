import "./InfoTable.css";


function InfoTable({data, fields, onEdit}) {


    return(
        <div className="players-table-container">
            <table className="players-table">
                <thead>
                    <tr>
                        {fields.map((field) => (
                            <th key={field.key}>{field.label}</th>
                        ))}
                        {onEdit && <th>Edycja</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {fields.map((field) => (
                                <td key={field.key}>{row[field.key]}</td>
                            ))}
                            {onEdit && (
                                <td>
                                    <button onClick={() => onEdit(row.id)}>Edytuj</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InfoTable;