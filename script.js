window.onload = function() {
    fetch('https://api.github.com/repos/0101010KingofCode0101010/LeakerVietNam/contents/videos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Lấy đường dẫn raw file từ API
            const rawUrl = data[0].download_url; // Dữ liệu trả về từ API có chứa download_url

            // Fetch file JSON từ đường dẫn raw
            return fetch(rawUrl);
        })
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
        .catch(error => {
            console.error('Error loading JSON:', error);
            alert("Không thể tải video JSON. Vui lòng kiểm tra lại đường dẫn.");
        });
};
