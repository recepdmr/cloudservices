
'use server'
import { TextUnderline } from "@/ui/components/text-underline";
import {
  useColorModeValue,
  useBreakpointValue, Stack, Container, Text, Heading, Button, Box, Flex, Icon, SimpleGrid, Tooltip, Wrap, WrapItem
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

async function getData() {
  const res = await fetch('http://144.91.88.143:3801/application/list', { next: { revalidate: 1 } })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()

  return <App />
}

'use client'
function App() {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      css={{
        backgroundAttachment: 'fixed',
      }}>
      <Stack
        as={Container}
        maxW={'7xl'}
        h={{ base: '100%', lg: '100vh' }}
        minH={950}
        py={{ base: 24, lg: 32 }}
        spacing={{ base: 10, lg: 24 }}
        direction={{ base: 'column', lg: 'row' }}
        alignItems={'center'}>
        <Stack spacing={12} mb={{ base: 12, lg: 0 }} flex={2}>
          <Heading
            as={'h2'}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
            maxW={'2xl'}>
            <TextUnderline>Production-ready</TextUnderline> Software as services
          </Heading>
          <Stack spacing={5}>
            <Text color={'gray.500'} fontSize={{ md: 'lg' }} maxW={'2xl'}>
              Production-ready cloud services
            </Text>
          </Stack>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={8}>
            <Button
              href={'/services'}
              colorScheme={'green'}
              background={'green.400'}
              _hover={{ bg: 'green.500' }}
              color={'white'}
              variant={'solid'}
              size={'lg'}
              fontSize={'md'}
              rounded={'md'}
              as={Link}>
              Browse Services
            </Button>

            <Button
              as="a"
              href={'/suggest'}
              colorScheme={'green'}
              variant={'ghost'}
              size={'lg'}
              fontSize={'md'}
              rounded={'md'}
              bg={'transparent'}
              color={useColorModeValue('gray.500', 'gray.300')}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'blackAlpha.600'),
                color: useColorModeValue('gray.600', 'gray.100'),
              }}>
              Suggest Service
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <GettingStarted />
      <OpenSource contributors={[
        {
          name: 'reep'
        }
      ]} categoriesCount={10} stargazers="22" />
      <ExploreTemplates templatesCount={10} />
      <Footer />
    </Box>
  )
}


const STEPS = [
  {
    title: 'Find your needs services',
    text: 'Every services is embedded within an Git Server, so you can easily check what they look like and deploy to clusters.',
  },
  {
    title: 'Declare service configurations',
    text: 'You recognize values ​​that are important to you.',
  },
  {
    title: 'Service has deployed to cluster',
    text: "Your service is now in your cluster and ready for your use.",
  },
]

const GettingStarted = () => {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW={'7xl'} py={{ base: 14, sm: 20, md: 32 }}>
        <Heading as={'h3'} textAlign={'center'} mb={{ base: 14, sm: 16 }}>
          Getting started in <TextUnderline>3 easy steps</TextUnderline>
        </Heading>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify={'space-between'}
          align={{ base: 'center', md: 'flex-start' }}>
          {STEPS.map((step, index) => (
            <Stack
              textAlign={{ base: 'left', md: 'center' }}
              align={{ base: 'flex-start', md: 'center' }}
              spacing={4}
              key={step.title}
              maxW={{ base: 'full', md: 'xs' }}
              mt={{ base: 10, md: 0 }}
              _first={{
                mt: 0,
              }}
              px={4}>
              <Flex
                w={10}
                h={10}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue('green.100', 'green.900')}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue('green.700', 'green.300')}
                fontWeight={700}
                align={'center'}
                justify={'center'}
                fontSize={'sm'}
                rounded={'md'}>
                0{index + 1}
              </Flex>
              <Text
                fontFamily={'heading'}
                fontSize={'xl'}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue('gray.700', 'white')}>
                {step.title}
              </Text>
              <Text color={'gray.500'}>{step.text}</Text>
            </Stack>
          ))}
        </Flex>
      </Container>
    </Box>
  )
};

interface Contributor {
  login?: string
  name: string
  avatar_url?: string
  profile?: string
  contributions?: string[]
}

type OpenSourceProps = {
  contributors: Contributor[]
  stargazers: string
  categoriesCount: number
  templatesCount?: number
}

