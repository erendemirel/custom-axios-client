export const returnCustomResponse = (responseObject) => {
    return {
        request: {
            headers: responseObject.config.headers,
            method: responseObject.config.method,
            baseURL: responseObject.config.baseURL,
            endpointWithPathParameters: responseObject.config.url,
            requestBody: responseObject.config.data?._valueLength ? "" : responseObject.config.data ? JSON.parse(responseObject.config.data) : "",
            queryParameters: responseObject.config.params || "",
            formDataLength: responseObject.config.data?._valueLength || 0
        },
        response: {
            status: responseObject.status,
            statusText: responseObject.statusText,
            body: responseObject.data
        }
    }
}