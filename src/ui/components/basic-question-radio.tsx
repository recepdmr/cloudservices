'use client'
import { FormControl, FormLabel, Radio, RadioGroup, FormErrorMessage } from "@chakra-ui/react";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
    name: Path<T>
    label: string
    error: FieldError | undefined
    control: Control<T, any>
};
export default function BasicQuestionRadio<T extends FieldValues>({ name, label, error, control }: Props<T>) {

    return (
        <FormControl isInvalid={error !== undefined}>
            <FormLabel paddingBottom={3}>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={'1' as any}
                render={({ field: { ref, ...rest } }) => (
                    <RadioGroup size='lg' {...rest}>
                        <Radio marginRight={5} value="1">Yes</Radio>
                        <Radio value="0">No</Radio>
                    </RadioGroup>
                )}
            />
            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}

        </FormControl>
    )
}