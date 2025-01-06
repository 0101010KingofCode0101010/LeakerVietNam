window.onload = function () {
    // Đường dẫn tới file JSON
    const jsonUrl = 'https://0101010kingofcode0101010.github.io/LeakerVietNam/videos.json';

    // DOM Elements
    const videosContainer = document.getElementById('videos-container');
    const navbar = document.getElementById('navbar');
    const galleryTitle = document.getElementById('gallery-title');

    // Hàm tải JSON
    const fetchVideos = async () => {
        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error loading JSON:', error);
            alert("Không thể tải video JSON. Vui lòng kiểm tra lại đường dẫn.");
            return null;
        }
    };

    // Hàm hiển thị video theo danh mục
    const loadCategory = (category, data) => {
        // Cập nhật tiêu đề gallery
        galleryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Videos`;

        // Xóa các video cũ
        videosContainer.innerHTML = '';

        // Lấy video theo danh mục
        const videos = data.categories[category];
        if (videos && videos.length > 0) {
            videos.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.classList.add('video');

                const thumbnail = document.createElement('img');
                thumbnail.src = video.thumbnail;
                thumbnail.alt = video.title;
                videoElement.appendChild(thumbnail);

                const title = document.createElement('h3');
                title.textContent = video.title;
                videoElement.appendChild(title);

                const link = document.createElement('a');
                link.href = video.url;
                link.target = '_blank';
                link.textContent = 'Watch Video';
                videoElement.appendChild(link);

                videosContainer.appendChild(videoElement);
            });
        } else {
            videosContainer.innerHTML = '<p>No videos found for this category.</p>';
        }
    };

    // Hàm tạo navbar từ danh mục
    const createNavbar = (categories) => {
        navbar.innerHTML = ''; // Xóa navbar cũ nếu có
        Object.keys(categories).forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            button.dataset.category = category;
            button.addEventListener('click', () => loadCategory(category, data));
            navbar.appendChild(button);
        });
    };

    // Khởi động
    let data = null;
    fetchVideos().then(jsonData => {
        if (jsonData) {
            data = jsonData; // Lưu dữ liệu JSON vào biến toàn cục
            createNavbar(data.categories); // Tạo navbar
            loadCategory(Object.keys(data.categories)[0], data); // Tải danh mục đầu tiên
        }
    });
};
