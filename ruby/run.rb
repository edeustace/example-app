require "net/http"
require "uri"
require 'json'

# CoreSpring API Host
$host = "http://localhost:9000"

# Replace with your Client ID
$clientId = "502d46ce0364068384f217a5";

# Replace with your Client Secret
$clientSecret = "abc123";



def requestAccessToken()
	uri = URI.parse($host+'/auth/access_token')
	response = Net::HTTP.post_form(uri, {
		'grant_type' => 'client_credentials', 
		'client_id' => $clientId, 
		'client_secret' => $clientSecret
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


def launchAssessment(sessionId, token)
	system("open", $host + "/testplayer/session/"+sessionId+"/run?access_token="+token)
end

def showMenu(token, itemId, sessionId)  
	puts "Choose from the following options:"
	puts "(1) Show Session Data"
	puts "(2) Launch Assessment"
	puts "(3) Exit"

	choice = Integer(gets)

	case choice
	when 1
		showSession(token, itemId, sessionId)
	when 2
		launchAssessment(sessionId, token)
	when 3
		return
	end

	showMenu(token, itemId, sessionId)

end

token = requestAccessToken()
if token == -1 
	exit
end

puts "Generated Access Token is " + token
printf("Getting Items: ");

items = getItems(token)

puts("Done.")
puts("\nSelect one of the following assessments:")
for i in 0..[9, items.length].min
   puts String(i+1)+") "+items[i]['title']
end

requestedId = Integer(gets)
itemId = items[requestedId]['id']

printf("\nCreating Item Session: ")
sessionId = createItemSession(token, itemId) 
puts("Done.")

puts "Session Id is " + sessionId
puts ""

showMenu(token, itemId, sessionId)

