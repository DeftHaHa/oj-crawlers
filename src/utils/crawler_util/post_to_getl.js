function serialize(obj, prefix) {
  let str = [], p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

const input = {
  query: 'query userPublicProfile($userSlug:String!){userProfilePublicProfile(userSlug:$userSlug){submissionProgress{totalSubmissions acTotal}}}',
  variables: { userSlug: 'BlueLine' }
}

console.log(serialize(input));

console.log(JQuery.params(input))
