export * from "./auth";
export * from "./user";

interface ApiError {
  status: number;
  message: string;
}

export async function sendPostRequest<T>(
  url: string,
  body: object,
  authToken?: string,
): Promise<T> {
  try {
    const headers: Record<string, string> = {};

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message);
    }

    const data: T = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function sendGetRequest<T>(url: string, authToken?: string): Promise<T> {
  try {
    const headers: Record<string, string> = {};

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message);
    }

    const data: T = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
