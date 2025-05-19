import "./uploadJson.css";

function UploadJson({ title, sendJsonFunc }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    try {
      const json = JSON.parse(text);
      const result = await sendJsonFunc(json);
      alert(result.success ? `${title} zaimportowane` : `Błąd importu ${title}`);
    } catch {
      alert(`Błędny plik JSON dla ${title}`);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{title}</h2>
      <input type="file" accept=".json" onChange={handleUpload} />
    </div>
  );
}

export default UploadJson;
