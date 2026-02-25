import ImageKit from "@imagekit/nodejs";

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export default imageKitClient;