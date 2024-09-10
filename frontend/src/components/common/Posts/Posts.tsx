import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import Post from "./Post";
import PostSkeleton from "../../skeletons/PostSkeleton";

import { postsAPI } from "../../../api/postsAPI";
import { PostType } from "../../../utils/dataTypes";
import { QUERY_KEYS } from "../../../utils/queryKeys";

const getPostsEndpoint = (activeTab: string): string => {
    switch (activeTab) {
        case "forYou":
            return "/api/posts/all";
        case "following":
            return "/api/posts/following";

        default:
            return "/api/posts/all";
    }
};

const Posts = ({ activeTab }: { activeTab: string }) => {
    const endpoint = getPostsEndpoint(activeTab);

    const {
        data: posts,
        isLoading,
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
            {isLoading && (
                <div className="flex flex-col justify-center">
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!isLoading && posts?.length === 0 && (
                <p className="text-center my-4">No posts in this tab. Switch 👻</p>
            )}
            {error && (
                <p className="text-center text-error-content my-4">
                    Sorry, it looks like an error occured: {error.message}
                </p>
            )}
            {!isLoading && posts && (
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
