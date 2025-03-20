/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StatsService {
    /**
     * Get Sharpee Ratio
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getSharpeeRatio(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/sharpee_ratio/',
        });
    }
    /**
     * Get Sortino Ratio
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getSortinoRatio(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/sortino_ratio/',
        });
    }
    /**
     * Get Calmar Ratio
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getCalmarRatio(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/calmar_ratio/',
        });
    }
    /**
     * Get Alpha
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAlpha(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/alpha/',
        });
    }
    /**
     * Get Beta
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getBeta(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/beta/',
        });
    }
    /**
     * Get Treynor Ratio
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTreynorRatio(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/treynor_ratio/',
        });
    }
    /**
     * Get Omega Ratio
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getOmegaRatio(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/omega_ratio/',
        });
    }
    /**
     * Get Information Ratio
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getInformationRatio(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/information_ratio/',
        });
    }
    /**
     * Get Maximum Drawdown
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getMaximumDrawdown(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/maximum_drawdown',
        });
    }
    /**
     * Get Total Return
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTotalReturn(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/total_return/',
        });
    }
    /**
     * Get Value At Risk
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getValueAtRisk(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats/value_at_risk/',
        });
    }
}
