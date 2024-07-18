const courses = [
    { title: 'Web Development 101', category: 'web-dev', description: 'Learn the basics of web development.', link: 'web-dev-101.html' },
    { title: 'Advanced Java', category: 'java', description: 'Master Java programming with advanced techniques.', link: 'advanced-java.html' },
    { title: 'C++ for Beginners', category: 'c++', description: 'Get started with C++ programming.', link: 'cpp-beginners.html' },
    { title: 'Android App Development', category: 'android', description: 'Build your first Android app.', link: 'android-app-development.html' },
    { title: 'React.js Essentials', category: 'web-dev', description: 'Learn to build dynamic web applications with React.js.', link: 'react-js-essentials.html' },
    { title: 'Java Spring Boot', category: 'java', description: 'Develop enterprise applications using Spring Boot.', link: 'java-spring-boot.html' }
];

function filterCourses() {
    const category = document.getElementById('categories').value;
    const searchKeyword = document.getElementById('searchBar').value.toLowerCase();
    const courseList = document.getElementById('courseContainer');
    courseList.innerHTML = '';
    
    const filteredCourses = courses.filter(course => {
        const matchesCategory = category === 'all' || course.category === category;
        const matchesSearch = course.title.toLowerCase().includes(searchKeyword) || course.description.toLowerCase().includes(searchKeyword);
        return matchesCategory && matchesSearch;
    });

    if (filteredCourses.length === 0) {
        courseList.innerHTML = '<p>No courses found for the selected category and search term.</p>';
    } else {
        filteredCourses.forEach(course => {
            const courseItem = document.createElement('a');
            courseItem.classList.add('course-item');
            courseItem.href = course.link;
            courseItem.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
            courseList.appendChild(courseItem);
        });
    }
}

// Add event listener for search input
document.getElementById('searchBar').addEventListener('input', filterCourses);

function confirmLogout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = 'admin-login.html'; // Redirect to admin login page
    }
}

function redirectToPlansPage() {
    window.location.href = 'plans.html'; // Replace with the actual URL of your plans page
}

function scrollCourses(direction) {
    const container = document.querySelector('.course-container');
    const amountToScroll = 300; // Adjust this value as needed
    const totalScrollWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;

    if (direction === 'left') {
        container.scrollLeft -= amountToScroll;
        if (container.scrollLeft <= 0) {
            container.scrollLeft = totalScrollWidth / 2; // Reset to the beginning of the duplicated items
        }
    } else if (direction === 'right') {
        container.scrollLeft += amountToScroll;
        if (container.scrollLeft >= totalScrollWidth / 2) {
            container.scrollLeft = 0; // Reset to the start
        }
    }
}



function typeWriterEffect(element, text, delay) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }
    type();
}

// Call the typewriter effect on page load
document.addEventListener('DOMContentLoaded', function() {
    const heading = document.querySelector('.learning-goals h2');
    heading.innerHTML = ''; // Clear the heading initially
    typeWriterEffect(heading, 'Learning Goals', 200); // Adjust the delay as needed
});

// Initial load of all courses
filterCourses();
