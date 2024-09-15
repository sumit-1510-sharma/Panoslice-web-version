import { createClient } from "contentful";

const client = createClient({
  space: "opsavvrzf7pk", // replace with your actual space ID
  accessToken: "f9CJYsB4_CUaglHQrKEcxOvT7xVHDa9EPBzzRCIzO6E", // replace with your actual access token
});

export default client;
