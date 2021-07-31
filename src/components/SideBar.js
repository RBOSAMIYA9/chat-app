import React, { useState, useEffect } from 'react'
import {
    Box, Center, Text, useColorMode,
    Input, Button, Spinner,
    Modal,
    ModalOverlay,
    ModalContent,

    ModalFooter,

    ModalCloseButton,
    useDisclosure

} from '@chakra-ui/react'

import { projectFirestore } from '../firebase/firebaseConfig'

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { IoMdAddCircle } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { auth } from '../firebase/firebaseConfig'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { addChatRoom, deleteChatRoomById } from '../firebase/dbOperations'
function SideBar({ setUser, userInfo, setSelected }) {

    const [showAddRoom, setShowAddRoom] = useState(false)
    const [showLogout, setShowLogout] = useState(false)

    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();
    const [chatRoomsList, setChatRoomsList] = useState([]);
    const [totalChatRooms, setTotalChatRooms] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalContent, setmodalContent] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        addChatRoom(data.roomName, userInfo.name)
        setShowAddRoom(false);

    }

    // const iconColor = colorMode === 'light' ? "black" : "white"
    // const iconStyle = {
    //     color: iconColor

    // }
    const toggleLogOut = () => {
        setShowLogout(!showLogout)
    }
    const signOut = () => {
        auth.signOut().then(() => {
            localStorage.removeItem('user')
            setUser(null)
        })
    }

    const fetchChatRooms = () => {
        return new Promise((resolve, reject) => {
            const collectionRef = projectFirestore.collection("chatData");
            collectionRef.onSnapshot((snapshot) => {
                setTotalChatRooms(snapshot.docs.length);
                console.log("snapshot:  ", snapshot.docs.length);

                var data = snapshot.docs.map((document) => (
                    {
                        id: document.id,
                        data: document.data()
                    }
                ))
                setChatRoomsList(data)
                resolve("set data to list")
            })
        })

    }

    const deleteRoom = (id, name) => {
        console.log("room id", id, "room name", name);
        deleteChatRoomById(id)
            .then(data => console.log("data from delete function", data))
            .catch((e) => console.log("error", e))
    }
    useEffect(() => {
        setLoading(true);
        fetchChatRooms().then((data) => {
            setLoading(false);
        })



    }, [])

    return (
        <>
            <Box
                width="25%"
                minHeight="100vh"
                boxShadow="2xl"
            >
                <Text fontSize="4xl">
                    <i>ChatterBox</i>
                </Text>
                Namaste 👋🏻
                <Box d="flex" justifyContent="center" alignItems="center" >

                    <Text d="flex" alignItems="center">
                        {userInfo.name}
                        <AiOutlineCaretDown
                            cursor="pointer"
                            onClick={() => toggleLogOut()} />
                    </Text>
                    <ColorModeSwitcher my={2} />
                </Box>
                {showLogout &&
                    <Center>
                        <Box borderRadius="lg" boxShadow="lg" width="50%" p={3}>
                            <Button alignItems="center" onClick={() => signOut()} color={colorMode === 'light' ? "black" : "white"}>
                                &nbsp;Logout
                            </Button>
                        </Box>
                    </Center>
                }



                <Center>
                    <Box d="flex" alignItems="center" width="80%" mt={6}>
                        <Text>
                            All channels ({totalChatRooms}) &nbsp;&nbsp;

                        </Text>
                        {/* color={colorMode == 'light' ? "white" : "black"} */}
                        <Box cursor="pointer" onClick={() => setShowAddRoom(true)}>

                            <IoMdAddCircle />
                        </Box>

                    </Box>
                </Center>
                {showAddRoom && <Center>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box d="flex" flexDir="column" p={6} width="100%">
                            <Input  {...register('roomName', { required: true })} />
                            {errors.roomName && <Text color="red">roomName is required!</Text>}
                            <Box d="flex" justifyContent="space-around" mt={6}>
                                <Button colorScheme="messenger" type="submit">
                                    Save
                                </Button>
                                <Button onClick={() => setShowAddRoom(false)} >
                                    Cancel
                                </Button>

                            </Box>

                        </Box>
                    </form>
                </Center>}

                {/* for listing rooms */}
                <Center>

                    {loading &&
                        <Center w="100%">
                            <Spinner size="md" />
                        </Center>
                    }
                    <Box width="80%" textAlign="left">


                        {chatRoomsList &&
                            chatRoomsList.map((doc) => (
                                <Box d="flex" alignItems="center" justifyContent="space-between">
                                    <Text _hover={{
                                        backgroundColor: "gray"
                                    }}
                                        p={2}
                                        cursor="pointer"
                                        key={doc.id}
                                        onClick={() => {
                                            setSelected({
                                                id: doc.id,
                                                data: doc.data
                                            })
                                        }}
                                        d="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        # {doc.data.roomName}


                                    </Text>
                                    {doc.data.createdBy === userInfo.name &&
                                        <Box cursor="pointer" >
                                            <MdDelete onClick={() => {
                                                onOpen()
                                                setmodalContent({ id: doc.id, roomName: doc.data.roomName })
                                            }} />
                                        </Box>
                                    }


                                </Box>

                            ))}
                        {/* <Button onClick={onOpen}>Open Modal</Button> */}

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />

                            <ModalContent>

                                <Center>
                                    <Box p={5}>Delete room</Box>
                                </Center>

                                <ModalCloseButton />

                                <Center>
                                    <Box p={5}>

                                        <Text>Are you sure you want to delete <b>{modalContent.roomName}</b>  room?

                                        </Text>
                                    </Box>
                                </Center>


                                <ModalFooter>
                                    <Button colorScheme="gray" mx={3} onClick={onClose}>Cancel</Button>
                                    <Button colorScheme="red" onClick={() => {
                                        deleteRoom(modalContent.id, modalContent.roomName)
                                        onClose()
                                    }} >
                                        Delete
                                    </Button>

                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Center>
            </Box>



        </>
    )
}

export default SideBar
