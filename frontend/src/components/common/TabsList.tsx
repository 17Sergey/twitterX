import { ComponentProps } from "react";

export default function TabsList({ className, children }: ComponentProps<"div">) {
    return (
        <div
            role="tablist"
            className={`flex border-b border-neutral ${className}`}
        >
            {children}
        </div>
    );
}
