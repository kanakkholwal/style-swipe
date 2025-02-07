// // import { betterFetch } from '@better-fetch/fetch';

// const imageUrl = 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2024/SEPTEMBER/7/VouyYW4N_3ad45252456a4958acd9ee91ab64942d.jpg';

// async function fetchImageAsBase64(imageUrl: string): Promise<string> {
//   const response = await fetch(imageUrl);
//   const buffer = await response.arrayBuffer();
//   return Buffer.from(buffer).toString("base64");
// }

// async function generateMultimodalEmbeddings(imageUrl: string): Promise<number[] | null> {
//   try {

//     const accessToken = process.env.GOOOGLE_AUTH_TOKEN;


//     // Fetch and encode the image as Base64
//     const imageBase64 = await fetchImageAsBase64(imageUrl);


//    // Define API request payload (matching reference docs)
//    const payload = {
//     instances: [
//       {
//         image: {
//           bytesBase64Encoded: imageBase64
//         }
//       }
//     ],
//     parameters: {
//       modality: "IMAGE"
//     }
//   };

//     // Make the request to Vertex AI API
//     const vertexResponse = await fetch(
//       `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT}/locations/us-central1/publishers/google/models/multimodalembedding@001:predict`,
//       {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${accessToken}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(payload)
//       }
//     );

//     const data = await vertexResponse.json();

//     console.dir(data, { depth: null })
//     // Extract and return embeddings
//     return data.predictions?.[0]?.embeddings?.values || null;
//   } catch (error) {
//     console.error('Error generating embedding:', error);
//     return null;
//   }
// }

// // Usage example
// generateMultimodalEmbeddings(imageUrl).then((embedding) => {
//   if (embedding) {
//     console.log('Generated embedding:', embedding);
//   } else {
//     console.log('Failed to generate embedding.');
//   }
// });
