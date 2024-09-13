import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import LoadingSpinner from "../LoadingSpinner";

import { PostType } from "../../../utils/dataTypes";
import { useDeletePost } from "../../../hooks/useDeletePost";
import { useUser } from "../../../hooks/useUser";
import PostControls from "./PostControls";
import { formatPostDate } from "../../../utils/dateFunctions";

type PostProps = {
    post: PostType;
};

export default function Post({ post }: PostProps) {
    const { userAuth } = useUser();
    const { deleteMutation, isDeletePending } = useDeletePost(post);

    const formattedDate = formatPostDate(post.createdAt);

    const isMyPost = post.user?._id === userAuth?._id;

    const handleDeletePost = () => {
        deleteMutation();
    };

    return (
        <div className="border-b border-1 border-neutral pt-4 pb-4">
            <div className="flex gap-2 px-4">
                <Link
                    className="flex-shrink-0"
                    to={`/profile/${post.user.username}`}
                >
                    <img
                        className="w-12 h-12 rounded-full"
                        src={post.user?.profileImg || "/avatar-placeholder.png"}
                        alt="Avatar"
                    />
                </Link>
                <div className="w-full">
                    <div className="flex justify-between items-center gap-4 relative top-1.5">
                        <Link
                            to={`/profile/${post.user.username}`}
                            className="flex flex-wrap items-baseline gap-2"
                        >
                            <p className="font-semibold text-base">{post.user?.fullName}</p>
                            <p className="font-normal text-sm opacity-30">@{post.user?.username}</p>
                            <p className="font-normal text-sm opacity-30">{formattedDate}</p>
                        </Link>
                        {isMyPost && !isDeletePending && (
                            <FaTrash
                                onClick={handleDeletePost}
                                className="w-4 h-4 cursor-pointer hover:fill-error transition-all"
                            />
                        )}
                        {isDeletePending && (
                            <LoadingSpinner className="loading-xs cursor-pointer" />
                        )}
                    </div>
                </div>
            </div>
            <div className="px-4">
                <p className="mt-2">{post.text}</p>
                {post.img && (
                    <img
                        className="mt-4 w-full h-80 object-contain rounded-lg border border-neutral"
                        src={post.img}
                        alt="From post"
                    />
                )}
                <PostControls
                    _id={post._id}
                    comments={post.comments}
                    likes={post.likes}
                />
            </div>
        </div>
    );
}
