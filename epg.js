// The URL of the XML file
const xmlUrl = 'https://raw.githubusercontent.com/AqFad2811/epg/main/epg.xml';

// The container element where the EPG will be displayed
const epgContainer = document.getElementById('epg-container');

// Create a new XMLHttpRequest object to fetch the XML file
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
	if (this.readyState === 4 && this.status === 200) {
		// Parse the XML response
		const xml = this.responseXML;

		// Find the "programme" elements in the XML file
		const programmes = xml.getElementsByTagName('programme');

		// Loop through the "programme" elements and create HTML elements for each one
		for (let i = 0; i < programmes.length; i++) {
			// Get the programme data from the XML element
			const programme = programmes[i];
			const start = programme.getAttribute('start');
			const stop = programme.getAttribute('stop');
			const channel = programme.getAttribute('channel');
			const title = programme.getElementsByTagName('title')[0].textContent;
			const description = programme.getElementsByTagName('desc')[0].textContent;

			// Create HTML elements to display the programme data
			const programmeElement = document.createElement('div');
			programmeElement.className = 'programme';
			const timeElement = document.createElement('div');
			timeElement.className = 'time';
			timeElement.textContent = `${start} - ${stop}`;
			const channelElement = document.createElement('div');
			channelElement.className = 'channel';
			channelElement.textContent = channel;
			const titleElement = document.createElement('div');
			titleElement.className = 'title';
			titleElement.textContent = title;
			const descriptionElement = document.createElement('div');
			descriptionElement.className = 'description';
			descriptionElement.textContent = description;

			// Add the HTML elements to the EPG container
			programmeElement.appendChild(timeElement);
			programmeElement.appendChild(channelElement);
			programmeElement.appendChild(titleElement);
			programmeElement.appendChild(descriptionElement);
			epgContainer.appendChild(programmeElement);
		}
	}
};

xhr.open('GET', xmlUrl, true);
xhr.send();
