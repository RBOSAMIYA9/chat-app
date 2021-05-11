import { Box, Text, Input, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { GrAttachment } from 'react-icons/gr'
import { projectFirestore, timeStamp } from '../firebase/firebaseConfig'
import { useForm } from 'react-hook-form';
import { addMessage } from '../firebase/dbOperations'


function ChatContainer({ selected, userInfo }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (Object.keys(selected).length > 0) {
            const collectionRef = projectFirestore.collection("chatData");
            collectionRef.doc(selected.id).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
                // console.log("messages", snapshot.docs)
                var messages = snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data()
                    }
                ))
                setMessages(messages)
                console.log("messages", messages);

            })
        }

    }, [selected])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {
        e.target.reset();
        console.log("user message")
        console.log(data)
        addMessage(selected.id, data.message, userInfo.name)
    };
    return (
        <>


            <Box width="75%" shadow="lg">
                {Object.keys(selected).length > 0 ? (
                    <>
                        <Text fontSize="2xl" boxShadow="lg" p={4} textAlign="left">
                            #{selected.data.roomName}
                        </Text>
                        <Box overflowY="auto" height="75%" position="fixed" width="75%">
                            {

                                messages && messages.map((messages) => (
                                    messages.data.sender === userInfo.name ? (
                                        <>
                                            <Box d="flex" justifyContent="flex-end">
                                                <Box textAlign="left" p={4}>

                                                    <Box fontSize="lg" p={3} bg="green.500" color="white" borderRadius="lg">


                                                        <p> {messages.data.message}</p>
                                                        <Box d="flex" justifyContent="flex-end"  >
                                                            
                                                            {/* <Text as="span" fontSize="sm">
                                                                    {messages.data.timestamp.toDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                                </Text> */}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </>
                                    ) : (
                                        <Box textAlign="left" p={4}>

                                            <Box fontSize="lg" p={3} bg="gray.500" color="white" width="40%" borderRadius="lg">

                                                <Text mt="-3" color="red.300" fontSize="md"> {messages.data.sender}</Text>
                                                <p> {messages.data.message}</p>
                                                <Box d="flex" justifyContent="flex-end"  >

                                                    <Text as="span" fontSize="sm">
                                                        {messages.data.timestamp.toDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                    </Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )


                                ))
                            }

                        </Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box position="fixed" bottom="0" width="75%">
                                {errors.message && <Text color="red">please enter mesasge!</Text>}

                                <Box p={5} d="flex" justifyContent="center"  >

                                    <Input h="12"
                                        placeholder="enter message here!"
                                        borderRadius="full" {...register('message', { required: true })} />

                                    {/* <Button colorScheme="green" mx={2}>
                                        <GrAttachment />
                                    </Button> */}
                                    <Button colorScheme="green" mx={2} type="submit">
                                        <FiSend />
                                    </Button>

                                </Box>
                            </Box>
                        </form>
                    </>

                ) : (
                    <>
                        <Text>No chat selected</Text>
                    </>
                )}

            </Box>

        </>
    )
}

export default ChatContainer
