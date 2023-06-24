import {
    Box,
    Text,
} from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box
            position='absolute'
            zIndex={2}
            width={'full'}
            py={3}
            bottom={0}
            left={0}
        >
            <Text textAlign="center" color={'white'}>© 2023 Keebs Network. All rights reserved</Text>

        </Box>
    );
}