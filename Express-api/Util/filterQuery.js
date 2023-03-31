/**
 *
 * @param {String} query
 * @param  {...String} fields
 * Filter a given string, if the text or given fields exist in the string
 * Best use case is to filter password or other sensitive data in select method of the mongoose
 * @returns A filtered String of fields array
 */
exports.filterFields = (query, ...fields) => {
  if (query) {
    let queryArr = query.split(",");
    queryArr = queryArr.filter((el, i) => {
      if (fields.includes(el)) {
        return false;
      }
      return true;
    });
    return queryArr.join(" ");
  }
  return query.split(",").join(" ");
};
/**
 * Filter the Object, and return object of the required fields
 * @param {Object} objToFilter Object to be filtered
 * @param  {...String} fields Fields to be filtered in Object
 * @returns returns an object of only given fields, and filter out the rest
 */

exports.filterReq = (objToFilter, ...fields) => {
  const copyOfObjToFilter = { ...objToFilter };
  Object.keys(copyOfObjToFilter).forEach((field, i) => {
    if (!fields.includes(field)) delete copyOfObjToFilter[field];
  });
  return copyOfObjToFilter;
};
