/* tslint:disable */
/* eslint-disable */
/**
 * Trello Spring Boot REST API
 * Trello swagger api
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface Card
 */
export interface Card {
    /**
     * 
     * @type {string}
     * @memberof Card
     */
    'cardDesc'?: string;
    /**
     * 
     * @type {number}
     * @memberof Card
     */
    'cardId'?: number;
    /**
     * 
     * @type {number}
     * @memberof Card
     */
    'cardOrd'?: number;
    /**
     * 
     * @type {string}
     * @memberof Card
     */
    'cardTitle'?: string;
    /**
     * 
     * @type {string}
     * @memberof Card
     */
    'modDTime'?: string;
    /**
     * 
     * @type {string}
     * @memberof Card
     */
    'modId'?: string;
    /**
     * 
     * @type {string}
     * @memberof Card
     */
    'regDTime'?: string;
    /**
     * 
     * @type {string}
     * @memberof Card
     */
    'regId'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Card
     */
    'useYn'?: boolean;
    /**
     * 
     * @type {WorkList}
     * @memberof Card
     */
    'workList'?: WorkList;
}
/**
 * 
 * @export
 * @interface HelloWorldBean
 */
export interface HelloWorldBean {
    /**
     * 
     * @type {string}
     * @memberof HelloWorldBean
     */
    'message'?: string;
}
/**
 * 
 * @export
 * @interface ResponseEntity
 */
export interface ResponseEntity {
    /**
     * 
     * @type {object}
     * @memberof ResponseEntity
     */
    'body'?: object;
    /**
     * 
     * @type {string}
     * @memberof ResponseEntity
     */
    'statusCode'?: ResponseEntityStatusCodeEnum;
    /**
     * 
     * @type {number}
     * @memberof ResponseEntity
     */
    'statusCodeValue'?: number;
}

export const ResponseEntityStatusCodeEnum = {
    _100Continue: '100 CONTINUE',
    _101SwitchingProtocols: '101 SWITCHING_PROTOCOLS',
    _102Processing: '102 PROCESSING',
    _103Checkpoint: '103 CHECKPOINT',
    _200Ok: '200 OK',
    _201Created: '201 CREATED',
    _202Accepted: '202 ACCEPTED',
    _203NonAuthoritativeInformation: '203 NON_AUTHORITATIVE_INFORMATION',
    _204NoContent: '204 NO_CONTENT',
    _205ResetContent: '205 RESET_CONTENT',
    _206PartialContent: '206 PARTIAL_CONTENT',
    _207MultiStatus: '207 MULTI_STATUS',
    _208AlreadyReported: '208 ALREADY_REPORTED',
    _226ImUsed: '226 IM_USED',
    _300MultipleChoices: '300 MULTIPLE_CHOICES',
    _301MovedPermanently: '301 MOVED_PERMANENTLY',
    _302Found: '302 FOUND',
    _302MovedTemporarily: '302 MOVED_TEMPORARILY',
    _303SeeOther: '303 SEE_OTHER',
    _304NotModified: '304 NOT_MODIFIED',
    _305UseProxy: '305 USE_PROXY',
    _307TemporaryRedirect: '307 TEMPORARY_REDIRECT',
    _308PermanentRedirect: '308 PERMANENT_REDIRECT',
    _400BadRequest: '400 BAD_REQUEST',
    _401Unauthorized: '401 UNAUTHORIZED',
    _402PaymentRequired: '402 PAYMENT_REQUIRED',
    _403Forbidden: '403 FORBIDDEN',
    _404NotFound: '404 NOT_FOUND',
    _405MethodNotAllowed: '405 METHOD_NOT_ALLOWED',
    _406NotAcceptable: '406 NOT_ACCEPTABLE',
    _407ProxyAuthenticationRequired: '407 PROXY_AUTHENTICATION_REQUIRED',
    _408RequestTimeout: '408 REQUEST_TIMEOUT',
    _409Conflict: '409 CONFLICT',
    _410Gone: '410 GONE',
    _411LengthRequired: '411 LENGTH_REQUIRED',
    _412PreconditionFailed: '412 PRECONDITION_FAILED',
    _413PayloadTooLarge: '413 PAYLOAD_TOO_LARGE',
    _413RequestEntityTooLarge: '413 REQUEST_ENTITY_TOO_LARGE',
    _414UriTooLong: '414 URI_TOO_LONG',
    _414RequestUriTooLong: '414 REQUEST_URI_TOO_LONG',
    _415UnsupportedMediaType: '415 UNSUPPORTED_MEDIA_TYPE',
    _416RequestedRangeNotSatisfiable: '416 REQUESTED_RANGE_NOT_SATISFIABLE',
    _417ExpectationFailed: '417 EXPECTATION_FAILED',
    _418IAmATeapot: '418 I_AM_A_TEAPOT',
    _419InsufficientSpaceOnResource: '419 INSUFFICIENT_SPACE_ON_RESOURCE',
    _420MethodFailure: '420 METHOD_FAILURE',
    _421DestinationLocked: '421 DESTINATION_LOCKED',
    _422UnprocessableEntity: '422 UNPROCESSABLE_ENTITY',
    _423Locked: '423 LOCKED',
    _424FailedDependency: '424 FAILED_DEPENDENCY',
    _425TooEarly: '425 TOO_EARLY',
    _426UpgradeRequired: '426 UPGRADE_REQUIRED',
    _428PreconditionRequired: '428 PRECONDITION_REQUIRED',
    _429TooManyRequests: '429 TOO_MANY_REQUESTS',
    _431RequestHeaderFieldsTooLarge: '431 REQUEST_HEADER_FIELDS_TOO_LARGE',
    _451UnavailableForLegalReasons: '451 UNAVAILABLE_FOR_LEGAL_REASONS',
    _500InternalServerError: '500 INTERNAL_SERVER_ERROR',
    _501NotImplemented: '501 NOT_IMPLEMENTED',
    _502BadGateway: '502 BAD_GATEWAY',
    _503ServiceUnavailable: '503 SERVICE_UNAVAILABLE',
    _504GatewayTimeout: '504 GATEWAY_TIMEOUT',
    _505HttpVersionNotSupported: '505 HTTP_VERSION_NOT_SUPPORTED',
    _506VariantAlsoNegotiates: '506 VARIANT_ALSO_NEGOTIATES',
    _507InsufficientStorage: '507 INSUFFICIENT_STORAGE',
    _508LoopDetected: '508 LOOP_DETECTED',
    _509BandwidthLimitExceeded: '509 BANDWIDTH_LIMIT_EXCEEDED',
    _510NotExtended: '510 NOT_EXTENDED',
    _511NetworkAuthenticationRequired: '511 NETWORK_AUTHENTICATION_REQUIRED'
} as const;

