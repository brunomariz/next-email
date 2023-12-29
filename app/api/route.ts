import axios from "axios";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const body: { template_params: { [index: string]: any } } =
    await request.json();
  const template_params = body.template_params;

  const data = {
    service_id: process.env.EMAIL_JS_SERVICE_ID || "",
    template_id: process.env.EMAIL_JS_TEMPLATE_ID || "",
    user_id: process.env.EMAIL_JS_PUBLIC_KEY || "",
    template_params,
    accessToken: process.env.EMAIL_JS_PRIVATE_KEY || "",
  };

  const res = await axios
    .post("https://api.emailjs.com/api/v1.0/email/send", data, {
      headers: {
        contentType: "application/json",
        "User-Agent": "ContactPage",
      },
    })
    .then(function (response) {
      // return OK on success;
      console.log({ data: response.data });
      return "OK";
    })
    .catch(function (error) {
      console.log({ error });
      return "ERROR";
    });

  return Response.json({ res });
}
