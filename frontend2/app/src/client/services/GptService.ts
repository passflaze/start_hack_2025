/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GptService {
    /**
     * Send Gpt
     * @returns any Successful Response
     * @throws ApiError
     */
    public static sendGpt({
        text,
    }: {
        text: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/gpt/send_text',
            query: {
                'text': text,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
