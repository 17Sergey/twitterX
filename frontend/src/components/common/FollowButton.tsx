import LoadingSpinner from "./LoadingSpinner";
import { useFollow } from "../../hooks/useFollow";

export default function FollowButton({ userId }: { userId: string }) {
    const { follow, isFollowing, isFollowed } = useFollow();

    const handleFollow = (userId: string) => {
        if (isFollowing) return;
        follow(userId);
    };

    return (
        <>
            {!isFollowed && (
                <button
                    className="ml-8 btn bg-[--theme-accent] hover:bg-neutral-content text-primary-content btn-sm rounded-full"
                    onClick={() => handleFollow(userId)}
                >
                    {isFollowing ? <LoadingSpinner className="loading-xs -scale-75" /> : "Follow"}
                </button>
            )}
            {isFollowed && (
                <button
                    className="ml-8 btn btn-outline hover:bg-[--theme-accent] btn-sm rounded-full"
                    onClick={() => handleFollow(userId)}
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
