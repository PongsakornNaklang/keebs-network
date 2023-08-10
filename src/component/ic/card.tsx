
export interface ICCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const ICCard = (props: ICCardProps) => {
    const { children, className, ...rest } = props;
    return (
        <div {...rest}>
            {children}
        </div>
    );
}