export type ResponseEntityStatusCodeEnum = typeof ResponseEntityStatusCodeEnum[keyof typeof ResponseEntityStatusCodeEnum];

/**
 * 
 * @export
 * @interface WorkList
 */
export interface WorkList {
    /**
     * 
     * @type {Array<Card>}
     * @memberof WorkList
     */
    'card'?: Array<Card>;
    /**
     * 
     * @type {string}
     * @memberof WorkList
     */
    'modDtime'?: string;
    /**
     * 
     * @type {string}
     * @memberof WorkList
     */
    'modId'?: string;
    /**
     * 
     * @type {string}
     * @memberof WorkList
     */
    'regDtime'?: string;
    /**
     * 
     * @type {string}
     * @memberof WorkList
     */
    'regId'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof WorkList
     */
    'useYn'?: boolean;
    /**
     * 
     * @type {number}
     * @memberof WorkList
     */
    'workListId'?: number;
    /**
     * 
     * @type {number}
     * @memberof WorkList
     */
    'workListOrd'?: number;
    /**
     * 
     * @type {string}
     * @memberof WorkList
     */
    'workListTitle'?: string;
}

/**
 * CardControllerApi - axios parameter creator
 * @export
 */
export const CardControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary saveWorkList
         * @param {number} workListId workListId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saveWorkListUsingPOST: async (workListId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'workListId' is not null or undefined
            assertParamExists('saveWorkListUsingPOST', 'workListId', workListId)
            const localVarPath = `/card`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(workListId, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CardControllerApi - functional programming interface
 * @export
 */
export const CardControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CardControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary saveWorkList
         * @param {number} workListId workListId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saveWorkListUsingPOST(workListId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saveWorkListUsingPOST(workListId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CardControllerApi - factory interface
 * @export
 */
export const CardControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CardControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary saveWorkList
         * @param {number} workListId workListId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saveWorkListUsingPOST(workListId: number, options?: any): AxiosPromise<ResponseEntity> {
            return localVarFp.saveWorkListUsingPOST(workListId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CardControllerApi - object-oriented interface
 * @export
 * @class CardControllerApi
 * @extends {BaseAPI}
 */
export class CardControllerApi extends BaseAPI {
    /**
     * 
     * @summary saveWorkList
     * @param {number} workListId workListId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CardControllerApi
     */
    public saveWorkListUsingPOST(workListId: number, options?: AxiosRequestConfig) {
        return CardControllerApiFp(this.configuration).saveWorkListUsingPOST(workListId, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * HelloControllerApi - axios parameter creator
 * @export
 */
export const HelloControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary helloWorldBean
         * @param {string} name name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        helloWorldBeanUsingGET: async (name: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            assertParamExists('helloWorldBeanUsingGET', 'name', name)
            const localVarPath = `/helloBean/path-variable/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary helloWorldBean
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        helloWorldBeanUsingGET1: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/helloBean`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary helloWorld
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        helloWorldUsingGET: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/hello`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HelloControllerApi - functional programming interface
 * @export
 */
export const HelloControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HelloControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary helloWorldBean
         * @param {string} name name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async helloWorldBeanUsingGET(name: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HelloWorldBean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.helloWorldBeanUsingGET(name, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary helloWorldBean
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async helloWorldBeanUsingGET1(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HelloWorldBean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.helloWorldBeanUsingGET1(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary helloWorld
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async helloWorldUsingGET(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.helloWorldUsingGET(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * HelloControllerApi - factory interface
 * @export
 */
export const HelloControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HelloControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary helloWorldBean
         * @param {string} name name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        helloWorldBeanUsingGET(name: string, options?: any): AxiosPromise<HelloWorldBean> {
            return localVarFp.helloWorldBeanUsingGET(name, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary helloWorldBean
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        helloWorldBeanUsingGET1(options?: any): AxiosPromise<HelloWorldBean> {
            return localVarFp.helloWorldBeanUsingGET1(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary helloWorld
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        helloWorldUsingGET(options?: any): AxiosPromise<string> {
            return localVarFp.helloWorldUsingGET(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * HelloControllerApi - object-oriented interface
 * @export
 * @class HelloControllerApi
 * @extends {BaseAPI}
 */
export class HelloControllerApi extends BaseAPI {
    /**
     * 
     * @summary helloWorldBean
     * @param {string} name name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HelloControllerApi
     */
    public helloWorldBeanUsingGET(name: string, options?: AxiosRequestConfig) {
        return HelloControllerApiFp(this.configuration).helloWorldBeanUsingGET(name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary helloWorldBean
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HelloControllerApi
     */
    public helloWorldBeanUsingGET1(options?: AxiosRequestConfig) {
        return HelloControllerApiFp(this.configuration).helloWorldBeanUsingGET1(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary helloWorld
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HelloControllerApi
     */
    public helloWorldUsingGET(options?: AxiosRequestConfig) {
        return HelloControllerApiFp(this.configuration).helloWorldUsingGET(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * IndexControllerApi - axios parameter creator
 * @export
 */
export const IndexControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary showCards
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        showCardsUsingGET: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('showCardsUsingGET', 'id', id)
            const localVarPath = `/card/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary trello
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trelloUsingGET: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * IndexControllerApi - functional programming interface
 * @export
 */
export const IndexControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = IndexControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary showCards
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async showCardsUsingGET(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Card>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.showCardsUsingGET(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary trello
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trelloUsingGET(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trelloUsingGET(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * IndexControllerApi - factory interface
 * @export
 */
export const IndexControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = IndexControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary showCards
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        showCardsUsingGET(id: number, options?: any): AxiosPromise<Card> {
            return localVarFp.showCardsUsingGET(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary trello
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trelloUsingGET(options?: any): AxiosPromise<string> {
            return localVarFp.trelloUsingGET(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * IndexControllerApi - object-oriented interface
 * @export
 * @class IndexControllerApi
 * @extends {BaseAPI}
 */
export class IndexControllerApi extends BaseAPI {
    /**
     * 
     * @summary showCards
     * @param {number} id id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IndexControllerApi
     */
    public showCardsUsingGET(id: number, options?: AxiosRequestConfig) {
        return IndexControllerApiFp(this.configuration).showCardsUsingGET(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary trello
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof IndexControllerApi
     */
    public trelloUsingGET(options?: AxiosRequestConfig) {
        return IndexControllerApiFp(this.configuration).trelloUsingGET(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * WorkListControllerApi - axios parameter creator
 * @export
 */
export const WorkListControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary saveWorkList
         * @param {string} workListTitle workListTitle
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saveWorkListUsingPOST1: async (workListTitle: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'workListTitle' is not null or undefined
            assertParamExists('saveWorkListUsingPOST1', 'workListTitle', workListTitle)
            const localVarPath = `/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(workListTitle, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * WorkListControllerApi - functional programming interface
 * @export
 */
export const WorkListControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = WorkListControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary saveWorkList
         * @param {string} workListTitle workListTitle
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saveWorkListUsingPOST1(workListTitle: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saveWorkListUsingPOST1(workListTitle, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * WorkListControllerApi - factory interface
 * @export
 */
export const WorkListControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = WorkListControllerApiFp(configuration)
    return {
        /**
         * 
         * @summary saveWorkList
         * @param {string} workListTitle workListTitle
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saveWorkListUsingPOST1(workListTitle: string, options?: any): AxiosPromise<ResponseEntity> {
            return localVarFp.saveWorkListUsingPOST1(workListTitle, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * WorkListControllerApi - object-oriented interface
 * @export
 * @class WorkListControllerApi
 * @extends {BaseAPI}
 */
export class WorkListControllerApi extends BaseAPI {
    /**
     * 
     * @summary saveWorkList
     * @param {string} workListTitle workListTitle
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WorkListControllerApi
     */
    public saveWorkListUsingPOST1(workListTitle: string, options?: AxiosRequestConfig) {
        return WorkListControllerApiFp(this.configuration).saveWorkListUsingPOST1(workListTitle, options).then((request) => request(this.axios, this.basePath));
    }
}


