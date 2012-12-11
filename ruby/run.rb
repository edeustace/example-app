require "net/http"
require "uri"
require 'json'
require 'rbconfig'

# Api methods are declared in 
require "./api.rb"

if ARGV.length < 3
	puts "Usage: run.rb api_host clientId clientSecret"
	puts ""
	puts "Example: ruby run.rb http://corespring.org 50c7556303643e1d2cf867cf 2fn87wkv3f1su4jtmshp"
	exit
end

# CoreSpring API Host
$host = ARGV.shift

# Replace with your Client ID
$clientId = ARGV.shift

# Replace with your Client Secret
$clientSecret = ARGV.shift

def launchLinkInDefaultBrowser(link)
	is_windows = (RbConfig::CONFIG['host_os'] =~ /mswin|mingw|cygwin/)
	if is_windows
		system("start #{link}")
	else
		system("open", link)
	end
end

def launchAssessment(sessionId, token)
	launchLinkInDefaultBrowser($host + "/testplayer/session/"+sessionId+"/run?access_token="+token)
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

token = requestAccessToken($clientId, $clientSecret)
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

