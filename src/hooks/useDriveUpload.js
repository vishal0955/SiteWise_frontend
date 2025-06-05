import { useState, useCallback } from 'react';
import useDrivePicker from 'react-google-drive-picker';

// const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
// const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Client ID

export const useDriveUpload = ({ onSelect, allowMultiple = false, fileTypes = [] }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openPicker, authResponse] = useDrivePicker();

  const openDrivePicker = useCallback(() => {
    setLoading(true);
    setError(null);

    const pickerConfig = {
      clientId: GOOGLE_CLIENT_ID,
      developerKey: GOOGLE_API_KEY,
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: allowMultiple,
      mimeTypes: fileTypes,
      callbackFunction: (data) => {
        if (data.action === 'picked') {
          const files = data.docs.map(file => ({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            url: file.url,
            source: 'drive'
          }));
          onSelect(allowMultiple ? files : files[0]);
        }
        setLoading(false);
      },
    };

    try {
      openPicker(pickerConfig);
    } catch (err) {
      setError('Failed to open Google Drive picker');
      setLoading(false);
    }
  }, [openPicker, allowMultiple, fileTypes, onSelect]);

  return { openDrivePicker, loading, error };
};