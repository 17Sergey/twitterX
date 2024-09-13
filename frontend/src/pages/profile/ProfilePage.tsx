import { useParams } from "react-router-dom";

import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import ProfileHeader from "./ProfileHeader";
import ProfileNotFound from "./ProfileNotFound";
import ProfileMenu from "./ProfileMenu";
import ProfilePosts from "./ProfilePosts";

import { useFetchProfile } from "../../hooks/useFetchProfile";

export default function ProfilePage() {
    const { username } = useParams();
    const { userProfile, isLoading, isRefetching, error } = useFetchProfile(username || "");

    if (isLoading || isRefetching) return <ProfileHeaderSkeleton />;

    if (!isLoading && error) return <ProfileNotFound />;

    return (
        <div>
            {userProfile && (
                <>
                    <ProfileMenu userProfile={userProfile} />
                    <ProfileHeader userProfile={userProfile} />
                    <ProfilePosts />
                </>
            )}
        </div>
    );
}
