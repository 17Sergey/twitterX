import React, { MutableRefObject, useEffect } from "react";

export default function CommentsModal({ modalRef }: { modalRef: MutableRefObject<null> }) {
    useEffect(() => {
        modalRef.current.showModal();
        return () => {
            modalRef.current.close();
        };
    });
    return (
        <dialog
            id="my_modal_2"
            className="modal"
            ref={modalRef}
        >
            <div className="modal-box border border-neutral">
                <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
            </div>
            <form
                method="dialog"
                className="modal-backdrop"
            >
                <button className="outline-none">close</button>
            </form>
        </dialog>
    );
}
