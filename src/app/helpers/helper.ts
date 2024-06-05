import * as employee from '../../employee.json';

export function isEmpty(data: any = null): boolean {
  let result = false;
  if (typeof (data) === 'object') {
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') result = true;
    if (!data) result = true;
  } else if (typeof (data) === 'string') {
    if (!data.trim()) result = true;
  } else if (typeof (data) === 'undefined') {
    result = true;
  }

  return result;
}