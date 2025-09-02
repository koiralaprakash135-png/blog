import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState(""); // separate state for HTML

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setPost(data);
        setHtmlContent(data.content || ""); // ✅ store HTML in its own state
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!post) return <div className="p-6">Post not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {post.cover_url && (
        <img
          src={post.cover_url}
          alt={post.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* ✅ Render only after htmlContent is ready */}
      {htmlContent && (
        <div
          className="prose lg:prose-xl max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
}