const OpenSource = ({
  contributors,
  stargazers,
  categoriesCount,
  templatesCount,
}: OpenSourceProps) => {
  const STATS = [
    {
      label: 'Years',
      count: 10,
    },
    {
      label: 'Finished project',
      count: 2,
    },
    {
      label: 'Platform transformation',
      count: 20,
    },
  ]

  return (
    <Container maxW={'7xl'} py={{ base: 14, sm: 20, md: 32 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Heading as={'h3'} mb={2}>
            Why should we <TextUnderline>trust</TextUnderline> you?
          </Heading>
          <Text color={'gray.500'} maxW={'4xl'} fontSize={{ md: 'lg' }}>
            At [Company Name], we understand the importance of trust in every interaction. Here{"'"}s why you can rely on us
            our
          </Text>
          <Text color={'gray.500'} maxW={'4xl'} fontSize={{ md: 'lg' }}>
            Experience: With [number of years] years of experience in the industry, we have honed our skills and expertise to deliver results that exceed expectations. Our track record speaks for itself, showcasing our commitment to excellence.
          </Text>
          <Text color={'gray.500'} maxW={'4xl'} fontSize={{ md: 'lg' }}>
            Security: We take the security of your data and transactions seriously. Our robust security measures safeguard your information, giving you peace of mind when you work with us.
          </Text>
          <Text color={'gray.500'} maxW={'4xl'} fontSize={{ md: 'lg' }}>
            Reliability: When you choose [Company Name], you are choosing reliability. We deliver on our promises, meeting deadlines and surpassing quality standards consistently.
          </Text>
          <Text color={'gray.500'} maxW={'4xl'} fontSize={{ md: 'lg' }}>
            Reliability: When you choose [Company Name], you are choosing reliability. We deliver on our promises, meeting deadlines and surpassing quality standards consistently.
          </Text>
        </Stack>

        <Flex justify={'center'} align={'center'}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 4 }} w={'full'}>
            {STATS.map((stat) => (
              <Stack
                key={stat.label}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue('gray.100', 'gray.900')}
                rounded={'xl'}
                px={4}
                py={3}
                direction={'row'}
                align={'center'}
                spacing={4}
                justify={'space-between'}>
                <Stack direction={'row'} align={'center'}>
                  <Icon color={'green.400'} />
                  <Text>{stat.label}</Text>
                </Stack>
                <Text fontWeight={700}>{stat.count}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Flex>
      </SimpleGrid>
    </Container>
  )
}

type ExploreTemplatesProps = {
  templatesCount: number
}

const ExploreTemplates = ({ templatesCount }: ExploreTemplatesProps) => {
  return (
    <Box bg={useColorModeValue('green.50', 'gray.800')}>
      <Container maxW={'7xl'} py={{ base: 14, sm: 20, md: 32 }}>
        <Box
          bg={useColorModeValue('green.400', 'green.500')}
          rounded={'xl'}
          color={useColorModeValue('white', 'gray.100')}
          px={{ base: 4, md: 10 }}
          py={10}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading as={'h3'} mb={2}>
                Explore {templatesCount - 1}+ production-ready services
              </Heading>
              <Text fontSize={'lg'}>
                and start deploy services today!
              </Text>
            </Box>
            <Flex w={'full'} align={'center'} justify={'center'}>
              <Button
                as={Link}
                href={'/services'}
                bg="green.600"
                color={'white'}
                px={8}
                size="lg"
                fontSize="md"
                rounded="md"
                _hover={{
                  bg: 'green.700',
                }}>
                Browse services
              </Button>
            </Flex>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}

const SOCIAL_LINKS = [
  {
    label: 'Discord Community',
    href: '/',
  },
  {
    label: 'GitHub Repository',
    href: '/',
  },
  {
    label: 'Twitter Account',
    href: '/',
  },
  {
    label: 'Figma Design Resources',
    href: '/',
  },
]

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Social</ListHeader>
            {SOCIAL_LINKS.map((link) => (
              <Box
                as="a"
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer">
                {link.label}
              </Box>
            ))}
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Analytics</ListHeader>
            <Link href={'/'}>Public Statistics</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box pb={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Box href={'/'} as={Link}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Logo
            </Text>          </Box>
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          Developing from Turkey
        </Text>
      </Box>
    </Box>
  )
}
