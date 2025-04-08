import {json, type MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return <>{data.message}</>;
}

export async function loader() {
  try {
    const response = await fetch("http://localhost:8080");
    console.log('response', response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log("await response.json()", await response.json());
    const {message} = await response.json();
    return json({message});
  } catch (error) {
    console.error(error);
    return json({message: ""});
  }
}

export const meta: MetaFunction = () => {
  return [
    {title: "New Remix App"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};
