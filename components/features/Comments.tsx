import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext";

interface Comment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  postSlug: string;
}

export const Comments: React.FC<CommentsProps> = ({ postSlug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { theme } = useTheme();

  const fetchComments = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get(`/api/comments?postSlug=${postSlug}`);
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  }, [postSlug]);

  useEffect((): void => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post("/api/comments", { postSlug, name, content });
      setName("");
      setContent("");
      fetchComments();
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <div className="mt-8">
      <h3
        className={`text-2xl font-semibold mb-4 ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Comments
      </h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
          placeholder="Your name"
          className={`w-full p-2 mb-2 border rounded ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          required
        />
        <textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setContent(e.target.value)}
          placeholder="Your comment"
          className={`w-full p-2 mb-2 border rounded ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Submit Comment
        </button>
      </form>
      <div>
        {comments.map((comment: Comment): JSX.Element => (
          <div
            key={comment._id}
            className={`mb-4 p-4 rounded ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p
              className={`font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {comment.name}
            </p>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              {comment.content}
            </p>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
