import { auth } from "@/auth";
import { R2_CLIENT } from "@/cd_r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const searchParams = req.nextUrl.searchParams;
    const filename = searchParams.get("filename");
    if (!filename)
      return Response.json({ error: "Filename is required" }, { status: 400 });

    console.log("filename", filename);

    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
    const objectKey = `uploads/${Date.now()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      ContentType: "image/*",
    });


    const uploadUrl = await getSignedUrl(R2_CLIENT, command, { expiresIn: 60 });

    return Response.json(
      {
        uploadUrl,
        imageUrl: `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${objectKey}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    Response.json(
      {
        error: "Something went wrong! Try again",
      },
      { status: 500 }
    );
  }
}
