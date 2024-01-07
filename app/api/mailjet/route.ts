import { TemplateParams } from "@/app/types/email";
import axios from "axios";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const body: { template_params: TemplateParams } = await request.json();
  const template_params: TemplateParams = body.template_params;

  const credentials = {
    username: process.env.MAILJET_API_KEY || "",
    password: process.env.MAILJET_SECRET_KEY || "",
  };

  const data = {
    Messages: [
      {
        From: {
          Email: "webtests.brunomariz@gmail.com",
          Name: "No Reply | Website Contact",
        },
        To: [
          {
            Email: template_params.business_email,
            Name: template_params.business_name,
          },
        ],
        Subject: `New Automatic Message`,
        TextPart: "",
        HTMLPart: `<p>Hello ${template_params.business_name},</p><h3>You have a new message from ${template_params.user_name} (${template_params.user_email})</h3><br />${template_params.message}`,
      },
    ],
  };

  const res = await axios
    .post("https://api.mailjet.com/v3.1/send", data, { auth: credentials })
    .then(function (response) {
      // return OK on success;
      console.log({ data: response.data });
      return Response.json({ res: "OK" });
    })
    .catch(function (error) {
      console.log({ error });
      return Response.error();
    });

  return res;
}
