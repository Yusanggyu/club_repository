document.addEventListener('DOMContentLoaded', function () {
    // Quill editor 설정
    var quill = new Quill('#editor-container', {
        theme: 'snow'
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
        var projectContainer = document.getElementById('project-container');
        var projectItem = document.createElement('li');
        projectItem.classList.add('project-item');
        projectItem.innerText = name;
        projectItem.addEventListener('click', function () {
            openModal(name, description);
        });
        projectContainer.appendChild(projectItem);
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
});
