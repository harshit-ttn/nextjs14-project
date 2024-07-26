import Blog from "../../models/Blog";
import { authenticateToken } from "../../lib/auth";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const blogs = await Blog.find({});
        res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      authenticateToken(req, res, async () => {
        try {
          const blog = await Blog.create(req.body);
          res.status(201).json({ success: true, data: blog });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      });
      break;
    case "DELETE":
      authenticateToken(req, res, async () => {
        try {
          const { id } = req.query;
          const deletedBlog = await Blog.deleteOne({ _id: id });
          if (!deletedBlog) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
