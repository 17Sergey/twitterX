import { useRef } from "react";

import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";

import CommentsModal from "./CommentsModal";
import LoadingSpinner from "../LoadingSpinner";

import { PostType } from "../../../utils/dataTypes";
import { useUser } from "../../../hooks/useUser";
import { useLike } from "../../../hooks/useLike";

type PostControlsProps = {
    activeTab: string;
} & Pick<PostType, "comments" | "likes" | "_id">;

export default function PostControls({
    comments,
    likes,
    _id: postId,
    activeTab,
}: PostControlsProps) {
    const commentsCount = comments?.length || 0;
    const likesCount = likes?.length || 0;

    const { userAuth } = useUser();

    let isLiked;
    if (userAuth) {
        isLiked = likes.includes(userAuth?._id);
    }

    const { likeMutation, isLiking } = useLike({ postId, activeTab });

    const handleLikePost = () => {
        if (isLiking) return;
        likeMutation();
    };

    const commentsModalRef = useRef<HTMLDialogElement>(null);

    const hadleCommentsClick = () => {
        if (commentsModalRef.current) {
            commentsModalRef.current.showModal();
        }
    };

    return (
        <div className="mt-6 flex justify-between items-center">
            <div>
                <div
                    className="flex items-center gap-2 group cursor-pointer"
                    onClick={hadleCommentsClick}
                >
                    <FaRegComment
                        className={`w-4 h-4 fill-neutral-content group-hover:fill-primary transition-all`}
                    />
                    <span className="text-sm group-hover:text-primary">{commentsCount}</span>
                </div>
                <CommentsModal
                    modalRef={commentsModalRef}
                    comments={comments}
                    _id={postId}
                />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
                <BiRepost className="w-6 h-6 fill-neutral-content hover:fill-primary transition-all" />
                <span>0</span>
            </div>
            <div
                className="flex items-center gap-2 group cursor-pointer"
                onClick={handleLikePost}
            >
                {!isLiked && !isLiking && (
                    <FaRegHeart
                        className={`w-4 h-4 fill-neutral-content group-hover:fill-error transition-all`}
                    />
                )}
                {isLiking && <LoadingSpinner className="loading-xs scale-75" />}
                {isLiked && !isLiking && <FaHeart className="w-4 h-4 fill-error transition-all" />}
                {!isLiking && (
                    <span className={`text-sm fill-neutral-content group-hover:text-error`}>
                        {likesCount || null}
                    </span>
                )}
            </div>
            <FaRegBookmark className="w-4 h-4 relative top-0.5 cursor-pointer fill-neutral-content hover:fill-[--theme-accent] transition-all" />
        </div>
    );
}
