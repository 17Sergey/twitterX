import { RefObject } from "react";

import Modal from "../Modal";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

import { PostType } from "../../../utils/dataTypes";

type PostControlsProps = {
    modalRef: RefObject<HTMLDialogElement>;
} & Pick<PostType, "comments" | "_id">;

export default function CommentsModal({ modalRef, comments, _id: postId }: PostControlsProps) {
    return (
        <Modal
            title={"FOLLOWERS"}
            modalRef={modalRef}
        >
            <div className="overflow-y-auto max-h-96">
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                    />
                ))}
            </div>
            <div className="pr-6">
                <AddCommentForm _id={postId} />
            </div>
        </Modal>
    );
}
