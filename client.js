import {returnCustomError} from "./return-custom-error"
import {returnCustomResponse} from "./return-custom-response"
import {AxiosError} from "axios"



/**
 * Axios client implemented using axios.create([config]) and axios#request(config)
 *
 * @param {Object} axiosInstance - Axios instance which had been created using axios.create([config]) with custom config
 * @param {object} args - Axios request config. For parameters you can use, see {@link https://axios-http.com/docs/req_config Request Config}
 * @param {boolean} [failOn4XXOr5XX=true] - The Promise will be resolved when false and will be rejected when true. Resolved case will return a custom response
 * @returns {Promise} - Error on reject, custom response/error object on resolve
 * @example
 * const axiosInstance = new CustomInstance({validateStatus: () => true});
 * const response = await axiosClient(axiosInstance, {
        url: `/example/url`,
        method: 'POST',
        //data, params etc.
    });
 * @see {@link https://axios-http.com/docs/handling_errors Handling Axios Errors}
 */
export function axiosClient(axiosInstance, args, failOn4XXOr5XX = true) {
    return new Promise((resolve, reject) => {
        axiosInstance.request(args).then((response) => {
            const customResponseObject = returnCustomResponse(response)
            console.info("Response:\n", JSON.stringify(customResponseObject, null, 2))
            resolve(customResponseObject)
        }).catch(function (error) {
            if (error instanceof AxiosError && error.response) {
                const customErrorObject = returnCustomError(error)
                console.log("Response:\n", JSON.stringify(customErrorObject, null, 2))
                failOn4XXOr5XX ? reject(customErrorObject) : resolve(customErrorObject)
            } else if (error instanceof AxiosError && error.request) {
                console.error("The request was made but no response was received")
                reject(error.request)
            } else if (error instanceof AxiosError) {
                console.error("Something happened in setting up the request that triggered an Error\n", error.message)
                reject(error.message)
            } else {
                console.error(error)
                reject(error.message)
            }
        })
    })
}