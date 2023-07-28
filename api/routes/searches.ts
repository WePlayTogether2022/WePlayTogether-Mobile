import { AlgoliaGame } from "@/models/Algolia/AlgoliaGame";
import { AlgoliaUser } from "@/models/Algolia/AlgoliaUser";
import { Search } from "@/models/Resources/Search";
import { AlgoliaGuild } from "@/models/algolia/AlgoliaGuild";
import client from "../client";

const API_PATH = "/searches";

export const FetchSearches = async ({
  queryKey,
}: any): Promise<{
  results: (AlgoliaUser | AlgoliaGame | AlgoliaGuild)[];
  total: number;
  pageSize: number;
  pageNumber: number;
}> => {
  const [_, query, type, tokenApi] = queryKey;

  let url = `${API_PATH}?query=${query}`;
  if (type && type.length > 0) {
    url += `&type=${type}`;
  }

  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchRecentSearches = async ({
  queryKey,
}: any): Promise<Search[]> => {
  const [_, tokenApi] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/recent`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
