import { Box, Button, Heading, Input, InputGroup, InputRightElement, Select, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

export default function Ic() {
    const router = useRouter()

    return (
        <Stack spacing={4}>
            <Stack>
                <Heading>Interest Check</Heading>
            </Stack>
            <Stack direction={"row"}>
                <InputGroup w={'xl'}>
                    <Input placeholder='Search By Name..' />
                    <InputRightElement pointerEvents='none'>
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
                <Button onClick={() => router.push("/ic/create")}>Create your IC</Button>
            </Stack>
            <Stack direction={"row"}>
                <Select variant='filled' placeholder='All' w={'sm'} >
                    <option value='keyboards'>Keyboards</option>
                    <option value='keycaps'>Keycaps</option>
                    <option value='switches'>Switches</option>
                </Select>
                <Button>Apply</Button>
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