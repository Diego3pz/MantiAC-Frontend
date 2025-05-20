import { Card } from '@tremor/react';

interface CardComponentProps {
    title: string;
    value: string;
}


export function CardComponent({ title, value }: CardComponentProps) {
    return (
        <Card
            className="mx-auto md:mx-0"
        >
            <p className="text-tremor-default text-tremor-content">{title}</p>
            <p className="text-3xl text-dark-tremor-content-subtle dark:text-dark-tremor-content-strong font-semibold">{value}</p>
        </Card>
    );
}