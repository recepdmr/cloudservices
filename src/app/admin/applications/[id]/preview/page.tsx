/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import {
    Box,
    Stack,
    Text,
    Image,
    Heading,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    SimpleGrid,
    Center
} from '@chakra-ui/react';

import './styles.css';

import { Meal } from "@/domain/enums/meal";
import { Recipe } from "@/domain/recipes/recipe";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

const mealLabels = {
    [Meal.Breakfast]: 'Kahvaltı',
    [Meal.Refreshment]: 'Ara Öğün',
    [Meal.Lunch]: 'Öğle Yemegi',
    [Meal.Dinner]: 'Akşam Yemegi',
};

export default function ApplicationPreview({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams()
    const percentage = searchParams.get('percentage')
    const session = (useSession() as never) as ReturnType<typeof useSession> & { data: Session & { accessToken: string, tenantId: string } };
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        if (session.data?.accessToken)
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/recipes?applicationId=${params.id}&percentage=${percentage}`, {
                headers: {
                    'authorization': `Bearer ${session.data.accessToken}`,
                    'x-tenant-id': session.data.tenantId
                }
            }).then(res => res.json()).then(res => setRecipes(res));
    }, [params.id, session, percentage]);

    if (!recipes) {
        return null;
    }

    return (
        <>
            <Box paddingBottom={20}>
                <SimpleGrid
                    columns={{ base: 2, lg: 2 }}
                    py={{ base: 18, md: 24 }}>
                    <Box>
                        <Image
                            marginLeft='auto'
                            marginRight='auto'
                            objectFit='cover'
                            security='none'
                            src={`${process.env.NEXT_PUBLIC_STATIC_ENDPOINT}/tenants/c23d5333-4969-46be-b2e3-22dcb9d982c9/static/images/logo.png`} alt='logo' />
                    </Box>
                    <Box>
                        <Image
                            marginLeft='auto'
                            marginRight='auto'
                            objectFit='cover'
                            security='none'
                            src={`${process.env.NEXT_PUBLIC_STATIC_ENDPOINT}/tenants/c23d5333-4969-46be-b2e3-22dcb9d982c9/static/images/slogan.png`} alt='slogan' />
                    </Box>
                </SimpleGrid>
                <SimpleGrid>
                    <Box mb={5}>
                        <Heading size='md'>{mealLabels[Meal.Breakfast]}</Heading>
                        <Text
                            fontSize={{ base: '16px', lg: '18px' }}
                            color={useColorModeValue('pink.500', 'pink.300')}
                            mb={'4'}>
                            Sabah uyanınca: 2 bardak ılık su
                        </Text>
                        <List>
                            <ListItem>Siyah çay (şekersiz)</ListItem>
                            <ListItem>2 tane haşlanmış yumurta veya tavada yumurta</ListItem>
                            <ListItem>2 ince dilim süzme peynir veya 5 yemek kaşığı lor peynir veya 2 parmak kalınlığında beyaz peynir</ListItem>
                            <ListItem>4-5 tane az tuzlu siyah veya yeşil zeytin veya 2 tam ceviz içi</ListItem>
                            <ListItem>1 tatlı kaşığı reçel veya tahin pekmez</ListItem>
                            <ListItem>1,5 ince dilim tam buğday ekmeği veya kepek ekmeği veya çavdar ekmeği</ListItem>
                            <ListItem>Domates, salatalık, havuç, marul, yeşil veya kırmızı biber, bol yeşillik (istediğin kadar,limonlu)</ListItem>
                        </List>

                        {recipes.filter(recipe =>
                            recipe.details.suitableForMeals.includes(Number(Meal.Breakfast))).filter(x => x.details.or[0] !== undefined).slice(0, 5).map((recipe) => (
                                <>
                                    <Text
                                        fontSize={{ base: '16px', lg: '18px' }}
                                        color={useColorModeValue('pink.500', 'pink.300')}
                                    >Veya</Text>
                                    <List key={recipe.id}>
                                        <ListItem as={'a'} href={`#recipes-${recipe.id}`}>{recipe.details.or}</ListItem>
                                    </List>
                                </>
                            ))}
                    </Box>
                    <Box mb={5}>
                        <Heading size='md'>{mealLabels[Meal.Lunch]}</Heading>
                        <List>
                            <ListItem>8 yemek kaşığı etli/tavuklu sebze yemeği veya 8 yemek kaşığı kurubaklağil yemeği</ListItem>
                            <ListItem>1,5 ince dilim tam buğday ekmeği veya kepek ekmeği veya çavdar ekmeği veya 7 yemek kaşığı tam buğday makarna veya basmati pirinç veya bulgur pilavı</ListItem>
                            <ListItem>3 yemek kaşığı yoğurt (mutlaka)</ListItem>
                            <ListItem>Bol salata (zeytinyağlı, az tuzlu)(mutlaka)</ListItem>
                        </List>
                        {recipes.filter(recipe =>
                            recipe.details.suitableForMeals.includes(Number(Meal.Lunch))
                        ).slice(0, 5).filter(x => x.details.or[0] !== undefined).map((recipe) => (
                            <>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('pink.500', 'pink.300')}
                                >Veya</Text>
                                <List key={recipe.id}>
                                    <ListItem as={'a'} href={`#recipes-${recipe.id}`}>{recipe.details.or[0] ?? recipe.name}</ListItem>
                                </List>
                            </>
                        ))}
                    </Box>
                    <Box mb={5}>
                        <Heading size='md'>{mealLabels[Meal.Refreshment]}</Heading>
                        {recipes.filter(recipe =>
                            recipe.details.suitableForMeals.includes(Number(Meal.Refreshment))
                        ).slice(0, 5).filter(x => x.details.or[0] !== undefined).map((recipe) => (
                            <>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('pink.500', 'pink.300')}
                                >Veya</Text>
                                <List key={recipe.id}>
                                    <ListItem as={'a'} href={`#recipes-${recipe.id}`}>{recipe.details.or[0] ?? recipe.name}</ListItem>
                                </List>
                            </>
                        ))}
                    </Box>
                    <Box mb={5}>
                        <Heading size='md'>{mealLabels[Meal.Dinner]}</Heading>
                        <List>
                            <ListItem>{percentage === "1" ? "6" : "8"} yemek kaşığı etli/tavuklu sebze yemeği veya {percentage === "1" ? "6" : "8"} yemek kaşığı kurubaklağil yemeği</ListItem>
                            <ListItem>1,5 ince dilim tam buğday ekmeği veya kepek ekmeği veya çavdar ekmeği veya 7 yemek kaşığı tam buğday makarna veya basmati pirinç veya bulgur pilavı</ListItem>
                            <ListItem>3 yemek kaşığı yoğurt (mutlaka)</ListItem>
                            <ListItem>Bol salata (zeytinyağlı, az tuzlu)(mutlaka)</ListItem>
                        </List>
                        {recipes.filter(recipe =>
                            recipe.details.suitableForMeals.includes(Number(Meal.Dinner))
                        ).slice(0, 5).map((recipe) => (
                            <>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('pink.500', 'pink.300')}
                                >Veya</Text>
                                <List key={recipe.id}>
                                    <ListItem as={'a'} href={`#recipes-${recipe.id}`}>{recipe.details.or[0] ?? recipe.name}</ListItem>
                                </List>
                            </>
                        ))}
                    </Box>
                    <Box>
                        <Image width='100%' src="https://cdn.recepdmr.dev/tenants%2Fc23d5333-4969-46be-b2e3-22dcb9d982c9%2Fstatic%2Ftemp%2F1.png" alt="s" />
                    </Box>
                </SimpleGrid>

                <RecipeList recipes={recipes} />
                <Box>
                    <Image width='100%' src="https://cdn.recepdmr.dev/tenants%2Fc23d5333-4969-46be-b2e3-22dcb9d982c9%2Fstatic%2Ftemp%2F2.png" alt="s" />
                </Box>
                <Box>
                    <Image width='100%' src="https://cdn.recepdmr.dev/tenants%2Fc23d5333-4969-46be-b2e3-22dcb9d982c9%2Fstatic%2Ftemp%2F3.png" alt="s" />
                </Box>
                <Box>
                    <Image width='100%' src="https://cdn.recepdmr.dev/tenants%2Fc23d5333-4969-46be-b2e3-22dcb9d982c9%2Fstatic%2Ftemp%2F4.png" alt="s" />
                </Box>
                <Box>
                    <Image width='100%' src="https://cdn.recepdmr.dev/tenants%2Fc23d5333-4969-46be-b2e3-22dcb9d982c9%2Fstatic%2Ftemp%2F5.png" alt="s" />
                </Box>
                <Box>
                    <Image width='100%' src="https://cdn.recepdmr.dev/tenants%2Fc23d5333-4969-46be-b2e3-22dcb9d982c9%2Fstatic%2Ftemp%2F6.png" alt="s" />
                </Box>
            </Box>
            <Box
            >
                <hr style={{ border: '2px solid gray' }} />
                <Box display='flex' justifyContent='space-around' mt={5}>
                    <Box display={'flex'}><Image width={5} height={5} src={`${process.env.NEXT_PUBLIC_STATIC_ENDPOINT}/host/static/images/instagram.svg`} alt='instagram' />&nbsp;<span>@diyetisyennisaaslan</span></Box>
                    <Box display={'flex'}><Image width={5} height={5} src={`${process.env.NEXT_PUBLIC_STATIC_ENDPOINT}/host/static/images/youtube.svg`} alt='youtube' />&nbsp;<span>@diyetisyennisaaslan</span></Box>
                    <Box display={'flex'}><Image width={5} height={5} src={`${process.env.NEXT_PUBLIC_STATIC_ENDPOINT}/host/static/images/tiktok.svg`} alt='tiktok' />&nbsp;<span>@diyetisyennisaaslan</span></Box>

                </Box>
            </Box >
        </>
    )
}

