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

    // Initialize Quill editor
    const quill = new Quill('#editor-container', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'font': [] }],
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean'] 
            ]
        }
    });

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
        const projectDescription = quill.root.innerHTML;

        const project = {
            name: projectName,
            description: projectDescription,
            id: new Date().getTime()
        };

        saveProject(project);
        projectForm.reset();
        quill.setContents([]);
        alert('Project created successfully!');
    });

    // Load projects from local storage
    function loadProjects() {
        projectContainer.innerHTML = '';
        const projects = getProjects();
        projects.forEach(project => {
            const li = document.createElement('li');
            li.innerHTML = `${project.name}: ${project.description}`;
            li.addEventListener('click', () => {
                openProjectPage(project);
            });
            projectContainer.appendChild(li);
        });
    }

    function openProjectPage(project) {
        const projectDetailURL = 'project-details.html?id=' + project.id;
        window.location.href = projectDetailURL;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('id');

        const project = getProjectById(projectId);
        if (project) {
            displayProjectDetails(project);
        } else {
            const projectDetails = document.getElementById('project-details');
            projectDetails.innerHTML = '<p>Project not found.</p>';
        }
    });

    function getProjectById(projectId) {
        const projects = getProjects();
        return projects.find(project => project.id === projectId);
    }

    function displayProjectDetails(project) {
        const projectNameElement = document.getElementById('project-name');
        const projectDescriptionElement = document.getElementById('project-description');

        projectNameElement.textContent = project.name;
        projectDescriptionElement.innerHTML = project.description;
    }

    function saveProject(project) {
        const projects = getProjects();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function getProjects() {
        const projects = localStorage.getItem('projects');
        return projects ? JSON.parse(projects) : [];
    }

    searchBar.addEventListener('input', () => {
        homeSection.classList.add('hidden');
        projectListSection.classList.remove('hidden');
        createProjectSection.classList.add('hidden');
        loadProjects();
        const searchQuery = searchBar.value.toLowerCase();
        const projects = getProjects();
        projectContainer.innerHTML = '';
        const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchQuery));
        filteredProjects.forEach(project => {
            const li = document.createElement('li');
            li.innerHTML = `${project.name}: ${project.description}`;
            projectContainer.appendChild(li);
        });
    });
});
