import React, { useState } from 'react'
import {
    Box, Center, Text, useColorMode,
    Input, Button,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { GrAddCircle } from 'react-icons/gr';
import { useForm } from 'react-hook-form';

function SideBar() {

    const [showAddRoom, setShowAddRoom] = useState(false)
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        
        setShowAddRoom(false);

    }

    const iconColor = colorMode === 'light' ? "black" : "white"
    const iconStyle = {
        color: iconColor

    }


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
                <Box d="flex" justifyContent="center" alignContent="center" >
                    <Text>
                        User Info
                    </Text>
                    <ColorModeSwitcher justifySelf="flex-end" />

                </Box>
                <Center>
                    <Box d="flex" alignItems="center" width="80%" mt={6}>
                        <Text>
                            All channels (8) &nbsp;&nbsp;

                    </Text>
                        {/* color={colorMode == 'light' ? "white" : "black"} */}
                        <Box cursor="pointer" onClick={() => setShowAddRoom(true)}>

                            <GrAddCircle style={iconStyle} />
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
                    <Box width="80%" textAlign="left">
                        <Text _hover={{
                            backgroundColor: "gray"
                        }}
                            p={2}
                            cursor="pointer"
                        >
                            #funRoom
                        </Text>
                        <Text _hover={{
                            backgroundColor: "gray"
                        }}
                            p={2}
                            cursor="pointer"
                        >
                            #funRoom
                        </Text>

                    </Box>
                </Center>
            </Box>



        </>
    )
}

export default SideBar
