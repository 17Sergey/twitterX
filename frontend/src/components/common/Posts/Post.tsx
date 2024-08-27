import { PostType } from "../../../utils/dataTypes";
import { Link } from "react-router-dom";

import { FaTrash } from "react-icons/fa";
import PostControls from "./PostControls";

type PostProps = {
    post: PostType;
};

export default function Post({ post }: PostProps) {
    const formattedDate = "1h";
    const isMyPost = post.user.username === "johndoe";

    return (
        <div className="border-b border-1 border-neutral pt-4 pb-4">
            <div className="flex gap-4 px-4">
                <Link
                    className="w-10 h-10 flex-shrink-0"
                    to={`/profile/${post.user.username}`}
                >
                    <img
                        className="rounded-full"
                        src={post.user?.profileImg || "/avatar-placeholder.png"}
                        alt="Avatar"
                    />
                </Link>
                <div className="w-full">
                    <div className="flex justify-between items-center gap-4 relative top-1.5">
                        <Link
                            to={`/profile/${post.user.username}`}
                            className="flex flex-wrap items-baseline gap-4"
                        >
                            <p className="font-semibold text-base">{post.user?.fullName}</p>
                            <p className="font-normal text-sm opacity-30">@{post.user?.username}</p>
                            <p className="font-normal text-sm opacity-30">{formattedDate}</p>
                        </Link>
                        {isMyPost && (
                            <FaTrash className="w-4 h-4 cursor-pointer hover:fill-error transition-all" />
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
                    comments={post.comments}
                    likes={post.likes}
                />
            </div>
        </div>
    );
}
