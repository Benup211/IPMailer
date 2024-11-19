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
    ImageToolbar,
    ImageInsertViaUrl,
    LinkImage,
    Link,
    AutoImage,
    ImageTextAlternative,
    ImageStyle,
    ImageResize,
    ImageInline,
    ImageCaption,
    ImageBlock,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
export const RichTextField = ({ setMessage,data }: { data:string,setMessage: Function }) => {
    return (
        <div className="text-black mb-2 max-w-80 md:min-w-[500px]">
            <CKEditor
                onChange={(_event, editor) => {
                    const data = editor.getData();
                    setMessage(data);
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
                        "insertImage",
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
                        Link,
                        ImageBlock,
                        ImageCaption,
                        ImageInline,
                        ImageInsertViaUrl,
                        ImageResize,
                        ImageStyle,
                        ImageTextAlternative,
                        ImageToolbar,
                        AutoImage,
                        LinkImage,
                    ],
                    initialData: data,
                    placeholder: "Compose your mail here...",
                    image: {
                        toolbar: [
                            "toggleImageCaption",
                            "imageTextAlternative",
                            "|",
                            "imageStyle:inline",
                            "imageStyle:wrapText",
                            "imageStyle:breakText",
                            "|",
                            "resizeImage",
                        ],
                    },
                }}
            />
        </div>
    );
};
