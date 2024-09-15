import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import client from "../contentful/contentful"; // Adjust path if needed
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const BlogPost = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await client.getEntries({
          content_type: "blogPost", // Replace with your Contentful blog post content type ID
          "fields.slug": slug, // Filter by slug
        });
        setPost(response.items[0]);
        console.log(post); // Assuming slug is unique, get the first matching item
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">Loading blog post...</div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10 text-lg">Blog post not found.</div>
    );
  }

  const { title, coverImage, content, author, publishDate } = post.fields;

  return (
    <div className="max-w-4xl mx-4 md:mx-20 lg:mx-32 px-4 py-8 my-20 text-white">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {coverImage && (
        <img
          src={coverImage.fields.file.url}
          alt={title}
          className="w-full h-auto mb-6 rounded-lg shadow-lg"
        />
      )}
      <div className="text-gray-700 mb-6">
        <p className="text-sm">By: {author?.fields?.name || "Unknown"}</p>
        <p className="text-sm">
          Published on: {new Date(publishDate).toDateString()}
        </p>
      </div>
      <div className="prose prose-lg prose-invert max-w-full text-white">
        {/* Assuming body is rich text */}
        {content && documentToReactComponents(content)}
        {/* Adjust based on how you store the body */}
      </div>
    </div>
  );
};

export default BlogPost;
