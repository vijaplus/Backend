
export function requestFields(requests:string[], fields:string[]) {
  requests.forEach(request => {
    const missingField = fields.includes(request) ? "" : request
    if(missingField) throw new Error(`Missing ${missingField} field`)
  })
}