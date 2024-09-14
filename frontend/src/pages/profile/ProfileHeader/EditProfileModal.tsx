import { ChangeEvent, Dispatch, FormEvent, useState } from "react";

import ProfileImg from "./ProfileImg";
import ProfileCoverImg from "./ProfileCoverImg";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

import { Nullable, UserProfileType } from "../../../utils/dataTypes";
import ToasterModified from "../../../components/common/ToasterModified";
import { useUpdateProfile } from "../../../hooks/mutations/useUpdateProfile";
import { useModal } from "../../../hooks/useModal";

type EditProfileModalProps = {
    coverImg: string | null;
    profileImg: string | null;
    setCoverImg: Dispatch<React.SetStateAction<string | null>>;
    setProfileImg: Dispatch<React.SetStateAction<string | null>>;
    userProfile: UserProfileType;
};

export default function EditProfileModal({
    coverImg,
    profileImg,
    setCoverImg,
    setProfileImg,
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { modalRef, openModal } = useModal();

    const { updateProfile, isPending } = useUpdateProfile();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;

        // Send only the data that has changed
        const data: Nullable<typeof formData> = { ...formData };

        data.fullName = formData.fullName === userProfile.fullName ? null : formData.fullName;
        data.username = formData.username === userProfile.username ? null : formData.username;
        data.email = formData.email === userProfile.email ? null : formData.email;
        data.bio = formData.bio === userProfile.bio ? null : formData.bio;
        data.link = formData.link === userProfile.link ? null : formData.link;

        updateProfile({ ...data, coverImg, profileImg });
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
                {/* By default dialog tag is over any html content. So we need to place Toaster in it to be able to see a notification */}
                <ToasterModified />
                <div className="modal-box p-0 w-4/5 max-w-2xl border border-neutral md:border-neutral-content shadow-md overflow-hidden">
                    <div className="p-6 pb-0">
                        <h3 className="font-bold text-lg mb-4">Update Profile</h3>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 outline-none">
                                ✕
                            </button>
                        </form>
                    </div>
                    <form
                        className="flex flex-col gap-2 md:gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="px-6 overflow-y-auto max-h-96 flex flex-col gap-2 md:gap-4">
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
                                <p className="mb-4">Profile image: </p>
                                <ProfileImg
                                    isMyProfile={true}
                                    userImg={userProfile?.profileImg}
                                    uploadedImg={profileImg}
                                    setUploadedImg={setProfileImg}
                                />
                                <p className="mt-4 mb-4">Cover image: </p>
                                <ProfileCoverImg
                                    isMyProfile={true}
                                    userImg={userProfile?.coverImg}
                                    uploadedImg={coverImg}
                                    setUploadedImg={setCoverImg}
                                />
                            </div>
                        </div>
                        <button className="mx-6 mb-6 btn btn-primary rounded-full btn-sm mt-2 md:mt-0 min-h-11 text-[--theme-accent]">
                            {isPending ? <LoadingSpinner className="loading-sm" /> : "Update"}
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
