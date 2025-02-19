import { InputHTMLAttributes } from 'react'
import { FormControl, FormLabel, InputGroup, type FormControlProps } from 'react-bootstrap'
import Feedback from 'react-bootstrap/esm/Feedback'
import { Controller, type FieldPath, type FieldValues, type PathValue } from 'react-hook-form'

import type { FormInputProps } from '@/types/component-props'
import { IconType } from 'react-icons'

type IconFormInputProps = { icon: IconType }

const IconTextFormInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  containerClassName,
  control,
  id,
  label,
  icon,
  noValidate,
  ...other
}: FormInputProps<TFieldValues> & FormControlProps & InputHTMLAttributes<HTMLInputElement> & IconFormInputProps) => {
  const Icon = icon
  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={'' as PathValue<TFieldValues, TName>}
      control={control}
      render={({ field, fieldState }) => (
        <div className={containerClassName ?? ''}>
          {label && <FormLabel>{label}</FormLabel>}
          <InputGroup size="lg">
            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
              <Icon />
            </span>
            <FormControl className="border-0 bg-light rounded-end ps-1" {...other} {...field} isInvalid={Boolean(fieldState.error?.message)} />
            {!noValidate && fieldState.error?.message && <Feedback type="invalid">{fieldState.error?.message}</Feedback>}
          </InputGroup>
        </div>
      )}
    />
  )
}

export default IconTextFormInput
