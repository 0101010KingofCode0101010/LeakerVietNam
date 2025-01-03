window.onload = function() {
    fetch('https://username.github.io/repository/videos.txt')  // Đổi thành URL của bạn
        .then(response => response.text())
        .then(data => {
            console.log("Dữ liệu từ videos.txt:", data); // Kiểm tra dữ liệu
            const videos = parseVideos(data);
            console.log("Danh sách video:", videos); // Kiểm tra danh sách video sau khi phân tích
            displayVideos(videos);
        })
        .catch(error => console.error('Error loading videos:', error));
};

function parseVideos(data) {
    const videoEntries = [];
    const regex = /\[URL=(.*?)\]\[IMG](.*?)\[\/IMG](.*?)\[\/URL]/g;
    let match;

    while ((match = regex.exec(data)) !== null) {
        const url = match[1];
        const imgUrl = match[2];
        const title = match[3].trim();
        videoEntries.push({ url, imgUrl, title });
    }

    return videoEntries;
}

function displayVideos(videos) {
    const videoList = document.getElementById('video-list');
    if (videos.length === 0) {
        videoList.innerHTML = '<p>Không có video nào để hiển thị.</p>';
    }

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const thumbnail = document.createElement('img');
        thumbnail.src = video.imgUrl;

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = video.title;

        const link = document.createElement('a');
        link.href = video.url;
        link.target = "_blank";
        link.appendChild(thumbnail);
        link.appendChild(title);

        videoItem.appendChild(link);
        videoList.appendChild(videoItem);
    });
}
