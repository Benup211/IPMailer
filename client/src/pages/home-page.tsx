import { useState } from "react";
import Logo from "../assets/ipmailer-favicon-color.png";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    Bold,
    Essentials,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    List,
    MediaEmbed,
    Paragraph,
    Table,
    Undo,
    ImageUpload
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
export const HomePage = () => {
    const [value, setValue] = useState("");

    return (
        <div className="z-10 flex flex-col items-center justify-start w-screen overflow-y-auto">
            <div className="w-full mx-auto p-6">
                <div className="w-full flex items-center justify-between">
                    <Link to="/" className="flex justify-center items-center">
                        <img
                            alt="IPMailer"
                            src={Logo}
                            className="mx-auto h-12 w-12 md:h-12 md:w-12"
                        />
                        <h1 className="my-4 text-xl text-white font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
                            IPMailer
                        </h1>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/user/signin"
                            className="text-white-900 font-semibold hover:border-indigo-500 hover:border-b-2"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                    <h1 className="my-4 text-3xl md:text-5xl text-indigo-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
                        Welcome to IPMailer
                    </h1>
                    <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
                        Your solution for managing email communications through
                        SMTP IP rotation. Enhance deliverability and track
                        engagement effortlessly.
                    </p>
                </div>
            </div>
            <CKEditor
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setValue(data);
                }}
                editor={ClassicEditor}
                config={{
                    toolbar: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "|",
                        "link",
                        "insertTable",
                        "mediaEmbed",
                        "|",
                        "bulletedList",
                        "numberedList",
                        "indent",
                        "outdent",
                    ],
                    plugins: [
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        IndentBlock,
                        Italic,
                        List,
                        MediaEmbed,
                        Paragraph,
                        Table,
                        Undo,
                        ImageUpload
                    ],
                    initialData: "<h1>Hello from CKEditor 5!</h1>",
                }}
            />
            <div>{value}</div>
        </div>
    );
};
