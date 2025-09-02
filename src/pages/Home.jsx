import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true) // ✅ only published posts
        .order("created_at", { ascending: false });

      if (!error) setPosts(data);
      else console.error(error);
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6 space-y-12">
      {/* ✅ About Me Section */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-lg p-6">
        {/* Profile Image (you’ll upload via Supabase Storage or any image link) */}
        <img
          src="https://scontent.fbir7-1.fna.fbcdn.net/v/t39.30808-6/536274863_1372443164428496_7916595593628665255_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHEOf_Pe7UxOPeDodflgktxMcJPk4hV3gwxwk-TiFXeDLM6CUWrSvTEAtfauDUOyH2h4dRtASoKrmtF0m6GoeLd&_nc_ohc=nGfAYzsE0AkQ7kNvwHnWc5M&_nc_oc=AdktS57XULJmgluBL8St5Q80JX1_7KwdWMBfKlMPASGOxBvjMhkIcd5mruRBVeJcM00XJQBwkTRhCXBmD0Mh18X5&_nc_zt=23&_nc_ht=scontent.fbir7-1.fna&_nc_gid=_0w5Gtj0v3leVo1MgxOWNA&oh=00_AfV3KDxVpkQnilao2EvwA4rY7QCCu-kCQzaGASqC2Oq8WQ&oe=68BC6976"
          alt="Prakash Koirala"
          className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">Prakash Koirala</h1>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            Hi, I’m <span className="font-semibold">Prakash</span>, an{" "}
            <span className="font-semibold">Animal Science student</span> and a{" "}
            <span className="font-semibold">veterinarian in training</span>.  
            I am passionate about animal health, welfare, and sharing knowledge 
            about veterinary science. Through this blog, I’ll share insights, 
            research, and stories from the field.
          </p>
        </div>
      </section>

      {/* ✅ Blog Posts */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {p.cover_url && (
                  <img
                    src={p.cover_url}
                    alt={p.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {p.content.replace(/<[^>]+>/g, "")} {/* ✅ remove HTML tags */}
                  </p>
                  <Link
                    to={`/post/${p.id}`}
                    className="text-blue-600 mt-4 inline-block hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No published posts yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
