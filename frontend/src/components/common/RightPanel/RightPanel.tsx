import { useQuery } from "@tanstack/react-query";

import UserProfileSkeleton from "../../skeletons/UserProfileSkeleton";
import UserProfile from "../UserProfile";

import { UserType } from "../../../utils/dataTypes";
import { usersAPI } from "../../../api/usersAPI";

export default function RightPanel() {
    const {
        data: users,
        isLoading,
        error,
    } = useQuery<UserType[]>({
        queryKey: ["suggestedUsers"],
        queryFn: usersAPI.getSuggestedUsers,
        retry: false,
    });

    return (
        <aside className="min-h-screen border-l border-neutral hidden md:block shrink-0 sticky top-0">
            <div className="hidden lg:block mt-4 ml-4 rounded-lg bg-base-300 p-4">
                <p className="font-bold mb-4">Who to follow</p>
                {error && <p className="text-error-content">{error.message}</p>}
                {isLoading && (
                    <>
                        <UserProfileSkeleton className="mb-4">
                            <div className="skeleton bg-base-200 h-8 w-16 rounded-full"></div>
                        </UserProfileSkeleton>
                        <UserProfileSkeleton className="mb-4">
                            <div className="skeleton bg-base-200 h-8 w-16 rounded-full"></div>
                        </UserProfileSkeleton>
                        <UserProfileSkeleton className="mb-4">
                            <div className="skeleton bg-base-200 h-8 w-16 rounded-full"></div>
                        </UserProfileSkeleton>
                        <UserProfileSkeleton className="mb-0">
                            <div className="skeleton bg-base-200 h-8 w-16 rounded-full"></div>
                        </UserProfileSkeleton>
                    </>
                )}
                {!isLoading && users?.length !== 0 && (
                    <p className="max-w-64">No users to follow/suggest. Congratulations! 🎉</p>
                )}
                {!isLoading &&
                    users?.map((user) => {
                        return (
                            <UserProfile
                                {...user}
                                key={user._id}
                                className="mb-4 last:mb-0"
                            >
                                <button className="ml-8 btn bg-[--theme-accent] hover:bg-neutral-content text-primary-content btn-sm rounded-full">
                                    Follow
                                </button>
                            </UserProfile>
                        );
                    })}
            </div>
        </aside>
    );
}
