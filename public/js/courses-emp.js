function filterCourses() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const selectedCategory = document.getElementById('categories').value;
    const courseItems = document.querySelectorAll('.course-item');

    courseItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const category = item.getAttribute('data-category');

        const matchesSearch = title.includes(searchInput) || description.includes(searchInput);
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            item.style.display = 'block'; // Show item if it matches
        } else {
            item.style.display = 'none'; // Hide item if it doesn't match
        }
    });
}

function confirmLogout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        window.location.href = "employee-login.html";
    }
}