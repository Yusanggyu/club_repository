document.addEventListener('DOMContentLoaded', function () {
    // 프로젝트 데이터 저장용 배열
    var projects = [];

    // Quill editor 설정
    var quill = new Quill('#editor-container', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'font': [] }],
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean'] 
            ]
        }
    });

    // 폼 제출 이벤트 핸들러
    document.getElementById('project-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var projectName = document.getElementById('project-name').value;
        var projectDescription = quill.root.innerHTML;

        addProjectToList(projectName, projectDescription);

        // 폼 초기화
        document.getElementById('project-name').value = '';
        quill.root.innerHTML = '';
    });

    // 프로젝트 리스트에 프로젝트 추가 함수
    function addProjectToList(name, description) {
        // 프로젝트 데이터 배열에 추가
        projects.push({ name: name, description: description });
        updateProjectList();
    }

    // 프로젝트 리스트 업데이트 함수
    function updateProjectList() {
        var projectContainer = document.getElementById('project-container');
        projectContainer.innerHTML = '';
        projects.forEach(function (project) {
            var projectItem = document.createElement('li');
            projectItem.classList.add('project-item');
            projectItem.innerText = project.name;
            projectItem.addEventListener('click', function () {
                openModal(project.name, project.description);
            });
            projectContainer.appendChild(projectItem);
        });
    }

    // 모달 열기 함수
    function openModal(title, description) {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-description').innerHTML = description;
        document.getElementById('modal-container').style.display = 'block';
    }

    // 모달 닫기 함수
    window.closeModal = function () {
        document.getElementById('modal-container').style.display = 'none';
    };

    // 네비게이션 링크 클릭 이벤트
    document.getElementById('home-link').addEventListener('click', function () {
        showSection('home');
    });
    document.getElementById('projects-link').addEventListener('click', function () {
        showSection('project-list');
        updateProjectList(); // 프로젝트 리스트 섹션을 열 때 프로젝트 리스트 업데이트
    });
    document.getElementById('create-link').addEventListener('click', function () {
        showSection('create-project');
    });

    // 섹션 보여주기 함수
    function showSection(sectionId) {
        var sections = document.querySelectorAll('#content > div');
        sections.forEach(function (section) {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    // 검색창 이벤트 핸들러 추가
    document.getElementById('search-bar').addEventListener('input', function () {
        var searchQuery = this.value.toLowerCase();
        showSection('project-list');
        filterProjects(searchQuery);
    });

    // 프로젝트 필터링 함수
    function filterProjects(query) {
        var projectContainer = document.getElementById('project-container');
        projectContainer.innerHTML = '';
        var filteredProjects = projects.filter(function (project) {
            return project.name.toLowerCase().includes(query);
        });
        filteredProjects.forEach(function (project) {
            var projectItem = document.createElement('li');
            projectItem.classList.add('project-item');
            projectItem.innerText = project.name;
            projectItem.addEventListener('click', function () {
                openModal(project.name, project.description);
            });
            projectContainer.appendChild(projectItem);
        });
    }
});
