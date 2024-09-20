import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import LoadingSpinner from "../LoadingSpinner";
import PostControls from "./PostControls";

import { PostType } from "../../../utils/dataTypes";
import { formatPostDate } from "../../../utils/dateFunctions";
import { useDeletePost } from "../../../hooks/mutations/useDeletePost";
import { useUser } from "../../../hooks/queries/useUser";
import { UserProfileAvatar, UserProfileName, UserProfileUsername } from "../UserProfile";

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
        <div className="border-b border-1 border-neutral p-4">
            <div className="flex justify-between items-center gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <Link
                        to={`/profile/${post.user.username}`}
                        className="flex flex-wrap items-center gap-2"
                    >
                        <UserProfileAvatar src={post.user.profileImg} />
                        <div className="md:flex gap-2 items-center">
                            <UserProfileName
                                fullName={post.user.fullName}
                                className="font-semibold text-base text-neutral-content"
                            />
                            <UserProfileUsername
                                username={post.user.username}
                                className="opacity-30"
                            />
                        </div>
                    </Link>
                    <p className="self-start md:self-center relative top-0.5 md:top-0 text-sm opacity-30 text-nowrap">
                        {formattedDate}
                    </p>
                </div>
                {isMyPost && !isDeletePending && (
                    <FaTrash
                        onClick={handleDeletePost}
                        className="w-4 h-4 shrink-0 cursor-pointer hover:fill-error transition-all"
                    />
                )}
                {isDeletePending && <LoadingSpinner className="loading-xs cursor-pointer" />}
            </div>
            <div>
                <p className="mt-2">{post.text}</p>
                {post.img && (
                    <img
                        className="mt-4 w-full max-h-80 h-fit object-contain rounded-lg border border-neutral"
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
