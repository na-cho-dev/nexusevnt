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

  const fetchProfileImage = async () => {
    if (!userData || !userData._id) return; // Prevent running before user data is available

    try {
      const apiEndPoint =
        userRole === 'Organizer'
          ? `/api/organizer/${userData._id}`
          : `/api/attendee/${userData._id}`;
      const userRoleType = userRole === 'Organizer' ? 'organizer' : 'attendee';

      // console.log(apiEndPoint);

      const response = await axiosInstance.get(apiEndPoint);

      // if (!response.data[userRoleType]?.profile_img) {
      //   console.warn('No profile image found in response');
      //   setImageSrc(null);
      //   return;
      // }

      const imgData = response.data[userRoleType]?.profile_img;

      console.log('Fetched Image Data:', imgData); // Debugging

      if (!imgData.data) {
        console.warn('Image data is empty or malformed:', imgData);
        setImageSrc(null);
        return;
      }

      // console.log(
      //   'Image Response Data:',
      //   response.data[userRoleType]?.profile_img
      // );

      // console.log(await response.data.text());

      // if (response.data.organizer?.profile_img?.data) {
      //   const bufferData = response.data.organizer.profile_img.data.data;
      //   const uint8Array = new Uint8Array(bufferData);
      //   const blob = new Blob([uint8Array], { type: 'image/png' });
      //   const imageUrl = URL.createObjectURL(blob);
      //   setImageSrc(imageUrl);
      // }

      // const imgSrc =
      //   response.data[userRoleType]?.profile_img &&
      //   response.data[userRoleType]?.profile_img?.data
      //     ? `data:${response.data[userRoleType]?.profile_img?.mimeType};base64,${response.data[userRoleType]?.profile_img?.data}`
      //     : null;

      const imgSrc = `data:${imgData.mimeType};base64,${imgData.data}`;

      console.log('Generated Image Src:', imgSrc); // Debugging

      setTimeout(() => {
        setImageSrc(imgSrc);
      }, 500);
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  // Fetch existing profile image from backend
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

      // Show newly uploaded image immediately
      // const newImageUrl = URL.createObjectURL(selectedFile);
      // setImageSrc(newImageUrl);

      // Force refresh by refetching the image from the server after a short delay
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
        {imageSrc ? (
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
            <span
              style={{ fontSize: '14px', color: '#888', textAlign: 'center' }}
            >
              {imageSrc === null ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : !imageSrc ? (
                'No Image Selected'
              ) : (
                ''
              )}
            </span>
          </div>
        )}
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
