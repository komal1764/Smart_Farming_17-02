import React, { useState } from "react";
import axios from "axios";
import "./PotatoDetection.css";

function PotatoDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please choose an image first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost:8000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(res.data);
    } catch (error) {
      console.error("Server Error:", error);
      alert("Prediction failed");
    }

    setLoading(false);
  };

  const confidence =
    result?.confidence
      ? (parseFloat(result.confidence) * 100).toFixed(2)
      : null;

  return (
    <div className="potato-container">
      <h2 className="header">Potato Disease Detection</h2>

      <div className="card">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="preview-image"
          />
        )}

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>

        {result && (
          <div className="result">
            <p><b>Label:</b> {result.class}</p>
            <p><b>Confidence:</b> {confidence}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PotatoDetection;
