import validator from "validator";
import { nanoid } from "nanoid";

import UrlModel from "../database/models/url.model";

const MAX_ATTEMPTS = 5;

export const shorten_url = async (original_url: string) => {
  if (
    !validator.isURL(original_url, {
      require_protocol: true,
      require_valid_protocol: true,
      protocols: ["http", "https"],
    })
  ) {
    throw new Error("Invalid URL. Must include http:// or https://");
  }

  const existing = await UrlModel.findOne({ original_url });
  if (existing) {
    return {
      original_url,
      unique_code: existing.unique_code,
      short_url: `http://localhost:8080/api/v1/urls/${existing?.unique_code}`,
    };
  }

  let code = "";
  let attempt = 0;

  while (attempt < MAX_ATTEMPTS) {
    code = nanoid(6);
    const exists = await UrlModel.findOne({ unique_code: code });
    if (!exists) break;
    attempt++;
  }

  if (attempt === MAX_ATTEMPTS) {
    throw new Error("Could not generate a unique short code. Try again.");
  }

  const new_url = await UrlModel.create({
    unique_code: code,
    original_url,
  });

  return {
    original_url,
    unique_code: new_url?.unique_code,
    short_url: `http://localhost:8080/api/v1/urls/${new_url?.unique_code}`,
  };
};
export const get_original_url = async (unique_code: string) => {
  const record = await UrlModel.findOne({ unique_code });
  return record?.original_url || null;
};