const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
    return (
        <>
            <Heading size='lg'>Tarifler</Heading>
            {recipes.map((recipe) => (
                <SimpleGrid
                    id={`recipes-${recipe.id}`}
                    marginTop={10}
                    key={recipe.name}
                    spacing={{ base: 11, md: 10 }}>
                    <Heading size='md'>{recipe.name}</Heading>
                    {recipe.details.photos[0] && (
                        <Center>
                            <Image
                                rounded={'md'}
                                alt={recipe.name}
                                src={`${process.env.NEXT_PUBLIC_STATIC_ENDPOINT}/tenants/c23d5333-4969-46be-b2e3-22dcb9d982c9/static/images/recipes${recipe.details.photos[0]}`}
                                fit={'cover'}
                                w={400}
                                maxH={'auto'}
                            />
                        </Center>
                    )}
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                />
                            }>
                            <Box>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                    <Box>
                                        <Text
                                            fontSize={{ base: '16px', lg: '18px' }}
                                            color={useColorModeValue('pink.500', 'pink.300')}
                                            fontWeight={'500'}
                                            textTransform={'uppercase'}
                                            mb={'4'}>
                                            İçindekiler
                                        </Text>
                                        <List>
                                            {recipe.details.ingredients.map((item, i) => (
                                                <ListItem key={i}>{item}</ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    <Box>
                                        <Text
                                            fontSize={{ base: '16px', lg: '18px' }}
                                            color={useColorModeValue('pink.500', 'pink.300')}
                                            fontWeight={'500'}
                                            textTransform={'uppercase'}
                                            mb={'4'}>
                                            Yapılış Adımları
                                        </Text>
                                        <List>
                                            {recipe.details.steps.map((item, i) => (
                                                <ListItem key={i}>{item}</ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </SimpleGrid>
                            </Box>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            ))}
        </>
    );
}
