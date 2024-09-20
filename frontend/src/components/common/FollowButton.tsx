import LoadingSpinner from "./LoadingSpinner";

import { useFollow } from "../../hooks/mutations/useFollow";
import { useUser } from "../../hooks/queries/useUser";

export default function FollowButton({ userId }: { userId: string }) {
    const { userAuth } = useUser();

    const isFollowedByMe = userAuth?.following.includes(userId) || false;

    const { follow, isPending, isFollowed } = useFollow(userId, isFollowedByMe);

    const handleFollow = () => {
        if (isPending) return;
        follow();
    };

    const commonClasses = "min-w-16 ml-4 btn btn-primary btn-sm rounded-full text-sm md:text-base";
    const commonTextStyles = "text-sm";

    return (
        <>
            {!isFollowed && (
                <button
                    className={`${commonClasses} text-[--theme-accent] hover:text-[--theme-accent]`}
                    onClick={handleFollow}
                >
                    {isPending ? (
                        <LoadingSpinner className="loading-xs -scale-75" />
                    ) : (
                        <span className={`${commonTextStyles}`}>Follow</span>
                    )}
                </button>
            )}
            {isFollowed && (
                <button
                    className={`${commonClasses} btn-outline`}
                    onClick={handleFollow}
                >
                    {isPending ? (
                        <LoadingSpinner className="loading-xs -scale-75" />
                    ) : (
                        <span className={`${commonTextStyles}`}>Unfollow</span>
                    )}
                </button>
            )}
        </>
    );
}
