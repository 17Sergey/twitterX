import React from "react";

export default function ProfileHeaderSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full my-0 p-4">
            <div className="flex gap-2 items-center">
                <div className="flex flex-1 gap-1">
                    <div className="flex flex-col gap-1 w-full">
                        <div className="skeleton h-4 w-24 rounded-full"></div>
                        <div className="skeleton h-4 w-16 rounded-full"></div>
                        <div className="skeleton h-64 w-full relative">
                            <div className="skeleton w-32 h-32 rounded-full border border-neutral absolute -bottom-12 left-4"></div>
                        </div>
                        <div className="skeleton h-10 mt-4 w-28 ml-auto rounded-full"></div>
                        <div className="pl-4 flex flex-col gap-2">
                            <div className="skeleton h-4 w-32 rounded-full mt-4"></div>
                            <div className="skeleton h-4 w-20 rounded-full"></div>
                            <div className="skeleton h-4 w-1/3 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
