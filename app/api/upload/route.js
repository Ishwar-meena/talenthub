import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { fileTypeFromBuffer } from "file-type";


// this validate a file is valid type or not for images and pdf
const fileValidate = async (buffer) => {
    const fileTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf'
    ];

    const type = await fileTypeFromBuffer(buffer);
    if (!type) return false;
    if (!fileTypes.includes(type.mime)) return false;
    return true;
}


export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get("file");

        if (!file) {
            return NextResponse.json(
                {
                    error: "file not received",
                    status: 400,
                }
            );
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        if (!(await fileValidate(buffer))) {
            return NextResponse.json(
                {
                    error: "please upload a valid file type",
                    status: 400,
                }
            )
        }


        // Configure Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        // upload to cloudinary 
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image',
                    folder: 'talenthub'
                },
                (err, result) => {
                    if (err) reject(err)
                    else resolve(result);
                }
            ).end(buffer);
        });


        if (!result) {
            return NextResponse.json(
                { error: "failed to upload image on server", status: 500 }
            );
        }

        // send uploaded file url 
        return NextResponse.json(
            {
                url: result.secure_url,
                message: "file uploaded successfully",
                status: 200
            }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "failed to upload file on server", status: 500 }
        );
    }
}