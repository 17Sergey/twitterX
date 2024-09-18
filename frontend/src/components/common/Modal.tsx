import { ComponentProps, RefObject, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

type ModalProps = {
    title: string;
    modalRef: RefObject<HTMLDialogElement>;
} & ComponentProps<"dialog">;

export default function Modal({ title, children, modalRef }: ModalProps) {
    const handleClickOutside = () => {
        modalRef?.current?.close();
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
                className="modal-box p-6 pr-0 mx-2 w-4/5 flex flex-col max-w-3xl border border-neutral md:border-neutral-content cursor-default"
            >
                <div className="pr-2">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 outline-none">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg mb-8">{title}</h3>
                </div>
                {children}
            </div>
        </dialog>
    );
}
