import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import SideBar from './components/SideBar';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">

        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        {/* //sideBar */}
        <Box d="flex">
          <SideBar />
          <ChatContainer />
        </Box>

      </Box>
    </ChakraProvider>
  );
}

export default App;
