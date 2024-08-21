import { ComponentProps } from "react";

export default function LoadingSpinner({ className }: ComponentProps<"span">) {
    return <span className={`loading loading-spinner loading-md ${className}`} />;
}
