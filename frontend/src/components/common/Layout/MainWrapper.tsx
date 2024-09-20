import { ComponentProps } from "react";

export default function MainWrapper({ children }: ComponentProps<"main">) {
    return (
        <main className="w-full lg:border-x md:border-l md:border-neutral mx-0 lg:mx-4">
            {children}
        </main>
    );
}
