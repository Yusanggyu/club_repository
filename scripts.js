// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('home-link');
    const projectsLink = document.getElementById('projects-link');
    const createLink = document.getElementById('create-link');

    const homeSection = document.getElementById('home');
    const projectListSection = document.getElementById('project-list');
    const createProjectSection = document.getElementById('create-project');

    const projectForm = document.getElementById('project-form');
    const projectContainer = document.getElementById('project-container');
    const searchBar = document.getElementById('search-bar');

    // Navigation functionality
    homeLink.addEventListener('click', () => {
        homeSection.classList.remove('hidden');
        projectListSection.classList.add('hidden');
        createProjectSection.classList.add('hidden');
    });

    projectsLink.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        projectListSection.classList.remove('hidden');
        createProjectSection.classList.add('hidden');
        loadProjects();
    });

    createLink.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        projectListSection.classList.add('hidden');
        createProjectSection.classList.remove('hidden');
    });

    // Project form submission
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = document.getElementById('project-name').value;
        const projectDescription = document.getElementById('project-description').value;

        const project = {
            name: projectName,
            description: projectDescription,
            id: new Date().getTime()
        };

        saveProject(project);
        projectForm.reset();
        alert('Project created successfully!');
    });

    // Load projects from local storage
    function loadProjects() {
        projectContainer.innerHTML = '';
        const projects = getProjects();
        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = `${project.name}: ${project.description}`;
            projectContainer.appendChild(li);
        });
    }

    // Save project to local storage
    function saveProject(project) {
        const projects = getProjects();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Get projects from local storage
    function getProjects() {
        const projects = localStorage.getItem('projects');
        return projects ? JSON.parse(projects) : [];
    }

    // Search functionality
    searchBar.addEventListener('input', () => {
        const searchQuery = searchBar.value.toLowerCase();
        const projects = getProjects();
        projectContainer.innerHTML = '';
        const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchQuery));
        filteredProjects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = `${project.name}: ${project.description}`;
            projectContainer.appendChild(li);
        });
    });
});
