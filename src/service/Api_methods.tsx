import Api from "./interceptor";

export const getApi = async (url: string, data?: Record<string, string>) => {
  try {
    const result = await Api.get(url, { params: data });
    if (result?.status === 200 || result?.status === 203) {
      return result?.data;
    }
  } catch (e) {
    const err = e as { response?: { data?: unknown } };
    return err?.response?.data;
  }
};

//   update data Api
export const putApi = async (url: string, data: object) => {
  try {
    const result = await Api.put(url, data);
    if (result?.status === 200) {
      return result?.data;
    }
  } catch (e) {
    const err = e as { response?: { data?: unknown } };
    return err?.response?.data;
  }
};

//   update data Api
export const patchApi = async (url: string, data: object) => {
  try {
    const result = await Api.patch(url, data);
    if (result.status === 200) {
      return result.data;
    }
  } catch (e) {
    const err = e as { response?: { data?: unknown } };
    return err?.response?.data;
  }
};

// send data Api
export const postApi = async (url: string, data: object) => {
  try {
    const result = await Api.post(url, data);
    if (result?.status === 200 || result?.status === 201) {
      return result?.data;
    }
  } catch (e) {
    const err = e as { response?: { data?: unknown } };
    return err?.response?.data;
  }
};

//delete Api
export const deleteApi = async (url: string, data: object) => {
  try {
    const result = await Api.delete(url, { params: data });
    if (result?.status === 200) {
      return result?.data;
    }
  } catch (e) {
    const err = e as { response?: { data?: unknown } };
    return err?.response?.data;
  }
};