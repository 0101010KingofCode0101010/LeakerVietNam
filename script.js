window.onload = function() {
    fetch('https://0101010kingofcode0101010.github.io/LeakerVietNam/videos.json')
        .then(response => response.json())
        .then(data => {
            let videosContainer = document.getElementById('videos-container');
            data.forEach(video => {
                let videoElement = document.createElement('div');
                videoElement.classList.add('video');
                
                let thumbnail = document.createElement('img');
                thumbnail.src = video.thumbnail;
                videoElement.appendChild(thumbnail);
                
                let title = document.createElement('h3');
                title.textContent = video.title;
                videoElement.appendChild(title);
                
                let link = document.createElement('a');
                link.href = video.url;
                link.target = '_blank';
                link.textContent = 'Watch Video';
                videoElement.appendChild(link);
                
                videosContainer.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
};
