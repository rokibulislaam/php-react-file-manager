import {
  AppShell, ColorScheme, ColorSchemeProvider, Container, MantineProvider, Stack
} from '@mantine/core';
import { useLocalStorageValue, useMediaQuery } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './api/queryClient';
import {
  FullScreenDropzone,
  UploadButtonModal
} from './components/Dropzones';
import FileList from './components/FileList';
import { Footer } from './components/Footer';
import Header from './components/Header';
import { GlobalStoreContext } from './contexts/gloablStore';
const THEME_KEY = 'filemanager-color-scheme';


function App() {
  const prefersDarkScheme = useMediaQuery(`(prefers-color-scheme: dark)`);

  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: THEME_KEY,
    defaultValue: prefersDarkScheme ? 'dark' : 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [currentPath, setCurrentPath] = useState<string>('');

  return (
    <GlobalStoreContext.Provider value={{ currentPath, setCurrentPath }}>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
          >
            <NotificationsProvider>
              <AppShell header={<Header />} footer={<Footer />}>
                <Container>
                  <Stack spacing={'lg'} align="flex-start" mb={10}>
                    {/* <Breadcrumbs /> */}
                    <UploadButtonModal />
                  </Stack>
                  <FileList />
                  <FullScreenDropzone />
                </Container>
              </AppShell>
            </NotificationsProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </GlobalStoreContext.Provider>
  );
}

export default App;
