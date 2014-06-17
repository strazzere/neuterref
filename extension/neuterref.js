// Add other email providers if need be
var gmail = "mail.google.com";

// Fill in "internal" or other domains to strip things on
var sensitive_domains = [
			 "google.com" // Change this to internal domains...
			  ];

function neuterGmailLinks (evt) {
    // This seems like  rather stable way to get just the domain
    var bodies = document.body.getElementsByClassName("adn ads");
    for(var i = 0; i < bodies.length; i++) {
	var links = bodies[i].getElementsByTagName("a");
	for(var x = 0; x < links.length; x++) {
	    // Only kill referrer if it is outside gmail domain or sensitive domains
	    // XXX: May want to just kill anything outside current domain?
	    if(gmail.indexOf(links[x].hostname) == -1
	       || sensitive_domains.indexOf(links[x].hostname) == -1) {
		console.log("Replacing link! %s", links[x].href);
		var rel = links[x].getAttribute("rel");
		links[x].setAttribute("rel", rel != null ? rel+" noreferrer" : "noreferrer");
	    }
	}
    }
}

function neuterSensitiveDomains (evt) {
    var links = document.body.getElementsByTagName("a");
    for(var i = 0; i < links.length; i ++) {
	var tmp = new URL(links[i].href);
	// Only kill the referrer if the link is bouncing to a host that is not trusted
	// XXX: Potentially strip this if not current host? Only needed if we don't
	//      trust all "sensitive_domains"
	if(sensitive_domains.indexOf(tmp.hostname) == -1) {
	    console.log("Replacing link! %s", links[i].href);
	    var rel = links[i].getAttribute("rel");
	    links[i].setAttribute("rel", rel != null ? rel+" noreferrer" : "noreferrer");
	}
    }
}

// Is this a gmail page?
if(gmail.indexOf(window.location.host) != -1) {
    window.addEventListener("hashchange", neuterGmailLinks, false);
}else if(sensitive_domains.indexOf(window.location.host) != -1) {
    // Or is it listed on the sensitive page? if so try generic onload neutering
    window.addEventListener("DOMContentLoaded", neuterSensitiveDomains, false);
}