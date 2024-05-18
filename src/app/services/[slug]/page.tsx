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
    Select,
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
import BasicQuestionRadio from '../../../ui/components/basic-question-radio';
import SelectCheckbox from '@/ui/components/select-checkbox';

const inValidMessage = "Invalid, please fill with correctly"
const schema = z.object({
    firstName: z.string({ message: inValidMessage }).min(2, { message: inValidMessage }),
    lastName: z.string({ message: inValidMessage }).min(2, { message: inValidMessage }),
    phoneCode: z.number({ message: inValidMessage }).positive({ message: inValidMessage }),
    tenantId: z.string({ message: inValidMessage }).uuid({ message: inValidMessage }),
});

const endpoint: string = process.env.NEXT_PUBLIC_API_ENDPOINT!

export default function ApplicationForm({ params }: { params: { slug: string } }) {

    const toast = useToast()
    const {
        handleSubmit,
        register,
        control,
        reset,
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
            title: 'Service was starting to deploy!',
            description: "Please check your services page",
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
                    <Heading textAlign='center'>Deploy to {params.slug}</Heading>
                </Box>
                <PersonalInformation />
                <Center>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>Deploy</Button>
                </Center>
            </Container>
        </form>
    )

    function PersonalInformation() {
        return <SimpleGrid columns={[1, 1]} spacing={5}>
            <Box>
                <FormControl isInvalid={errors.version !== undefined}>
                    <FormLabel htmlFor='version'>Version</FormLabel>
                    <Select {...register('version', { valueAsNumber: true })}>
                        <option defaultChecked value={-1}>Select version</option>
                        <option value={(1).toString()} defaultChecked>V1.0</option>
                        <option value={(2).toString()} defaultChecked>V1.0</option>
                    </Select>
                    {errors.version && (
                        <FormErrorMessage>
                            {errors.version.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            </Box>
            <Box>
                <FormControl isInvalid={errors.firstName !== undefined}>
                    <FormLabel htmlFor='firstName'>Default username</FormLabel>
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
                    <FormLabel htmlFor='lastName'>Default password</FormLabel>
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
                <FormControl isInvalid={errors.problem !== undefined}>
                    <FormLabel htmlFor='weight'>Tags</FormLabel>
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
            <Box>
                <BasicQuestionRadio control={control} error={errors.firstName} name='firstName' label={'SSL Enabled?'} />
            </Box>
            <Box>
                <SelectCheckbox label={"Select extra features"} control={control} name='firstName' error={errors.firstName} options={[{
                    label: "Search optimization",
                    value: "Search optimization"
                },
                {
                    label: "Database backup",
                    value: "Database backup"
                }]} />
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
