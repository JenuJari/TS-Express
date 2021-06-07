import { Request, Response, Router } from "express";
import { ErrorResponse } from "./../utils/helpers";
import * as authRepo from "./../repo/auth";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { token, user } = await authRepo.registerUser(req.body);
    res.send({ token, user });
  } catch (error) {
    ErrorResponse(res, 503, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { token, user } = await authRepo.login(req.body);
    res.send({ token, user });
  } catch (error) {
    ErrorResponse(res, 503, error.message);
  }
});

export default router;
