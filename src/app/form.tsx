import React from 'react';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { capitalize } from '@/lib/utils';
import type { UseFormReturn } from 'react-hook-form';
import type { FieldTypes } from './types';

type FormProps = {
  form: UseFormReturn<any>;
  fieldTypes: FieldTypes,
  handleAction: (values: any) => void | Promise<void>;
  errorMessage?: string;
};


const FormComponent = ({ form, fieldTypes, handleAction, errorMessage }: FormProps) => {
  console.log(fieldTypes);
  const fields = Object.keys(form.getValues());
  return (
    <Form {...form}>
      <FormMessage>{errorMessage}</FormMessage>
      <form onSubmit={form.handleSubmit(handleAction)}>
        {fields.map((fieldName) => {
          return (
            <FormField
              key={`field-${fieldName}`}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem className="my-1">
                  <FormMessage />
                  <FormControl>
                    <Input
                      type={fieldTypes[fieldName] ?? 'string'}
                      placeholder={capitalize(fieldName)}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormComponent;
