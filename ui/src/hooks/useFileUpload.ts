import { showNotification, updateNotification } from '@mantine/notifications';
import axios from 'axios';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import config from '../config';
import { GlobalStoreContext } from '../contexts/gloablStore';

export default function useFileUpload(
  files?: File[],
  setModalOpened?: Dispatch<SetStateAction<boolean>>,
  path?: string
) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const { currentPath } = useContext(GlobalStoreContext);
  if (!path) {
    path = currentPath;
  }

  const uploadFiles = (formData: FormData) => {
    setIsUploading(true);
    axios
      .post(config.API_URL + '?upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      })
      .then((res) => {
        setIsUploading(false);
        setIsFinished(true);
      })
      .catch((err) => {
        setError(err.messsage);
      });
  };

  useEffect(() => {
    if (files) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('operation', 'upload');
      uploadFiles(formData);
    }
  }, [files]);

  const queryClient = useQueryClient();

  useEffect(() => {
    files?.forEach((file) => {
      if (isUploading) {
        showNotification({
          id: file.name,
          loading: true,
          title: 'Uploading File',
          message: `The file: ${file.name} is being uploaded`,
          autoClose: false,
          disallowClose: true,
        });
      }
      if (isFinished) {
        queryClient.invalidateQueries();
        if (setModalOpened) {
          setModalOpened(false);
        }
        updateNotification({
          id: file.name,
          color: 'teal',
          title: 'Uploaded File',
          message: `The file: ${file.name} has been successfully uploaded`,
          autoClose: 2000,
        });
      }
    });
  }, [isFinished, isUploading, uploadPercentage, error, files, setModalOpened, queryClient]);

  return {
    isUploading,
    isFinished,
    error,
    uploadPercentage,
  };
}
