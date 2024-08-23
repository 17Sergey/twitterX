import { toast, Toaster, ToastBar } from "react-hot-toast";

export default function ToasterModified() {
    return (
        <Toaster>
            {/* Add closing on click */}
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== "loading" && (
                                <button
                                    className="absolute top-2 left-3 p-1 opacity-0"
                                    onClick={() => toast.dismiss(t.id)}
                                >
                                    X
                                </button>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
}
