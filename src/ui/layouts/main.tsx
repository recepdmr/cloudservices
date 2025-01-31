'use client'

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Image,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    useColorMode,
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'
import React from 'react';
import { Link } from '@chakra-ui/next-js';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { ServiceItem, useServices } from '@/contexts/services-context';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { isOpen, onToggle } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    const session = (useSession() as never) as ReturnType<typeof useSession> & { data: Session & { accessToken: string, tenantId: string } };

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Link href='/'>
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('gray.800', 'white')}>
                            Logo
                        </Text>
                    </Link>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>


                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    {session?.data?.user?.email ? <span>Signed in as {session.data.user?.email}</span> :
                        <>
                            <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'/api/auth/signin'}>
                                Sign In
                            </Button>
                            <Button
                                as={'a'}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'pink.400'}
                                href={'/api/auth/signin'}
                                _hover={{
                                    bg: 'pink.300',
                                }}>
                                Sign Up
                            </Button>
                        </>
                    }
                    <Button
                        onClick={toggleColorMode}>
                        {colorMode === 'light' ? 'light' : 'dark'}
                    </Button>
                </Stack>

            </Flex>
            <Box>
                {children}
            </Box>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    const { services } = useServices();
    return (
        <Stack direction={'row'} spacing={4}>
            {services.map((service) => (
                <Box key={service.id}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={2}
                                href={`/services/${service.name.toLowerCase()}`}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {service.name}
                            </Box>
                        </PopoverTrigger>

                        {/* {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )} */}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({ name }: ServiceItem) => {
    return (
        <Box
            as="a"
            href={name}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {name}
                    </Text>
                    <Text fontSize={'sm'}>{name}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    )
}

const MobileNav = () => {

    const { services } = useServices();
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {services.map((service: ServiceItem) => (
                <MobileNavItem key={service.id} {...service} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ name }: ServiceItem) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4}>
            <Box
                py={2}
                as="a"
                href={`/services/${name.toLowerCase()}`}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {name}
                </Text>
                {/* {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )} */}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {/* {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))} */}
                </Stack>
            </Collapse>
        </Stack>
    )
}
