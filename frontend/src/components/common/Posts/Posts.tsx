import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Post from "./Post";
import PostSkeleton from "../../skeletons/PostSkeleton";

import { postsAPI } from "../../../api/postsAPI";
import { PostType } from "../../../utils/dataTypes";
import { QUERY_KEYS } from "../../../utils/queryKeys";
import { useUser } from "../../../hooks/queries/useUser";

const getPostsEndpoint = (
    activeTab: string,
    username?: string | undefined,
    userId?: string | undefined
): string => {
    switch (activeTab) {
        case "forYou":
            return "/api/posts/all";
        case "following":
            return "/api/posts/following";
        case "userPosts":
            return `/api/posts/user/${username || ""}`;
        case "liked":
            return `/api/posts/liked/${userId || ""}`;

        default:
            return "/api/posts/all";
    }
};

const Posts = ({ activeTab, userId }: { activeTab: string; userId?: string }) => {
    const params = useParams();
    const { userAuth } = useUser();

    const username = params?.username || userAuth?.username || "";

    const endpoint = getPostsEndpoint(activeTab, username, userId);

    const {
        data: posts,
        isLoading,
        isRefetching,
        error,
        refetch,
    } = useQuery({
        queryKey: [QUERY_KEYS.POSTS],
        queryFn: () => postsAPI.getPosts(endpoint),
    });

    useEffect(() => {
        refetch();
    }, [activeTab, refetch]);

    return (
        <>
            {(isLoading || isRefetching) && (
                <div className="flex flex-col justify-center">
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!(isLoading || isRefetching) && posts?.length === 0 && (
                <p className="text-center my-8 min-h-20">No posts in this tab. Switch 👻</p>
            )}
            {error && (
                <p className="text-center text-error-content my-4">
                    Sorry, it looks like an error occured: {error.message}
                </p>
            )}
            {!(isLoading || isRefetching) && posts && (
                <div>
                    {posts.map((post: PostType) => (
                        <Post
                            key={post._id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
export default Posts;
