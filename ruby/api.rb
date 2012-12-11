def requestAccessToken(clientId, clientSecret)
	uri = URI.parse($host+'/auth/access_token')
	response = Net::HTTP.post_form(uri, {
		'grant_type' => 'client_credentials', 
		'client_id' => clientId, 
		'client_secret' => clientSecret
		}
	)
	case response
		when Net::HTTPSuccess, Net::HTTPRedirection
			token = JSON.parse(response.body)['access_token']
			return token
		else
		  	puts "Error Getting Access Token: " + response.bod
		  	return -1
	end
end

def getItems(token)
	uri = URI.parse($host + '/api/v1/items')
	params = { :access_token => token}
	uri.query = URI.encode_www_form(params)

	res = Net::HTTP.get_response(uri)
	items = JSON.parse(res.body)
	return items
end

def createItemSession(token, itemId) 
	uri = URI.parse($host+'/api/v1/items/'+itemId+'/sessions')
	params = { :access_token => token}
	uri.query = URI.encode_www_form(params)

	response = Net::HTTP.post_form(uri, {})
	case response
	when Net::HTTPSuccess, Net::HTTPRedirection
		sessionId = JSON.parse(response.body)['id']
		return sessionId
	else
	  	puts "Error Creating Session"
	  	return -1
	end
end

def showSession(token, itemId, sessionId) 
	uri = URI.parse($host + '/api/v1/items/'+itemId+"/sessions/"+sessionId)
	params = { :access_token => token}
	uri.query = URI.encode_www_form(params)

	res = Net::HTTP.get_response(uri)
	puts JSON.pretty_generate(JSON.parse(res.body))
end

