import express from "express";

import * as partnersController from "../controllers/partners.controller";

export const partnersRoute = express.Router();

partnersRoute.get("/v1/partners", partnersController.getNearByPartners);
