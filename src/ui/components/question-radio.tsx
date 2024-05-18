'use client'
import { FormControl, FormErrorMessage, FormLabel, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>
    name: Path<T>
    label: string
    error: FieldError | undefined
};
export default function QuestionRadio<T extends FieldValues>({ register, name, label, error }: Props<T>) {
    const [selected, setSelected] = useState(false)
    return (
        <RadioGroup size='lg' onChange={(e) => setSelected(e === '1')} defaultValue='-1'>
            <FormControl isInvalid={error !== undefined}>
                <FormLabel paddingBottom={3}>{label}</FormLabel>
                <Stack id={name} direction='column'>
                    <Radio value='-1'>
                        Yok
                    </Radio>
                    <Stack direction='row'>
                        <Radio value='1'>
                            Var
                        </Radio>
                        <Input visibility={selected ? 'visible' : 'hidden'} {...register(name)} />
                    </Stack>
                    {error && (
                        <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                </Stack>
            </FormControl>
        </RadioGroup>
    )
}
