import { Box, Text, Input, Button } from '@chakra-ui/react'
import React from 'react'
import { FiSend } from 'react-icons/fi'
import { GrAttachment } from 'react-icons/gr'


function ChatContainer() {
    return (
        <>
            <Box width="75%" shadow="lg">
                <Text fontSize="2xl" boxShadow="lg" p={4} textAlign="left">
                    #funRoom
                </Text>
                <Box overflowY="auto" height="75%">
                    <Box textAlign="left" p={4}>
                        <Text as="span" p={2} bg="gray.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="right" p={4}>
                        <Text as="span" p={2} bg="green.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    {/* <Box textAlign="left" p={4}>
                        <Text as="span" p={2} bg="gray.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="right" p={4}>
                        <Text as="span" p={2} bg="green.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="left" p={4}>
                        <Text as="span" p={2} bg="gray.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="right" p={4}>
                        <Text as="span" p={2} bg="green.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="left" p={4}>
                        <Text as="span" p={2} bg="gray.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="right" p={4}>
                        <Text as="span" p={2} bg="green.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="left" p={4}>
                        <Text as="span" p={2} bg="gray.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="right" p={4}>
                        <Text as="span" p={2} bg="green.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="left" p={4}>
                        <Text as="span" p={2} bg="gray.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box>
                    <Box textAlign="right" p={4}>
                        <Text as="span" p={2} bg="green.500" color="white" width="auto" borderRadius="lg">Hello</Text>
                    </Box> */}

                </Box>
                <Box p={5} d="flex" justifyContent="center" position="fixed" bottom= "0"   width="75%" >
                    <Input h="12" borderRadius="full" />
                    <Button colorScheme="green" mx={2}>
                        <GrAttachment />
                    </Button>
                    <Button colorScheme="green"  mx={2}>
                        <FiSend />
                    </Button>

                </Box>
            </Box>

        </>
    )
}

export default ChatContainer
