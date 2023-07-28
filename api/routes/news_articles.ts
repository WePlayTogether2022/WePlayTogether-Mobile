import { NewsArticle } from "@/models/project/NewsArticle";
import { Game } from "@/models/resources/Game";
import client from "../client";

const API_PATH = "/news_articles";

export const FetchHomeNewsArticles = async (
  tokenApi: string
): Promise<{
  params: any;
  data: NewsArticle[];
}> => {
  try {
    const response = await client.get(`${API_PATH}/home`, {
      headers: {
        Authorization: `Bearer ${tokenApi}`,
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
};
