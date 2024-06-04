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
            li.addEventListener('click', () => {
                openProjectPage(project);
            });
            projectContainer.appendChild(li);
        });
    }

    // scripts.js

    function openProjectPage(project) {
        // 프로젝트 상세 정보 페이지의 URL을 생성합니다.
        const projectDetailURL = 'project-details.html?id=' + project.id;
        
        // 새로운 페이지로 리다이렉트합니다.
        window.location.href = projectDetailURL;
}


    document.addEventListener('DOMContentLoaded', () => {
        // URL에서 프로젝트 ID를 가져옵니다.
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('id');

        // 프로젝트 상세 정보를 가져와 페이지에 표시합니다.
        const project = getProjectById(projectId);
        if (project) {
            displayProjectDetails(project);
        } else {
            // 프로젝트가 존재하지 않는 경우, 에러 메시지를 표시합니다.
            const projectDetails = document.getElementById('project-details');
            projectDetails.innerHTML = '<p>Project not found.</p>';
        }
    });

    // 프로젝트 ID를 이용하여 프로젝트 상세 정보를 가져오는 함수
    function getProjectById(projectId) {
        // 여기서는 간단히 로컬 스토리지에서 프로젝트를 가져오도록 합니다.
        const projects = getProjects();
        return projects.find(project => project.id === projectId);
    }

    // 프로젝트 상세 정보를 페이지에 표시하는 함수
    function displayProjectDetails(project) {
        const projectNameElement = document.getElementById('project-name');
        const projectDescriptionElement = document.getElementById('project-description');

        projectNameElement.textContent = project.name;
        projectDescriptionElement.textContent = project.description;
    }

    // getProjects() 함수와 saveProject() 함수는 이전에 작성된 것과 동일합니다.
    // 나중에 프로젝트를 생성하고 저장할 때 사용합니다.


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
