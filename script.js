window.onload = function() {
    // Tải file JSON chứa danh mục và video
    fetch('https://0101010kingofcode0101010.github.io/LeakerVietNam/videos.json')  // Thay 'path-to-your-json-file.json' bằng đường dẫn đến file JSON của bạn
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Lấy container chứa video và navbar
            let videosContainer = document.getElementById('videos-container');
            let navbar = document.getElementById('navbar');

            // Duyệt qua các danh mục trong JSON
            for (let category in data) {
                // Tạo một phần tử danh mục mới
                let categoryElement = document.createElement('div');
                categoryElement.classList.add('category');
                
                // Tạo mục navbar cho danh mục
                let categoryLink = document.createElement('a');
                categoryLink.href = '#';
                categoryLink.textContent = category;
                categoryLink.classList.add('category-link');
                categoryLink.addEventListener('click', () => {
                    displayCategory(category);
                });
                navbar.appendChild(categoryLink);

                // Tạo tiêu đề cho danh mục
                let categoryTitle = document.createElement('h2');
                categoryTitle.classList.add('category-title');
                categoryTitle.textContent = category;
                categoryElement.appendChild(categoryTitle);

                // Thêm video cho danh mục
                let videoList = document.createElement('div');
                videoList.classList.add('video-list');
                
                data[category].forEach(video => {
                    let videoElement = document.createElement('div');
                    videoElement.classList.add('video');
                    
                    let thumbnail = document.createElement('img');
                    thumbnail.src = video.thumbnail;
                    thumbnail.alt = video.title;
                    videoElement.appendChild(thumbnail);
                    
                    let title = document.createElement('h3');
                    title.textContent = video.title;
                    videoElement.appendChild(title);
                    
                    let link = document.createElement('a');
                    link.href = video.url;
                    link.target = '_blank';
                    link.textContent = 'Watch Video';
                    videoElement.appendChild(link);
                    
                    videoList.appendChild(videoElement);
                });
                
                categoryElement.appendChild(videoList);
                videosContainer.appendChild(categoryElement);
            }

            // Hàm hiển thị danh mục khi nhấp vào navbar
            function displayCategory(category) {
                // Ẩn tất cả danh mục
                let allCategories = document.querySelectorAll('.category');
                allCategories.forEach(cat => cat.style.display = 'none');

                // Hiển thị danh mục được chọn
                let selectedCategory = document.querySelector(`.category-title[textContent="${category}"]`).parentElement;
                selectedCategory.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            alert("Không thể tải video JSON. Vui lòng kiểm tra lại đường dẫn.");
        });
};
