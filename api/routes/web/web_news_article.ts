import client from "../../client";

const API_PATH = "/web";
const PATH_NEWS_ARTICLE = "news_article";

export const SaveUserInteraction = async (
  newsArticleId: number,
  tokenAPI: string,
  interactionTypeName: "like" | "view" | "share"
): Promise<{
  message: string;
}> => {
  try {
    const response = await client.post(
      `${API_PATH}/${PATH_NEWS_ARTICLE}/${newsArticleId}/${interactionTypeName}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenAPI}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
