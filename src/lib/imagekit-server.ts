import ImageKit from "imagekit";

function requireEnv() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error("ImageKit: set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT");
  }
  return { publicKey, privateKey, urlEndpoint };
}

let inst: ImageKit | null = null;

export function getImageKit() {
  if (inst) return inst;
  const c = requireEnv();
  inst = new ImageKit({ publicKey: c.publicKey, privateKey: c.privateKey, urlEndpoint: c.urlEndpoint });
  return inst;
}

export function getImageKitConfig() {
  return requireEnv();
}
