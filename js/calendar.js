(function () {
    'use strict';

    var GOOGLE_CALENDAR_ID = window.GOOGLE_CALENDAR_ID;
    var GOOGLE_API_KEY = window.GOOGLE_API_KEY;
    var CALENDAR_URL = 'https://content.googleapis.com/calendar/v3/calendars/{google_calendar_id}/events';
    var MAP_URL = 'https://www.google.com/maps/search/';

    var loadingElement = document.getElementsByClassName('loading-event')[0];
    var eventElement = document.getElementsByClassName('event')[0];
    var eventNameElement = document.getElementsByClassName('event-name')[0];
    var eventDateElement = document.getElementsByClassName('event-date')[0];
    var eventLocationElement = document.getElementsByClassName('event-location')[0];
    var eventMapLinkElement = document.getElementsByClassName('event-link--map')[0];
    var eventCalendarLinkElement = document.getElementsByClassName('event-link--calendar')[0];

    var encodeParams = function (params) {
        var encodedParams = [];
        for (var paramName in params)
            if (params.hasOwnProperty(paramName)) {
                encodedParams.push(encodeURIComponent(paramName) + "=" + encodeURIComponent(params[paramName]));
            }
        return encodedParams.join("&");
    };

    var params = encodeParams({
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 1,
        'orderBy': 'startTime',
        'key': GOOGLE_API_KEY
    });
    var url = CALENDAR_URL.replace('{google_calendar_id}', GOOGLE_CALENDAR_ID) + '?' + params;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                var response = JSON.parse(request.response);

                if (response.items.length > 0) {
                    var event = response.items[0];
                    
                    // event name
                    if (event.visibility === 'private') {
                        eventNameElement.textContent = 'Occupé(e)';
                    } else {
                        eventNameElement.textContent = event.summary;
                    }
                    
                    // event date
                    moment.locale('fr');
                    var date = moment(event.start.dateTime);
                    eventDateElement.textContent = date.format('dddd D MMMM [à] H[h]mm');
                    
                    // event location
                    var location = event.location;
                    if (location) {
                        location = location[0].toLowerCase() + location.slice(1, location.length);
                        if ('.?!'.search(location[location.length - 1]) == -1) {
                            location += '.';
                        }
                        eventLocationElement.textContent = location;
                    }
                    
                    // map link
                    eventMapLinkElement.href = MAP_URL + encodeURIComponent(event.location);
                    
                    // calendar link
                    eventCalendarLinkElement.href = event.htmlLink;
                        
                } else {
                    eventNameElement.textContent = 'Pas d\'événement planifié actuellement :(';
                    var paragraphs = document.querySelectorAll('.event > p');
                    for (var i = 0; i < paragraphs.length; i++) {
                        paragraphs[i].parentNode.removeChild(paragraphs[i]);
                    }
                }

                loadingElement.style.display = 'none';
                eventElement.style.display = 'block';
            }
        }
    };
    request.send(null);
}());
