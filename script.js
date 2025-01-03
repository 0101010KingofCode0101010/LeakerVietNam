fetch('videos.txt')
    .then(response => response.text())
    .then(data => {
        const videoData = data.split('\n').map(line => {
            const [url, thumbnail, title] = line.split('|');
            return { url, thumbnail, title };
        });

        const videoGallery = document.getElementById('videoGallery');

        videoData.forEach(video => {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            videoContainer.innerHTML = `
                <a href="${video.url}" target="_blank">
                    <img src="${video.thumbnail}" alt="Video Thumbnail">
                    <p>${video.title}</p>
                </a>
            `;
            videoGallery.appendChild(videoContainer);
        });
    })
    .catch(error => console.error('Error loading video data:', error));
