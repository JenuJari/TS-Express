import { Request, Response, Router } from "express";

import { ErrorResponse } from "./../utils/helpers";

const router = Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    res.send(req.app.get("user"));
  } catch (error) {
    ErrorResponse(res, 503, error.message);
  }
});

export default router;
