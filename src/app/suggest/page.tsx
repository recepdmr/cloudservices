'use client';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    SimpleGrid,
    Box,
    Container,
    Center,
    Image,
    useToast,
    Heading,
    Textarea,
} from '@chakra-ui/react'
import { Application } from '@/domain/applications/application';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Log, LogLevel } from '@/domain/logs/log';

const inValidMessage = "Invalid, please fill with correctly"
const schema = z.object({
    firstName: z.string({ message: inValidMessage }).min(2, { message: inValidMessage }),
    lastName: z.string({ message: inValidMessage }).min(2, { message: inValidMessage }),
    phoneNumber: z.number({ message: inValidMessage }).positive({ message: inValidMessage }),
    phoneCode: z.number({ message: inValidMessage }).positive({ message: inValidMessage }),
    tenantId: z.string({ message: inValidMessage }).uuid({ message: inValidMessage }),
    problem: z.string({ message: inValidMessage }).min(10, { message: inValidMessage }),

    // details: z.object({
    //     meals: z.array(z.string({ message: inValidMessage }).transform(x => Number(x)), { message: inValidMessage }),
    //     dislikedFoods: z.array(z.string({ message: inValidMessage }), { message: inValidMessage }).optional(),
    //     isPregnant: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     isDiabetes: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     haveEverStartDiet: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     whoDoesShoppingAtHome: z.string({ message: inValidMessage }),
    //     doesTakeSweetener: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     whatKindOfDietDidYouImplement: z.string({ message: inValidMessage }),
    //     whenDidStartFasting: z.string({ message: inValidMessage }),
    //     whenDidTakeGainWeight: z.string({ message: inValidMessage }),
    //     whyDidNotLosingWeight: z.string({ message: inValidMessage }),
    //     haveEverConstipation: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     whatIsYourCurrentWeightTargetRange: z.string({ message: inValidMessage }),
    //     doYouDoSports: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     whatFoodsDoYouDislike: z.string({ message: inValidMessage }),
    //     numberOfBirthsInFemaleIndividuals: z.string({ message: inValidMessage }),
    //     lastPostpartumBodyWeight: z.string({ message: inValidMessage }),
    //     howManyKgDidYouGainDuringYourLastPregnancy: z.string({ message: inValidMessage }),
    //     whatProblemsDidYouExperienceDuringYourPregnancy: z.string({ message: inValidMessage }),
    //     doYouHaveAnyDiseaseDiagnosedByDoctor: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     doYouUseAnyMinerals: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     historyOfUseOfAnyMedicationMethodForWeightLossBefore: z.string({ message: inValidMessage }),
    //     doYouHaveHistoryOfFood: z.string({ message: inValidMessage }),
    //     areThereAnyMedicationsYouUseRegularly: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     howOftenAndWhatKindOfFoodDoYouConsumeOutsideTheHome: z.string({ message: inValidMessage }),
    //     doYouHaveTheHabitOfWakingUpAtNightAndEating: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     doYouHaveHabitOfBingeEating: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     haveSleepPattern: z.string({ message: inValidMessage }).transform(x => Boolean(Number(x))),
    //     describeDay: z.string({ message: inValidMessage }),
    //     youCanWriteAnyInformationYouWantToSendUsHere: z.string({ message: inValidMessage }),
    // })
});

const endpoint: string = process.env.NEXT_PUBLIC_API_ENDPOINT!

export default function ApplicationForm() {

    const toast = useToast()
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Application>({
        shouldUseNativeValidation: false,
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<Application> = (data) => {
        fetch(endpoint + "/applications", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        }).then((res => {
            if (res.status === 201) {
                toast({
                    title: 'Ticket has been sent!',
                    description: "We are reviewing your tiket. Give us few hour",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                reset();
            }
        }))
        toast({
            title: 'Ticket has been sent!',
            description: "We are reviewing your tiket. Give us few hour",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            // INFO: log to server for trace form error
            const properties = [Object.keys(errors).map(x => {
                if (x.toString() !== 'details') {
                    const innerError: { ref: unknown, field: string } = (errors as never)[x] as never
                    if (innerError) {
                        delete innerError.ref
                        innerError.field = x;
                        return innerError
                    }
                }
            })];
            fetch(endpoint + "/logs", {
                method: 'POST',
                body: JSON.stringify({
                    category: 'form-errors',
                    message: 'has form errors',
                    properties: properties,
                    logLevel: LogLevel.Warning
                } as Log),
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
    }, [errors]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <HiddenField />
            <Container padding={5}>
                <Box>
                    <Image
                        height={200}
                        marginLeft='auto'
                        marginRight='auto'
                        objectFit='cover'
                        security='none'
                        src={`/logo.jpg`} alt={'logo'} />
                </Box>
                <Box mt={5}>
                    <Heading textAlign='center'>Suggest service</Heading>
                </Box>
                <PersonalInformation />
                <Center>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>Submit</Button>
                </Center>
            </Container>
        </form>
    )

    function PersonalInformation() {
        return <SimpleGrid columns={[1, 1]} spacing={5}>
            <Box>
                <FormControl isInvalid={errors.firstName !== undefined}>
                    <FormLabel htmlFor='firstName'>First Name</FormLabel>
                    <Input
                        {...register('firstName')} />
                    {errors.firstName && (
                        <FormErrorMessage>
                            {errors.firstName.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            </Box>
            <Box>
                <FormControl isInvalid={errors.lastName !== undefined}>
                    <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                    <Input
                        {...register('lastName')} />
                    {errors.lastName && (
                        <FormErrorMessage>
                            {errors.lastName.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            </Box>
            <Box>
                <FormControl isInvalid={errors.phoneNumber !== undefined}>
                    <FormLabel htmlFor='phoneNumber'>Phone Number</FormLabel>
                    <Input
                        type="number"
                        {...register('phoneNumber', { valueAsNumber: true })} />
                    {errors.phoneNumber && (
                        <FormErrorMessage>
                            {errors.phoneNumber.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            </Box>
            <Box>
                <FormControl isInvalid={errors.problem !== undefined}>
                    <FormLabel htmlFor='weight'>Suggest</FormLabel>
                    <Textarea
                        id={'problem'}
                        {...register('problem')} />
                    {errors.problem && (
                        <FormErrorMessage>
                            {errors.problem.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            </Box>
        </SimpleGrid>;
    }

    function HiddenField() {
        return (
            <>
                <Input type='hidden' {...register('phoneCode', { valueAsNumber: true })} value={90} />
                <Input type='hidden' {...register('tenantId')} value={process.env.NEXT_PUBLIC_TENANT_ID} />
                {errors.phoneCode && (
                    <h1>
                        phoneCode:
                        {errors.phoneCode.message}
                    </h1>
                )}
                {errors.tenantId && (
                    <h1>tenantId:
                        {errors.tenantId.message}
                    </h1>
                )}
            </>
        )
    }
}
