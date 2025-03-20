/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PortfolioInfo } from '../models/PortfolioInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HistoricalService {
    /**
     * Portfolio Builder
     * @returns any Successful Response
     * @throws ApiError
     */
    public static portfolioBuilder({
        requestBody,
    }: {
        requestBody: PortfolioInfo,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/portfolio/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
