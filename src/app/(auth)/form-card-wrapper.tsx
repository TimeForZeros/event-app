import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FormCardWrapperProps = {
  title: string;
  children: ReactNode;
};
const FormCardWrapper = ({ title, children }: FormCardWrapperProps) => {
  return (
    <div className="flex justify-center h-screen items-center">
      <Card className="w-[24rem] max-h-[20rem]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default FormCardWrapper;
