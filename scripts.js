document.addEventListener('DOMContentLoaded', function () {
    // 프로젝트 데이터 저장용 배열
    var projects = [];
    var projectItems = {}; // 프로젝트 항목을 저장할 객체

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

        // 확인 팝업 열기
        showConfirmationPopup(projectName, projectDescription);
    });

    // 프로젝트 리스트에 프로젝트 추가 함수
    function addProjectToList(name, description, images) {
        // 프로젝트 데이터 배열에 추가
        var project = { name: name, description: description, images: images };
        projects.push(project);
        var projectItem = createProjectItem(project);
        projectItems[name] = projectItem;
        updateProjectList();
    }

    // 프로젝트 항목 생성 함수
    function createProjectItem(project) {
        var projectItem = document.createElement('li');
        projectItem.classList.add('project-item');

        var img = document.createElement('img');
        if (project.images.length > 0) {
            img.src = project.images[0]; // 첫 번째 이미지를 사용
        }

        var content = document.createElement('div');
        content.classList.add('content');

        var title = document.createElement('div');
        title.classList.add('title');
        title.innerText = project.name;

        var desc = document.createElement('div');
        desc.classList.add('description');
        desc.innerText = stripHtml(project.description);

        content.appendChild(title);
        content.appendChild(desc);

        projectItem.appendChild(img);
        projectItem.appendChild(content);

        projectItem.addEventListener('click', function () {
            openModal(project.name, project.description);
        });

        return projectItem;
    }

    // 프로젝트 리스트 업데이트 함수
    function updateProjectList() {
        var projectContainer = document.getElementById('project-container');
        projectContainer.innerHTML = '';
        projects.forEach(function (project) {
            var projectItem = projectItems[project.name];
            projectContainer.appendChild(projectItem);
        });
    }

    // 프로젝트 필터링 함수
    function filterProjects(query) {
        var projectContainer = document.getElementById('project-container');
        projectContainer.innerHTML = '';
        projects.forEach(function (project) {
            if (project.name.toLowerCase().includes(query)) {
                var projectItem = projectItems[project.name];
                projectContainer.appendChild(projectItem);
            }
        });
    }

    // HTML 태그 제거 함수
    function stripHtml(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

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

    // 확인 팝업 열기 함수
    function showConfirmationPopup(name, description) {
        var confirmationPopup = document.createElement('div');
        confirmationPopup.classList.add('confirmation-popup');

        var confirmationMessage = document.createElement('p');
        confirmationMessage.innerText = '프로젝트를 만들겠습니까?';

        var yesButton = document.createElement('button');
        yesButton.innerText = '예';
        yesButton.addEventListener('click', function () {
            addProjectToList(name, description, []);
            document.body.removeChild(confirmationPopup);
            // 폼 초기화
            document.getElementById('project-name').value = '';
            quill.root.innerHTML = '';
            // Home 페이지로 이동
            showSection('home');
        });

        var noButton = document.createElement('button');
        noButton.innerText = '아니오';
        noButton.addEventListener('click', function () {
            document.body.removeChild(confirmationPopup);
        });

        confirmationPopup.appendChild(confirmationMessage);
        confirmationPopup.appendChild(yesButton);
        confirmationPopup.appendChild(noButton);

        document.body.appendChild(confirmationPopup);
    }

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
});
