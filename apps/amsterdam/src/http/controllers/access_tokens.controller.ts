import type { Request, Response } from "express";

interface ResponseBody {
  verified: boolean;
}

export function verifyAccessTokenRequestHandler(
  _request: Request,
  response: Response<ResponseBody>
) {
  // just returns a response with the "verified: true" because the middleware already verified the request
  // by the time it hits this handler.
  response.json({ verified: true });
}
