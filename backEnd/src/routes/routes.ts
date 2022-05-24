import express from "express";
import { partnersRoute } from "./partners.routes";

export const routes = express.Router();

routes.use(partnersRoute);
