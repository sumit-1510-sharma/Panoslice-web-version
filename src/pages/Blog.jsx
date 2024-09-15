import React, { useState, useEffect } from "react";
import client from "../contentful/contentful"; // Import the Contentful client
import { Link } from "react-router-dom";
// import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: "blogPost", // Replace with your Contentful blog post content type ID
        });
        setPosts(response.items);
        console.log(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  return (
    <div className="mx-8 md:mx-24 my-24 text-white">
      <h1 className="flex justify-center text-2xl md:text-3xl mb-8">BLOGS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10">
        {posts.length ? (
          posts.map((post) => {
            const { title, coverImage, hook, slug, author, publishDate } =
              post.fields;
            return (
              <div key={post.sys.id} className="blog-post">
                {/* Title */}
                <h2>{title}</h2>

                {/* Cover Image */}
                {coverImage && (
                  <img
                    src={coverImage.fields.file.url}
                    alt={title}
                    className="cover-image"
                  />
                )}

                {/* Excerpt */}
                <p>{hook}</p>

                {/* Author & Publish Date */}
                <div className="meta-info">
                  <p>By: Dipin Chopra</p>
                  <p>Published on: {new Date(publishDate).toDateString()}</p>
                </div>

                {/* Read more link */}
                <Link to={`/blog/${slug}`}>Read more...</Link>
              </div>
            );
          })
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
