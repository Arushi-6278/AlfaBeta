function toggleContent(id) {
    const element = document.getElementById(id);
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function searchCourse() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const courseList = document.getElementById('courseList').getElementsByTagName('li');
    
    for (let i = 0; i < courseList.length; i++) {
        const course = courseList[i];
        const courseName = course.innerText.toLowerCase();
        
        if (courseName.includes(input)) {
            course.style.display = '';
        } else {
            course.style.display = 'none';
        }
    }
}

function filterCategory() {
    const category = document.getElementById('categories').value;
    const courseList = document.getElementById('courseList').getElementsByTagName('li');
    
    for (let i = 0; i < courseList.length; i++) {
        const course = courseList[i];
        const courseCategory = course.getAttribute('data-category');
        
        if (category === 'all' || courseCategory === category) {
            course.style.display = '';
        } else {
            course.style.display = 'none';
        }
    }
}