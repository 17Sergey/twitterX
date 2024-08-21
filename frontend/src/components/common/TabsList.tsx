import { ComponentProps } from "react";

export default function TabsList({ children }: ComponentProps<"div">) {
    return (
        <div
            role="tablist"
            className="flex border-b border-neutral"
        >
            {children}
        </div>
    );
}
