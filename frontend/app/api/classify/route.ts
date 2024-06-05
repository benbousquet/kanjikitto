export async function POST(request: Request) {
  const requestJSON = await request.json();
  const imgDataURL = requestJSON.imgDataURI;

  const classify = await fetch("http://0.0.0.0:3001/classify", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imgDataURL }),
  });

  const results = await classify.json();

  return Response.json({ results }, { status: 200 });
}
