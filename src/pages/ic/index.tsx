import { Box, Button, HStack, Heading, Icon, Input, InputGroup, InputRightElement, Select, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

export default function Ic() {
    const router = useRouter()

    return (
        <Stack spacing={4}>
            <HStack justifyContent={"space-between"}>
                <Heading>Interest Check</Heading>
                <Button
                    variant={"solid"}
                    onClick={() => router.push("/ic/create")}
                >
                    <Icon as={AddIcon} mr={2} />
                    Create New IC ✨
                </Button>
            </HStack>
            <Stack direction={"row"}>
                <Select variant='filled' placeholder='All' w={'2xs'} >
                    <option value='keyboards'>Keyboards</option>
                    <option value='keycaps'>Keycaps</option>
                    <option value='switches'>Switches</option>
                </Select>
                <InputGroup w={'xl'}>
                    <Input placeholder='Search By Name..' />
                    <InputRightElement pointerEvents='none'>
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>

                {/* <Button>Filter</Button> */}
            </Stack>
            <Stack spacing={4}>
                <Box padding='6' boxShadow='lg'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </Box>
                <Box padding='6' boxShadow='lg'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </Box>
                <Box padding='6' boxShadow='lg'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </Box>
            </Stack>
        </Stack>
    )
}