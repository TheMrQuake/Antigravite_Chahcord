"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/utils/supabase/client";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "serverImage" | "messageFile";
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const supabase = createClient();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        try {
            setIsUploading(true);
            const file = acceptedFiles[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${endpoint}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('uploads')
                .upload(filePath, file);

            if (uploadError) {
                console.error(uploadError);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('uploads')
                .getPublicUrl(filePath);

            onChange(publicUrl);
        } catch (error) {
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }, [onChange, endpoint, supabase]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        maxFiles: 1
    });

    if (value && endpoint === "serverImage") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <div {...getRootProps()} className="border-2 border-dashed border-zinc-500 rounded-md p-4 flex flex-col items-center justify-center gap-4 hover:bg-zinc-500/10 transition cursor-pointer">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
                <FileIcon className="h-10 w-10 text-zinc-500" />
                <span className="text-sm text-zinc-500">{isUploading ? "Загрузка..." : "Загрузить изображение"}</span>
            </div>
        </div>
    );
}
