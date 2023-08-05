import {
    Box,
    Text,
} from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box
            className="w-full py-4">
            <Text textAlign="center" color={'cyan'}>© 2023 Keebs Network. All rights reserved</Text>
        </Box>
    );
}