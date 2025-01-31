'use client'
import { Link } from '@chakra-ui/next-js';
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function Error() {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                backgroundClip="text">
                500
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Page Not Found
            </Text>
            <Text color={'gray.500'} mb={6}>
                The page youre looking for does not seem to exist
            </Text>

            <Link href='/'
                colorScheme="teal"
                bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                color="white"
                variant="solid">
                Go to Home
            </Link>
        </Box>
    );
}