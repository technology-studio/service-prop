/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2021-09-28T16:09:83+02:00
 * @Copyright: Technology Studio
**/

import type { ServiceError } from '../Model/Types'
import { DEFAULT_SERVICE_NAME } from '../Model'

export const materializeFromServiceErrorList = (serviceErrorList: ServiceError[]): string => {
  const serviceNameToErrorListMap = serviceErrorList.reduce<Record<string, ServiceError[]>>((map, serviceError) => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const serviceName = serviceError.serviceName || DEFAULT_SERVICE_NAME
    if (!map[serviceName]) {
      map[serviceName] = []
    }
    map[serviceName].push(serviceError)
    return map
  }, {})
  const message = Object.keys(serviceNameToErrorListMap).reduce((message, serviceName) => {
    const serviceErrorList = serviceNameToErrorListMap[serviceName]
    if (serviceName === DEFAULT_SERVICE_NAME) {
      return message + `${serviceErrorList.map(error => error.message).join(', ')}\n`
    }
    return message + `${serviceName}: ${serviceErrorList.map(serviceError => serviceError.message).join(', ')}\n`
  }, '')
  return message.trim()
}
