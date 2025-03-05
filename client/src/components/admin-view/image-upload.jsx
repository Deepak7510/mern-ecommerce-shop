import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const ProductImageUpload = ({ file, setFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState }) => {
    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }
    function handleDrop(event) {
        event.preventDefault();
        const dropedFile = event.dataTransfer.files?.[0];
        if (dropedFile) {
            setFile(dropedFile)
        }
    }

    function handleRemoveImage() {
        setFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const uploadImageToCloudinary = async () => {
        setImageLoadingState(true)
        let data = new FormData();
        data.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/api/admin/products/upload-image", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response?.data?.success) {
                setUploadedImageUrl(response.data.result.url);
                setImageLoadingState(false)
            }

        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    useEffect(() => {
        if (file !== null) {
            uploadImageToCloudinary()
        }

    }, [file])

    return (
        <div className='w-full max-w-md mx-auto mt-4'>
            <Label className='text-lg font-semibold mb-2 block'>Upload Images</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
                <Input ref={inputRef} id="image-upload" type='file' className='hidden' onChange={(e) => handleImageFileChange(e)} />
                {
                    !file ? <Label htmlFor={'image-upload'} className='flex flex-col items-center justify-center cursor-pointer h-32'>
                        <UploadCloudIcon className='w-10 h-10 text-slate-300 mb-2' />
                        <span>Drag and drop or click to upload image</span>
                    </Label> : <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <FileIcon className='w-8 text-blue-700 mr-2 h-8' />
                        </div>
                        <p className='text-sm font-medium'>{file.name}</p>
                        <Button variant="ghost" size="icon" className='' onClick={handleRemoveImage}>
                            <XIcon className='w-4 h-4' />
                            <span className='sr-only'>Remove File</span>
                        </Button>
                    </div>
                }
            </div>

        </div>
    )
}

export default ProductImageUpload
