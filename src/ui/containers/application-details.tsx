import { Control, FieldError, FieldErrors, Path, UseFormRegister } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    SimpleGrid,
    Box,
    Textarea,
} from '@chakra-ui/react'
import QuestionRadio from '@/ui/components/question-radio';
import BasicQuestionRadio from '@/ui/components/basic-question-radio';
import { ApplicationDetailsOption, OptionType, applicationDetailsOptions } from '@/consts/application-details-options';
import SelectCheckbox from '../components/select-checkbox';
import { Application } from '@/domain/applications/application';

export default function ApplicationDetails({ register, errors, control }: { register: UseFormRegister<Application>, errors: FieldErrors<Application> | undefined, control: Control<Application, any> }) {
    const generateComponent = (question: ApplicationDetailsOption) => {
        const fieldName = `details.${question.name}` as Path<Application>;

        let error: FieldError | undefined = undefined;

        if (errors && errors.details)
            error = errors.details[question.name] as FieldError | undefined

        switch (question.type) {
            case 'no-or-answer':
                return <QuestionRadio name={fieldName} label={question.label} register={register} error={error} />
            case 'input':
                return <FormControl isInvalid={error !== undefined}>
                    <FormLabel htmlFor={fieldName}>{question.label}</FormLabel>
                    <Input
                        id={fieldName}
                        type="text"
                        {...register(fieldName as Path<Application>)}
                    />
                    {error && (
                        <FormErrorMessage>
                            {error.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            case 'textarea':
                return <FormControl isInvalid={error !== undefined}>
                    <FormLabel htmlFor={fieldName}>{question.label}</FormLabel>
                    <Textarea
                        id={fieldName}
                        {...register(fieldName as Path<Application>)}
                    />
                    {error && (
                        <FormErrorMessage>
                            {error.message}
                        </FormErrorMessage>
                    )}
                </FormControl>
            case 'yes-or-no':
                return <BasicQuestionRadio control={control} error={error} name={fieldName} label={question.label} />

            case 'checkbox':
                return <SelectCheckbox label={question.label} control={control} name={fieldName} error={error} options={question.defaultValue as OptionType[]} />
            default:
                return <p style={{ color: 'red' }}>{question.type}({question.label}) is not configured</p>
        }
    }

    return (
        <SimpleGrid paddingTop={5} columns={[1, 2]} spacing={5}>
            {applicationDetailsOptions.map((question) => {
                return (
                    <Box key={question.name}>
                        {generateComponent(question)}
                    </Box>
                )
            })}
        </SimpleGrid>
    )
}