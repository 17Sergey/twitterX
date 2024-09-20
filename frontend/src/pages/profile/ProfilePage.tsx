import { useParams } from "react-router-dom";

import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileNotFound from "./ProfileNotFound";
import ProfileMenu from "./ProfileMenu";
import ProfilePosts from "./ProfilePosts";

import { useFetchProfile } from "../../hooks/queries/useFetchProfile";
import { useUser } from "../../hooks/queries/useUser";

export default function ProfilePage() {
    const { username } = useParams();
    const { userAuth } = useUser();

    const usernameForFetching = username || userAuth?.username || "";

    const { userProfile, isLoading, isRefetching, error } = useFetchProfile(usernameForFetching);

    if (isLoading || isRefetching) return <ProfileHeaderSkeleton />;

    if (!isLoading && error) return <ProfileNotFound />;

    return (
        <div>
            {userProfile && (
                <>
                    {/* Use query inside to prevent passing with props? */}
                    <ProfileMenu userProfile={userProfile} />
                    <ProfileHeader userProfile={userProfile} />
                    <ProfilePosts userProfile={userProfile} />
                </>
            )}
        </div>
    );
}
