import { RefObject, useRef } from "react";
import { PostType } from "../../../utils/dummy";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

import { useOnClickOutside } from "usehooks-ts";

type PostControlsProps = {
    modalRef: RefObject<HTMLDialogElement>;
} & Pick<PostType, "comments">;

export default function CommentsModal({ modalRef, comments }: PostControlsProps) {
    const handleClickOutside = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    const modalBox = useRef(null);
    useOnClickOutside(modalBox, handleClickOutside);

    return (
        <dialog
            id="my_modal_3"
            className="modal cursor-pointer"
            ref={modalRef}
        >
            <div
                ref={modalBox}
                className="modal-box mx-2 w-4/5 max-w-3xl border border-neutral md:border-neutral-content cursor-default"
            >
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 outline-none">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg mb-8">COMMENTS</h3>
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                    />
                ))}
                <AddCommentForm />
            </div>
        </dialog>
    );
}
