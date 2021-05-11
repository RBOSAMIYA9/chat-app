import {
  ChakraProvider,
  Box,
  theme,
  Text, Center, Button
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import SideBar from './components/SideBar';
import ChatContainer from './components/ChatContainer';
import Login from './components/Login';
import React, { useState } from 'react'
import { auth, provider } from './firebase/firebaseConfig'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [selected, setSelected] = useState({})
  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      console.log("then");
      let user = result.user;
      let newUser = {
        name: user.displayName,
        email: user.email
      }
      localStorage.setItem('user', JSON.stringify(newUser))
      console.log("newUser", newUser);
      setUser(newUser);
    }).catch((error) => {
      console.log(error.message);
    })
  }
  return (
    
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">

        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        {/* //sideBar */}

        {user ? (<>
          <Box d="flex">
            <SideBar setUser={setUser} userInfo={user} setSelected={setSelected} />
            <ChatContainer selected={selected} userInfo={user} />
          </Box>
        </>) : (<>
          <Box minH="100vh" width="100vw" bg="gray.200">
            <Text fontSize="3xl">
              <i> ChattersBox</i>
            </Text>
            <Center>
              <Box width="20%" my={24} p={12} boxShadow="lg" borderRadius="lg">
                <Text>
                  Login into ChattersBox
                    </Text>
                <Button my={8} colorScheme="teal" onClick={signIn}>
                  Sign in with Google
                        </Button>
              </Box>
            </Center>
          </Box>
        </>)}

      </Box>
    </ChakraProvider>
  );
}

export default App;
