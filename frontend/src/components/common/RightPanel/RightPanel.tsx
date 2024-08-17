import { USERS_FOR_RIGHT_PANEL as users } from "../../../utils/dummy";
import UserProfileSkeleton from "../../skeletons/UserProfileSkeleton";
import UserProfile from "../UserProfile";

export default function RightPanel() {
    const isLoading = true;
    return (
        <div className="mt-4 rounded-lg bg-base-300 p-4">
            <p className="font-bold mb-4">Who to follow</p>
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
            {!isLoading &&
                users?.map((user) => {
                    return (
                        <UserProfile
                            {...user}
                            className="mb-4 last:mb-0"
                        >
                            <button className="btn bg-[--theme-accent] hover:bg-neutral-content text-primary-content btn-sm rounded-full">
                                Follow
                            </button>
                        </UserProfile>
                    );
                })}
        </div>
    );
}
