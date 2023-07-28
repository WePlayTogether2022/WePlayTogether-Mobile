import { AlgoliaGame } from "../@/models/algolia/AlgoliaGame";
import { AlgoliaUser } from "../@/models/algolia/AlgoliaUser";
import { AlgoliaGuild } from "../@/models/algolia/AlgoliaGuild";
import client from "../../client";
import { Search } from "../@/models/resources/Search";

const API_PATH = "/web/search";

export const FetchSearchesByQuery = async ({
  queryKey,
}: any): Promise<{
  params: any;
  data: {
    results: (AlgoliaUser | AlgoliaGame | AlgoliaGuild)[];
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
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
}: any): Promise<{
  params: any;
  data: {
    results: Search[];
    total: number;
    pageSize: number;
    pageNumber: number;
    lastPage: number;
  };
}> => {
  const [_, tokenApi] = queryKey;

  try {
    const response = await client.get(`${API_PATH}/recent_searches`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
