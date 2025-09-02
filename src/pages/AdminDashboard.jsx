import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover_url: "",
    published: false,
  });

  // Fetch posts
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle text inputs & checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("covers")
        .upload(fileName, file);

      if (error) {
        console.error("Upload error:", error);
        return;
      }

      // Get public URL
      const { data } = supabase.storage.from("covers").getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, cover_url: data.publicUrl }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Handle ReactQuill content
  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  // Create or Update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPost) {
      const { error } = await supabase
        .from("posts")
        .update(formData)
        .eq("id", editingPost.id);
      if (!error) {
        setEditingPost(null);
        setFormData({ title: "", content: "", cover_url: "", published: false });
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from("posts").insert([formData]);
      if (!error) {
        setFormData({ title: "", content: "", cover_url: "", published: false });
        fetchPosts();
      }
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  };

  // Edit post
  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData(post);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow-md mb-6 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* ✅ Rich Text Editor */}
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
          className="bg-white"
        />

        {/* Upload OR External URL */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="w-full"
          />
          <p className="text-xs text-gray-500">or paste an external URL below</p>
          <input
            type="text"
            name="cover_url"
            placeholder="https://example.com/image.jpg"
            value={formData.cover_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {formData.cover_url && (
            <img
              src={formData.cover_url}
              alt="Preview"
              className="h-32 w-full object-cover rounded"
            />
          )}
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          <span>Published</span>
        </label>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingPost ? "Update Post" : "Add Post"}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={() => {
              setEditingPost(null);
              setFormData({
                title: "",
                content: "",
                cover_url: "",
                published: false,
              });
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Posts list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col justify-between"
          >
            {post.cover_url && (
              <img
                src={post.cover_url}
                alt={post.title}
                className="h-40 w-full object-cover rounded"
              />
            )}
            <h2 className="text-lg font-bold mt-2">{post.title}</h2>

            {/* ✅ Show HTML instead of plain text */}
            <div
              className="text-sm text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <span
              className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                post.published
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(post)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
