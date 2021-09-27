/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-07-11T20:31:47+02:00
 * @Copyright: Technology Studio
**/

// import { ExtendableException } from '@txo/commons'

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

export class ServiceErrorException extends ExtendableException {
  serviceErrorList: ServiceError[]
  constructor (serviceErrorList: ServiceError[], message?: string) {
    super(serviceErrorList.map(({ message }) => message).join('\n'))
    this.serviceErrorList = serviceErrorList
    this.name = message
      ? `ServiceErrorException (${message})`
      : 'ServiceErrorException'
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isServiceErrorException = (error: any | ServiceErrorException): error is ServiceErrorException => (
  !!(error?.name === 'ServiceErrorException')
)
