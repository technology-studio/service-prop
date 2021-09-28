/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-28T16:09:73+02:00
 * @Copyright: Technology Studio
**/

import { ServiceErrorException } from '@txo/service-prop/src/Api/ServiceErrorException'
import type { ServiceError } from '@txo/service-prop/src'

describe('ServiceErrorException', () => {
  test('should create correct message from service error list', () => {
    const serviceErrorList: ServiceError[] = [
      {
        key: 'error1',
        message: 'first error',
        serviceName: 'serviceName1',
      },
      {
        key: 'error2',
        message: 'second error',
        serviceName: 'serviceName1',
      },
      {
        key: 'error1',
        message: 'first error without service name',
      },
    ]
    const error = new ServiceErrorException({
      serviceErrorList,
    })
    expect(error.message).toBe('serviceName1: first error, second error\nfirst error without service name')
  })
  test('should create correct message from service error list without service name', () => {
    const serviceErrorList: ServiceError[] = [
      {
        key: 'error1',
        message: 'first error without service name',
      },
      {
        key: 'error2',
        message: 'second error without service name',
      },
      {
        key: 'error3',
        message: 'third error without service name',
      },
    ]
    const error = new ServiceErrorException({
      serviceErrorList,
    })
    expect(error.message).toBe('first error without service name, second error without service name, third error without service name')
  })
})
