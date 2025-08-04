import { Router } from "express";
import { REDIRECT_TO_ORIGINAL_URL, SHORTEN_URL } from "../controllers";

const router = Router();

router.post("/shorten", SHORTEN_URL);
router.get("/:unique_code", REDIRECT_TO_ORIGINAL_URL);

export default router;
