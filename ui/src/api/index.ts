import axios from 'axios';
import config from '../config';
import { FilesList } from '../types';
import { queryClient } from './queryClient';
const { API_URL } = config;

const api = {
  async getFiles(path?: string): Promise<FilesList> {
    if (path) {
      return await axios.get(`${API_URL}?getFiles&path=${path}`).then((res) => {
        return res.data;
      });
    }
    return axios.get(`${API_URL}?getFiles`).then((res) => res.data);
  },
  async deleteFile(path: string, type: string) {
    const formData = new FormData();
    formData.append('operation', 'delete');
    formData.append('path', path);
    formData.append('type', type);
    return await axios.post(`${API_URL}`, formData).then((res) => {
      queryClient.invalidateQueries();
      return 'ok';
    });
  },
  async rename(renameData: {
    operation: 'rename';
    path: string;
    newName: string;
    basePath?: string;
  }) {
    const { newName, operation, path, basePath } = renameData;
    const formData = new FormData();
    formData.append('operation', operation);
    formData.append('path', path);
    formData.append('newName', newName);
    formData.append('basePath', basePath || '');
    return await axios.post(`${API_URL}`, formData).then((res) => {
      queryClient.invalidateQueries();
      return 'ok';
    });
  },
};

export default api;
