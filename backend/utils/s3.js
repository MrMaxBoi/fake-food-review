// backend/utils/s3.js
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: "ap-southeast-5" }); // Jakarta region
const BUCKET_NAME = "fake-food-detector-images";

export async function uploadImage(key, buffer, contentType) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    return `https://${BUCKET_NAME}.s3.ap-southeast-3.amazonaws.com/${key}`;
  } catch (error) {
    console.error("S3 upload failed:", error);
    throw error;
  }
}

export async function getSignedImageUrl(key) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.error("S3 signed URL failed:", error);
    throw error;
  }
}