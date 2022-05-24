import { Request, Response } from "express";
import ValidationError from "../core/error/validation.error";
import { errorResponse, successResponse } from "../core/handlers/api-response.handler";
import { partnersRequestSchema } from "../schemas/partners.request.schema";
import { getNearByPartnersService } from "../services/partners.service";
import { PartnerRequest } from "../types/partner.request.type";

export async function getNearByPartners(req: Request, res: Response): Promise<void> {
  try {
    const reqData: PartnerRequest = {
      distance: Number(req.query.distance),
      lat: Number(req.query.lat),
      lng: Number(req.query.lng),
    };

    const { error } = partnersRequestSchema.validate(reqData);
    if (error) {
      throw new ValidationError("Invalid request, " + error.message);
    }

    const partners = await getNearByPartnersService(reqData);

    successResponse(res, partners);
  } catch (err) {
    errorResponse(res, err);
  }
}
