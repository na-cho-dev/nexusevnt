import React, { useState, useEffect } from 'react';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import '../../styles/ImageButton.css';
import Camera from '../../images/camera.png';
import axiosInstance from '../../services/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const ImageUpload = () => {
  const { userRole, userData } = useAuth();
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileImage = async () => {
    if (!userData || !userData._id) return;

    setIsLoading(true);
    try {
      const apiEndPoint =
        userRole === 'Organizer'
          ? `/api/organizer/${userData._id}`
          : `/api/attendee/${userData._id}`;
      const userRoleType = userRole === 'Organizer' ? 'organizer' : 'attendee';
      const response = await axiosInstance.get(apiEndPoint);
      const imgData = response.data[userRoleType]?.profile_img;

      if (!imgData || !imgData.data) {
        console.warn('No profile image found.');
        setImageSrc(null);
      } else {
        setImageSrc(`data:${imgData.mimeType};base64,${imgData.data}`);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      setImageSrc(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [userData?._id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('profile_img', selectedFile);

    try {
      const apiEndPoint =
        userRole === 'Organizer'
          ? `/api/organizer/${userData._id}`
          : `/api/attendee/${userData._id}`;

      await axiosInstance.put(apiEndPoint, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTimeout(fetchProfileImage, 500);
      setSuccess(true);
    } catch (error) {
      console.error('Error uploading image', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <div style={{ marginRight: '10px' }}>
        <div
          style={{
            width: '150px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: '50%',
            backgroundColor: '#f8f9fa',
          }}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" role="status" />
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              key={imageSrc}
              roundedCircle
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                border: '1px solid #ccc',
              }}
              alt="Uploaded Preview"
            />
          ) : (
            <span style={{ fontSize: '14px', color: '#888' }}>No Image Found</span>
          )}
        </div>
      </div>

      <div>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="uploadButton"
        />
        <Button
          variant="outline-dark"
          className="upload-btn"
          onClick={() => document.getElementById('uploadButton').click()}
        >
          <img className="camera" alt="camera" src={Camera} />
        </Button>
      </div>

      {selectedFile && !success && (
        <Button
          variant="success"
          className="ml-2"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
