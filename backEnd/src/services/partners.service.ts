import fs from "fs/promises";
import path from "path";
import UnexpectedError from "../core/error/unexpected.error";
import { PartnerResponse } from "../types/partner.response.type";
import { PartnerRequest } from "../types/partner.request.type";
import { Partner } from "../types/partner.type";
import { sphereDistance } from "../common/distance.function";

export async function getNearByPartnersService(params: PartnerRequest): Promise<PartnerResponse[]> {
  try {
    const filePath = path.resolve(__dirname, `../data/${process.env.PARTNERS_FILE_NAME || "partners.json"}`);

    const data = await fs.readFile(filePath, "utf8");

    const partnersData: Partner[] = JSON.parse(data);

    const result: PartnerResponse[] = [];

    for (const { id, organization, offices } of partnersData) {
      const nearbyOffices: string[] = [];
      for (const { coordinates, address } of offices) {
        const latlng = coordinates.split(",");

        const point1 = [Number(latlng[0]), Number(latlng[1])];
        const point2 = [params.lat, params.lng];

        const distance = sphereDistance(point1, point2);

        if (distance <= params.distance) {
          nearbyOffices.push(address);
        }
      }

      if (nearbyOffices.length) {
        result.push({
          id,
          organization,
          offices: nearbyOffices,
        });
      }
    }

    return result;
  } catch (err) {
    throw new UnexpectedError("Something went wrong.");
  }
}
