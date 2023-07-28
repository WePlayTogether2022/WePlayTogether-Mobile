import { Country } from "@/models/resources/Country";
import client from "../client";

const API_PATH = "/countries";

export const FetchCountries = async (
  tokenApi: string,
  page?: number,
  countryFilterNicename?: string
): Promise<{
  params: any;
  data: {
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
    results: Country[];
  };
}> => {
  const pageNumber = page && page > 0 ? page : 1;

  var url = `${API_PATH}/get_countries?pageNumber=${pageNumber}`;
  let body = {
    ResourceFilters: {
      eager: {
        $where: {
          nicename: {
            $like: `%${countryFilterNicename}%`,
          },
        },
      },
    },
  };

  try {
    const response = await client.post(url, body, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
