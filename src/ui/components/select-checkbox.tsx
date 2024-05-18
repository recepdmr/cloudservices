
import { Checkbox, CheckboxGroup, CheckboxProps, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

export type OptionType = { label: string, value: number | string };

interface Props<T extends FieldValues> {
    control: Control<T, any>
    name: Path<T>
    label: string
    options: Array<OptionType>
    error: FieldError | undefined
};
export default function SelectCheckbox<T extends FieldValues>({ name, options, error, control, label }: Props<T> & CheckboxProps) {
    return (
        <FormControl isInvalid={error !== undefined}>
            <FormLabel>{label}</FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup size='lg' {...rest}>
                        {options.map((option) => (
                            <Checkbox paddingRight={3} name={name} key={option.value} value={option.value.toString()}>{option.label}</Checkbox>
                        ))}
                    </CheckboxGroup>
                )}
            />
            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    )
}