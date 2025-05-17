import { getNewsById } from "@/api/ServerServices/serverFetchServices.js";
import ReactMarkdown from "react-markdown";

export default async function NewsDetailsPage({ params }) {
  const data = await getNewsById(params.id);
  const { title, imageUrl, publicationDate, content } = data;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "16px" }}>{title}</h1>
      <p style={{ color: "#888", marginBottom: "16px" }}>
        {new Date(publicationDate).toLocaleDateString()}
      </p>
      <img src={imageUrl} alt={title} style={{ width: "100%", borderRadius: "12px", marginBottom: "24px" }} />
      <ReactMarkdown>{content.replaceAll('\\n', '\n')}</ReactMarkdown>
    </div>
  );
}