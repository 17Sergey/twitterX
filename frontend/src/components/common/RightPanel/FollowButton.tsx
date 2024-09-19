import LoadingSpinner from "../LoadingSpinner";

import { useFollow } from "../../../hooks/mutations/useFollow";

export default function FollowButton({
    userId,
    isFollowedProp,
}: {
    userId: string;
    isFollowedProp: boolean;
}) {
    const { follow, isPending, isFollowed } = useFollow(userId, isFollowedProp);

    const handleFollow = () => {
        if (isPending) return;
        follow();
    };

    return (
        <>
            {!isFollowed && (
                <button
                    className="min-w-8 ml-8 btn bg-[--theme-accent] hover:bg-neutral-content text-primary-content btn-sm rounded-full"
                    onClick={handleFollow}
                >
                    {isPending ? <LoadingSpinner className="loading-xs -scale-75" /> : "Follow"}
                </button>
            )}
            {isFollowed && (
                <button
                    className="min-w-8 ml-8 btn btn-outline hover:bg-[--theme-accent] btn-sm rounded-full"
                    onClick={handleFollow}
                >
                    {isPending ? <LoadingSpinner className="loading-xs -scale-75" /> : "Unfollow"}
                </button>
            )}
        </>
    );
}
