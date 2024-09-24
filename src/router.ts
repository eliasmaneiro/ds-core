import { Request, Response, Router } from "express";
import VariableController from "./controllers/variable";
import FileController from "./controllers/file";
import PageController from "./controllers/page";
import ComponentController from "./controllers/components";
const router = Router();

router.get("/", (res: Response): void => {
  res.send("DS is on");
});

router.get("/api", (res: Response): void => {
  res.send("DS endpoint ready");
});

router.post("/sync", (res: Response): Response => {
  return res.status(200).json({
    msg: "Success sync",
  });
});

// variable endpoints

router.post("/variable", (req: Request, res: Response): void => {
  VariableController.save(req, res);
});

// file endpoints

router.post("/file", (req: Request, res: Response): void => {
  FileController.save(req, res);
});

// page endpoints

router.post("/page", (req: Request, res: Response): void => {
  PageController.saveOne(req, res);
});

// component endpoints

router.post("/component", (req: Request, res: Response): void => {
  ComponentController.save(req, res);
});

export default router;
