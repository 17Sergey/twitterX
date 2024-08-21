import { useRef, useState } from "react";
import { PostType } from "../../../utils/dummy";

import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import CommentsModal from "./CommentsModal";

type PostControlsProps = Pick<PostType, "comments" | "likes">;

export default function PostControls({ comments, likes }: PostControlsProps) {
    const commentsCount = comments?.length || 0;
    const likesCount = likes?.length || 0;

    // const isLiked = likes.includes("6658s891");
    const [isLiked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked((liked) => !liked);
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
                />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
                <BiRepost className="w-6 h-6 fill-neutral-content hover:fill-primary transition-all" />
                <span>0</span>
            </div>
            <div
                className="flex items-center gap-2 group cursor-pointer"
                onClick={handleLike}
            >
                {!isLiked && (
                    <FaRegHeart
                        className={`w-4 h-4 fill-neutral-content group-hover:fill-error transition-all`}
                    />
                )}
                {isLiked && <FaHeart className="w-4 h-4 fill-error transition-all" />}
                <span className={`text-sm fill-neutral-content group-hover:text-error`}>
                    {likesCount}
                </span>
            </div>
            <FaRegBookmark className="w-4 h-4 relative top-0.5 cursor-pointer fill-neutral-content hover:fill-[--theme-accent] transition-all" />
        </div>
    );
}
