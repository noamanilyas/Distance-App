import axios, { AxiosResponse } from 'axios';
import { ApiDataType } from './types/IPartner.type';

const baseUrl = 'http://localhost:1337';

export const getPartners = async (
  distance: number,
  lat: number,
  lng: number,
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    console.log(
      `Here: ${baseUrl}/v1/partners?distance=${distance}&lat=${lat}&lng=${lng}`,
    );
    const result: AxiosResponse<ApiDataType> = await axios.get(
      `${baseUrl}/v1/partners?distance=${distance}&lat=${lat}&lng=${lng}`,
    );
    console.log(`Result: ${result}`);
    // if (result) {
    return result;
    // } else {
    //   throw new Error('Unexpected API Error, Invalid response');
    // }
  } catch (error) {
    // console.error(error);
    throw new Error('Unexpected API Error');
  }
};
