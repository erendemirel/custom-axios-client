export const returnCustomError = (errorObject) => {
    return {
        errorMessage: errorObject?.message,
        request: {
            headers: errorObject.config.headers,
            method: errorObject.config.method,
            baseURL: errorObject.config.baseURL,
            endpointWithPathParameters: errorObject.config.url,
            requestBody: errorObject.config.data?._valueLength ? "" : errorObject.config.data ? JSON.parse(errorObject.config.data) : "",
            queryParameters: errorObject.config.params || "",
            formDataLength: errorObject.config.data?._valueLength || 0
        },
        response: {
            status: errorObject?.response.status,
            statusText: errorObject?.response.statusText,
            body: errorObject?.response.data
        }
    }
}