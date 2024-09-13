import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { UserProfileType } from "../../utils/dataTypes";

type EditProfileModalProps = {
    // coverImg: string | null;
    // profileImg: string | null;
    userProfile: UserProfileType;
};

export default function EditProfileModal({
    // coverImg,
    // profileImg,
    userProfile,
}: EditProfileModalProps) {
    const [formData, setFormData] = useState({
        fullName: userProfile.fullName,
        username: userProfile.username,
        email: userProfile.email,
        bio: userProfile.bio,
        link: userProfile.link,
        newPassword: "",
        currentPassword: "",
    });

    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Profile updated successfully");
    };

    return (
        <div className="mt-4">
            <button
                className="btn btn-primary rounded-full text-[--theme-accent] btn-sm"
                onClick={openModal}
            >
                Edit Profile
            </button>
            <dialog
                ref={modalRef}
                className="modal"
            >
                <div className="modal-box w-4/5 max-w-2xl border border-neutral md:border-neutral-content shadow-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 outline-none">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Update Profile</h3>
                    <form
                        className="flex flex-col gap-2 md:gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-wrap gap-2">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="flex-1 input input-bordered rounded p-2 input-md"
                                value={formData.fullName}
                                name="fullName"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="flex-1 input input-bordered rounded p-2 input-md"
                                value={formData.username}
                                name="username"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row flex-wrap gap-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 input input-bordered rounded p-2 input-md"
                                value={formData.email}
                                name="email"
                                onChange={handleInputChange}
                            />
                            <textarea
                                placeholder="Bio"
                                className="flex-1 input input-bordered rounded p-2 input-md"
                                value={formData.bio}
                                name="bio"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <input
                                type="password"
                                placeholder="Current Password"
                                className="flex-1 input input-bordered rounded p-2 input-md"
                                value={formData.currentPassword}
                                name="currentPassword"
                                onChange={handleInputChange}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="flex-1 input input-bordered rounded p-2 input-md"
                                value={formData.newPassword}
                                name="newPassword"
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Link"
                            className="flex-1 input input-bordered rounded p-2 input-md min-h-11"
                            value={formData.link}
                            name="link"
                            onChange={handleInputChange}
                        />
                        <div>
                            {/* <p className="mb-4">Profile image: </p>
                            <img
                                className="w-32 h-32 object-cover rounded-full"
                                src={
                                    profileImg ||
                                    userProfile?.profileImg ||
                                    "/avatar-placeholder.png"
                                }
                            />
                            <p className="mt-4 mb-4">Cover image: </p>
                            <img
                                className="w-full h-64 object-cover"
                                src={coverImg || userProfile?.coverImg || "/cover.png"}
                                alt=""
                            /> */}
                        </div>
                        <button className="btn btn-primary rounded-full btn-sm mt-2 md:mt-0 min-h-11 text-[--theme-accent]">
                            Update
                        </button>
                    </form>
                </div>
                <form
                    method="dialog"
                    className="modal-backdrop"
                >
                    <button className="outline-none">close</button>
                </form>
            </dialog>
        </div>
    );
}
