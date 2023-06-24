import {
    Box,
    Flex,
    Link,
    useBreakpointValue,
    Image,
} from '@chakra-ui/react';

export default function Navbar() {
    return (
        <Box>
            <Flex
                minH={'70px'}
                py={{ base: 2 }}
                px={[3, 3, 3, 14, 14]}
                align={'center'}
                bgColor={'transparent'}
                position={'absolute'}
                zIndex={2}
                left={0}
                right={0}
                margin={'auto'}
            >
            
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Link href='#'>
                        <Image
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            height={30}
                            src='keebs-network-logo.svg'
                        />
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
}