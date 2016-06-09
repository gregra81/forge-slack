var oss = {};


var apiResponse = {
	text: 'Here are all the OSS API endpoints:',
	attachments: [
		{"text":"1. `POST buckets`"},
		{"text":"2. `GET buckets/{bucketKey}/details`"},
		{"text":"3. `POST buckets/{bucketKey}/grant`"}
	]
};


oss.response = function(keyword){
	var response;
	switch (keyword){
		case 'api':
			response = apiResponse;
			break;
		default:
			response = {text: 'I\'m not familiar with the keyword <' + keyword + '>'};
			break;
	}

	return response;

}


module.exports = oss;