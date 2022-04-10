import { useContext } from 'react';
import { useQuery } from 'react-query';
import api from '../api';
import { GlobalStoreContext } from '../contexts/gloablStore';

export function useGetFiles(path: string = '') {
  const result = useQuery('files' + path, () => api.getFiles(path));

  const { setCurrentPath } = useContext(GlobalStoreContext);
  if (result.data?.location) {
    setCurrentPath(result.data.location);
  }

  return result;
}

// export function useDeleteFile(path: string = '', filename: string) {
//   const { data } = useQuery('files' + path, () => api.deleteFile(path));
//   if (data) {
//     showNotification({
//       id: 'delete' + filename,
//       loading: true,
//       title: 'Uploading File',
//       message: `The file: ${filename} has been deleted successfully`,
//       autoClose: true,
//     });
//   }
//   const { refetch } = useGetFiles();
//   refetch();
// }
