/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-07-11T20:31:47+02:00
 * @Copyright: Technology Studio
**/

// import { ExtendableException } from '@txo/commons'
import { isObject } from '@txo/types'

import type { ServiceError } from '../Model/Types'

export class ExtendableException extends Error {
  constructor (message: string) {
    super(message)
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

type ServiceOperationErrorAttributes = {
  context: string,
  serviceErrorList: ServiceError[],
  operationName: string,
}

export class ServiceOperationError extends ExtendableException {
  context: string
  serviceErrorList: ServiceError[]
  operationName: string
  constructor ({
    context,
    serviceErrorList,
    operationName,
  }: ServiceOperationErrorAttributes) {
    super(
      `${operationName}:${serviceErrorList.length > 1 ? '\n' : ' '}${serviceErrorList.map(({ message }) => message).join('\n')}`,
    )
    this.serviceErrorList = serviceErrorList
    this.operationName = operationName
    this.context = context
    this.name = 'ServiceOperationError'
  }
}

export const isServiceOperationError = (error: unknown): error is ServiceOperationError => (
  isObject(error) && error.name === 'ServiceOperationError'
)
