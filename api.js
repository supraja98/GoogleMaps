var api = {

	getRovers(){
     var url = 'https://app.brusqueness80.hasura-app.io/api', {
  method= 'POST',
  headers= {
    Accept: 'application/json',
    'Content-Type': 'application/json',

     },
    body=JSON.stringify({
    origin: 'chennai',
    destination: 'bangalore',
  }),
 };
     return fetch(url).then((res) => res.json);
    }

};

module.exports = api;

