import { ComponentProps } from "react";

type UserProfileSkeletonProps = ComponentProps<"div">;

export default function UserProfileSkeleton({ className, children }: UserProfileSkeletonProps) {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div className={`flex items-center gap-4`}>
                <div className="skeleton bg-base-200 w-10 h-10 rounded-full" />
                <div>
                    <div className="skeleton bg-base-200 w-24 h-3"></div>
                    <div className="skeleton bg-base-200 w-16 h-2 mt-2"></div>
                </div>
            </div>
            {children}
        </div>
    );
}
