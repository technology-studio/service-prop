/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-03-28T12:03:26+02:00
 * @Copyright: Technology Studio
**/

import type { ServiceErrorException } from '..'

export type CallAttributes<ATTRIBUTES> = Partial<ATTRIBUTES & {
  context?: string,
}>

export type ServiceResult<
  ATTRIBUTES,
  DATA,
  CALL_ATTRIBUTES extends CallAttributes<ATTRIBUTES> | undefined,
  CALL_DATA
> = {
  serviceProp: ServiceProp<ATTRIBUTES, DATA, CALL_ATTRIBUTES, CALL_DATA>,
  attributes?: ATTRIBUTES,
  callAttributes?: CALL_ATTRIBUTES,
  callData: CALL_DATA,
}

export type ServiceCallResult<DATA = undefined, CALL_DATA = undefined> = {
  data: DATA,
  callData: CALL_DATA,
}

export type ServiceError = {
  key: string,
  message: string,
  data?: unknown,
}

export type ValueOrValueMapper<VALUE> = VALUE | (() => VALUE)

export type BooleanMap = {
  [key: string]: boolean | BooleanMap,
}

type Options = {
  validationAttributes?: ValueOrValueMapper<string[] | BooleanMap>,
}

export type ServicePropCall<
  ATTRIBUTES = undefined,
  DATA = undefined,
  CALL_ATTRIBUTES extends CallAttributes<ATTRIBUTES> | undefined = undefined,
  EXTNEDED_RESULT = undefined
> = (
  attributes: ATTRIBUTES,
  callAttributes?: CALL_ATTRIBUTES
) => Promise<ServiceResult<ATTRIBUTES, DATA, CALL_ATTRIBUTES, EXTNEDED_RESULT>>

export type ServiceProp<
  ATTRIBUTES = undefined,
  DATA = undefined,
  CALL_ATTRIBUTES extends CallAttributes<ATTRIBUTES> | undefined = undefined,
  EXTNEDED_RESULT = undefined,
> = {
  data: DATA | null,
  call: ServicePropCall<ATTRIBUTES, DATA, CALL_ATTRIBUTES, EXTNEDED_RESULT>,
  fetching: boolean,
  clear: (callContext?: string) => void,
  exception: ServiceErrorException | null,
  options: Options,
  clearException: (exception: ServiceErrorException) => void,
}
