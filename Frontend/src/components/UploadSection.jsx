import React, { useState, useRef } from 'react'
import { API_BASE_URL } from '../apiConfig';

const UploadSection = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [breedResult, setBreedResult] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [threshold, setThreshold] = useState(50);
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        setBreedResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const processImage = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('threshold', threshold / 100);

    try {
      const response = await fetch(`${API_BASE_URL}/api/classify`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setBreedResult(data);
    } catch (error) {
      console.error('Error processing image:', error);
      const errorResult = {
        breed: "Error",
        confidence: 0,
        description: "Could not process the image. Please make sure the backend server is running and try again.",
        characteristics: []
      }
      setBreedResult(errorResult);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null)
    setUploadedFile(null)
    setBreedResult(null)
    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="upload-section">
      <div className="container">
        <div className="upload-content">
          <h2 className="section-title">Upload Cattle Image</h2>
          <p className="section-description">
            Upload an image of cattle or buffalo to identify its breed using AI technology
          </p>

          {!uploadedImage ? (
            <div 
              className={`upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-content-inner">
                <div className="upload-icon">📷</div>
                <h3>Drag & Drop Image Here</h3>
                <p>or click to browse files</p>
                <p className="upload-formats">Supports: JPG, PNG, JPEG</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div className="image-preview">
              <div className="preview-container">
                <img src={uploadedImage} alt="Uploaded cattle" className="preview-image" />
                <button className="remove-image" onClick={resetUpload}>
                  ✕
                </button>
              </div>
              
              {!isProcessing && !breedResult && (
                <div className="process-actions">
                  <div className="threshold-slider" style={{ margin: '20px 0', textAlign: 'center' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.1em' }}>
                      Confidence Threshold: <strong>{threshold}%</strong>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={threshold}
                      onChange={(e) => setThreshold(e.target.value)}
                      style={{ width: '80%' }}
                    />
                  </div>
                  <button className="btn-primary" onClick={processImage}>
                    Identify Breed
                  </button>
                  <button className="btn-secondary" onClick={resetUpload}>
                    Upload Different Image
                  </button>
                </div>
              )}

              {isProcessing && (
                <div className="processing">
                  <div className="processing-spinner"></div>
                  <h3>Analyzing Image...</h3>
                  <p>AI is identifying the cattle breed</p>
                </div>
              )}

              {breedResult && (
                <div className="breed-result">
                  <h3>Breed Identification Result</h3>
                  {breedResult.predictions && breedResult.predictions.length > 0 ? (
                    <div className="predictions-list">
                      {breedResult.predictions.map((prediction, index) => {
                        const confidence = prediction.prob * 100;
                        let description = null;

                        if (index === 0) {
                          if (prediction.class === "Not a cattle breed likely") {
                            description = "The model could not identify a cattle breed in this image. Please try a different photo.";
                          } else if (confidence > 75) {
                            description = `The model is highly confident that this is a ${prediction.class}. You can browse our Breed Database to learn more about this breed.`;
                          } else if (confidence > 40) {
                            description = `This looks like a ${prediction.class}. Check the Breed Database for more information.`;
                          } else {
                            description = `The model is not very confident, but this might be a ${prediction.class}. For a better result, please try uploading a clearer, side-view photo of the animal.`;
                          }
                        }

                        return (
                          <div key={index} className="prediction-item">
                            <div className="breed-name">
                              <h4>{prediction.class}</h4>
                              <span className="confidence">{confidence.toFixed(1)}% confidence</span>
                            </div>
                            {description && <p className="breed-description">{description}</p>}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="breed-description">No predictions available.</p>
                  )}
                  <button className="btn-primary" onClick={resetUpload}>
                    Identify Another Breed
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadSection
