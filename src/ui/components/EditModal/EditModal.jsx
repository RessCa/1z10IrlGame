import { useState } from "react";
import "./EditModal.css";

function EditModal({ data, onClose, onSave, title = "Edytuj dane", fields = [] }) {
  const [form, setForm] = useState(data);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        {fields.map((field) => (
          <div key={field.key}>
            <label>{field.label}</label>
            <input
              type="text"
              value={form[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          </div>
        ))}
        <div className="modal-actions">
          <button onClick={handleSubmit}>Zapisz</button>
          <button onClick={onClose}>Anuluj</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;