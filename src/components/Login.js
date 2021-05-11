import React, { useState } from 'react'
import { Box, Text, Center, Button } from '@chakra-ui/react'
import { auth, provider } from '../firebase/firebaseConfig'

function Login() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            console.log("then");
            let user = result.user;
            let newUser = {
                name: user.displayName,
                email: user.email
            }
            localStorage.setItem('user', JSON.stringify(newUser))
            console.log("newUser",newUser);
            setUser(newUser);
        }).catch((error) => {
            console.log(error.message);
        })
    }
    return (
        <>
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

        </>
    )
}

export default Login
