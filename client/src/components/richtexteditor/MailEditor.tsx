import { MDXEditor } from "@mdxeditor/editor";
import { headingsPlugin,listsPlugin,quotePlugin,thematicBreakPlugin,markdownShortcutPlugin } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
export const MailEditor = () => {
    return (
        <MDXEditor
            markdown="# Hello world"
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
            ]}
            className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:min-w-96 min-w-64 bg-slate-50 mb-2"
        />
    );
};
