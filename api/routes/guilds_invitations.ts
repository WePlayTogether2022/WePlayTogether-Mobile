import client from "../client";
const API_PATH = "/guilds_invitations";

export const DeleteGuildInvitation = async (
  tokenApi: string,
  id: number
): Promise<{
  message: string;
}> => {
  try {
    client.defaults.headers.common["Authorization"] = `Bearer ${tokenApi}`;
    const response = await client.delete(`${API_PATH}/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
