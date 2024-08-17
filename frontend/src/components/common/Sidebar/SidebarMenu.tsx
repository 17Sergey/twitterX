export default function SidebarMenu({ className, children }: React.ComponentProps<"ul">) {
    return <ul className={className}>{children}</ul>;
}
