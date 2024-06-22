export async function POST(request: Request) {
  const requestJSON = await request.json();
  const imgDataURL = requestJSON.imgDataURI;

  const MLApiURL = process.env.DEV === "false" ? process.env.ML_API_URL : "http://0.0.0.0:8080/classify"

  const classify = await fetch(MLApiURL!, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imgDataURL, key: process.env.SECRET_KEY }),
  });

  const results = await classify.json();

  return Response.json({ results }, { status: 200 });
}
