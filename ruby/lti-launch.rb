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


token = requestAccessToken()
if token == -1 
	exit
end

puts "Generated Access Token is " + token

items = getItems(token)
itemId = items[1]['id']

uri = URI.parse($host+'/lti/assignment/launch/'+itemId)
params = { :access_token => token}
uri.query = URI.encode_www_form(params)

id = (0...8).map{65.+(rand(26)).chr}.join

puts "ID is " + id
response = Net::HTTP.post_form(uri, 
	'oauth_signature'=>'vjsoifjsoid',
	'lis_outcome_service_url'=>'http://localhost:8000/grade', 
	'lis_result_sourcedid'=>id, 
	'launch_presentation_return_url'=>'http://localhost:8000')
puts response.body
puts response.inspect
puts response.header['location']

puts $host + response.header['location']


system("open", $host + response.header['location'])