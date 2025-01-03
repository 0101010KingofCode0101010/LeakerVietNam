fetch('videos.txt')
    .then(response => response.text())
    .then(data => {
        const videoGallery = document.getElementById('videoGallery');
        const videoEntries = data.trim().split(/[\r\n]+/).filter(line => line);

        for (let i = 0; i < videoEntries.length; i += 3) {
            const urlLine = videoEntries[i];
            const imgLine = videoEntries[i + 1];

            const urlMatch = urlLine.match(/URL=(.*?)\]/);
            const imgMatch = imgLine.match(/IMG](.*?)\[/);
            const title = imgLine.split(']')[1];

            if (urlMatch && imgMatch) {
                const url = urlMatch[1];
                const thumbnail = imgMatch[1];

                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';
                videoContainer.innerHTML = `
                    <a href="${url}" target="_blank">
                        <img src="${thumbnail}" alt="Video Thumbnail">
                        <p>${title.trim()}</p>
                    </a>
                `;
                videoGallery.appendChild(videoContainer);
            }
        }
    })
    .catch(error => console.error('Error loading video data:', error));
