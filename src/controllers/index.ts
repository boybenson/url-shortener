import { NextFunction, Request, Response } from "express";
import { get_original_url, shorten_url } from "../services";

const SHORTEN_URL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    const result = await shorten_url(original_url);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const REDIRECT_TO_ORIGINAL_URL = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { unique_code } = req.params;

    if (!unique_code || typeof unique_code !== "string") {
      return res.status(400).json({ message: "Invalid short URL code." });
    }

    const originalUrl = await get_original_url(unique_code);

    if (!originalUrl) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    return res.redirect(301, originalUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during redirection." });
  }
};

export { SHORTEN_URL, REDIRECT_TO_ORIGINAL_URL };
