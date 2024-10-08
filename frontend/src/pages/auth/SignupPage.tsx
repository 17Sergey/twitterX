import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

import XSvg from "../../components/svgs/XSvg";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { authAPI } from "../../api/authAPI.ts";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });

    const queryClient = useQueryClient();

    const { mutate, isError, isPending } = useMutation({
        mutationFn: authAPI.signUp,
        onSuccess: () => {
            toast.success("Account created successfully");
            queryClient.invalidateQueries({ queryKey: ["userAuth"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen justify-center md:items-center relative top-2/4 p-8">
            <div className="lg:w-80 md:w-60 w-24 mb-4 lg:mr-36 md:mr-24">
                <XSvg className="w-full fill-[--theme-accent]" />
            </div>
            <div className="">
                <h1 className="text-4xl text-[--theme-accent] font-extrabold mb-4">Join today.</h1>
                <form onSubmit={handleSubmit}>
                    <label className="input input-bordered rounded mb-4 md:w-80 flex items-center gap-2 w-full bg-transparent">
                        <MdOutlineMail />
                        <input
                            type="email"
                            className="grow"
                            placeholder="Email"
                            name="email"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                    <label className="input input-bordered rounded mb-4 flex items-center gap-2 w-full">
                        <FaUser />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Username"
                            name="username"
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>
                    <label className="input input-bordered rounded mb-4 flex items-center gap-2 w-full">
                        <MdDriveFileRenameOutline />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Full Name"
                            name="fullName"
                            onChange={handleInputChange}
                            value={formData.fullName}
                        />
                    </label>
                    <label className="input input-bordered rounded mb-4 flex items-center gap-2">
                        <MdPassword />
                        <input
                            type="password"
                            className="grow"
                            placeholder="Password"
                            name="password"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    {isError && <p className="text-error mb-4 text-center">Something went wrong</p>}
                    <button className="btn btn-primary w-full rounded-full text-[--theme-accent] font-medium text-base">
                        {isPending && <LoadingSpinner className="loading-xs" />}
                        Sign up
                    </button>
                    <p className="mb-4 text-base font-thin divider divider-neutral">
                        Already have an account?
                    </p>
                    <Link to="/login">
                        <button className="btn btn-outline btn-primary w-full rounded-full font-medium text-base">
                            Log in
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
export default SignUpPage;
