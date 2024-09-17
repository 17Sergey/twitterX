import LoadingSpinner from "../LoadingSpinner";

import { useRightPanelFollow } from "../../../hooks/mutations/useRightPanelFollow";

export default function FollowButton({ userId }: { userId: string }) {
    const { follow, isFollowing, isFollowed } = useRightPanelFollow(userId);

    const handleFollow = () => {
        if (isFollowing) return;
        follow();
    };

    return (
        <>
            {!isFollowed && (
                <button
                    className="min-w-8 ml-8 btn bg-[--theme-accent] hover:bg-neutral-content text-primary-content btn-sm rounded-full"
                    onClick={handleFollow}
                >
                    {isFollowing ? <LoadingSpinner className="loading-xs -scale-75" /> : "Follow"}
                </button>
            )}
            {isFollowed && (
                <button
                    className="min-w-8 ml-8 btn btn-outline hover:bg-[--theme-accent] btn-sm rounded-full"
                    onClick={handleFollow}
                >
                    {isFollowing ? (
                        <LoadingSpinner className="loading-xs -scale-75" />
                    ) : (
                        "Following"
                    )}
                </button>
            )}
        </>
    );
}
