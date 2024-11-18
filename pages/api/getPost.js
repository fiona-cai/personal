// pages/api/getPost.js
import { getPostBySlug } from "../../utils/api";

export default function handler(req, res) {
  const { slug } = req.query;
  const post = getPostBySlug(slug, [
    "title",
    "image",
    "author",
    "date",
    "tagline",
    "content",
    "type",
  ]);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
}
