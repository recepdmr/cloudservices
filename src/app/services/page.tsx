'use client'

import { useServices } from '@/contexts/services-context'
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ReactElement } from 'react'

interface CardProps {
    heading: string
    description: string
    icon?: ReactElement
    href: string
}

const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}>
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}>
                    {icon ?? icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
                <Button as='a' href={href} variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Lets deploy
                </Button>
            </Stack>
        </Box>
    )
}

export default function gridListWith() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { services } = useServices();
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Services
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    We are supporting all open source services
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    {services.map((service) => (
                        <Card
                            icon={undefined}
                            key={service.name}
                            heading={service.name}
                            description={`Fully managed ${service.name}`}
                            href={'/services/' + service.name}
                        />
                    ))}
                </Flex>
            </Container>
        </Box>
    )
}