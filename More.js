// More.js

document.addEventListener("DOMContentLoaded", () => {
  const moreBtn = document.getElementById("moreBtn");
  const moreMenu = document.getElementById("moreMenu");
  const updateBtn = document.getElementById("updateBtn");
  const managerBtn = document.getElementById("managerBtn");

  const archiveList = document.getElementById("archiveList");

  const updatePage = document.getElementById("updatePage");
  const closeUpdateBtn = document.getElementById("closeUpdateBtn");

  const managerLoginModal = document.getElementById("managerLoginModal");
  const managerPassword = document.getElementById("managerPassword");
  const managerLoginBtn = document.getElementById("managerLoginBtn");
  const closeManagerLoginBtn = document.getElementById("closeManagerLoginBtn");
  const managerLoginMsg = document.getElementById("managerLoginMsg");

  const managerPage = document.getElementById("managerPage");
  const closeManagerPageBtn = document.getElementById("closeManagerPageBtn");
  const inquiryList = document.getElementById("inquiryList");

  // 초기 화면 상태
  let showingMoreMenu = false;

  // More 버튼 클릭 토글
  moreBtn.addEventListener("click", () => {
    if (showingMoreMenu) {
      hideMoreMenuAndShowMembers();
    } else {
      showMoreMenuAndHideMembers();
    }
  });

  function showMoreMenuAndHideMembers() {
    moreMenu.classList.remove("hidden");
    archiveList.classList.add("hidden");
    showingMoreMenu = true;
  }
  function hideMoreMenuAndShowMembers() {
    moreMenu.classList.add("hidden");
    archiveList.classList.remove("hidden");
    showingMoreMenu = false;
  }

  // Update 버튼 클릭 → Update 화면 표시
  updateBtn.addEventListener("click", () => {
    moreMenu.classList.add("hidden");
    archiveList.classList.add("hidden");
    updatePage.classList.remove("hidden");
    showingMoreMenu = false;
  });

  // Update 화면 닫기 버튼
  closeUpdateBtn.addEventListener("click", () => {
    updatePage.classList.add("hidden");
    archiveList.classList.remove("hidden");
  });

  // 문의 전송 (로컬 저장)
  const inquiryMember = document.getElementById("inquiryMember");
  const inquiryDate = document.getElementById("inquiryDate");
  const inquiryText = document.getElementById("inquiryText");
  const sendInquiryBtn = document.getElementById("sendInquiryBtn");

  sendInquiryBtn.addEventListener("click", () => {
    const member = inquiryMember.value;
    const date = inquiryDate.value;
    const text = inquiryText.value.trim();

    if (!date || !text) {
      alert("날짜와 문의 내용을 입력해주세요.");
      return;
    }

    const inquiries = JSON.parse(localStorage.getItem("inquiries") || "[]");
    inquiries.push({ member, date, text, id: Date.now() });
    localStorage.setItem("inquiries", JSON.stringify(inquiries));

    alert("문의가 전송되었습니다.");
    inquiryDate.value = "";
    inquiryText.value = "";
  });

  // Manager 버튼 클릭 → 로그인 모달 표시
  managerBtn.addEventListener("click", () => {
    moreMenu.classList.add("hidden");
    managerLoginModal.classList.remove("hidden");
    managerPassword.value = "";
    managerLoginMsg.style.display = "none";
  });

  // 관리자 로그인 처리
  managerLoginBtn.addEventListener("click", () => {
    const pw = managerPassword.value;
    if (pw === "0912") {
      managerLoginModal.classList.add("hidden");
      openManagerPage();
    } else {
      managerLoginMsg.style.display = "block";
    }
  });

  // 관리자 로그인 모달 닫기
  closeManagerLoginBtn.addEventListener("click", () => {
    managerLoginModal.classList.add("hidden");
  });

  // 관리자 페이지 닫기 버튼
  closeManagerPageBtn.addEventListener("click", () => {
    managerPage.classList.add("hidden");
    archiveList.classList.remove("hidden");
  });

  // 관리자 페이지 열기 및 문의사항 출력
  function openManagerPage() {
    archiveList.classList.add("hidden");
    managerPage.classList.remove("hidden");
    loadInquiries();
  }

  // 문의사항 불러와서 리스트 출력
  function loadInquiries() {
    const inquiries = JSON.parse(localStorage.getItem("inquiries") || "[]");
    inquiryList.innerHTML = "";

    if (inquiries.length === 0) {
      inquiryList.innerHTML = "<li>문의사항이 없습니다.</li>";
      return;
    }

    inquiries.forEach(({ member, date, text, id }) => {
      const li = document.createElement("li");
      li.textContent = `[${date}] ${member}: ${text}`;
      inquiryList.appendChild(li);
    });
  }

  // 채팅 업로드 버튼 이벤트 (관리자 페이지 내부)
  const uploadBtn = document.getElementById("uploadBtn");
  const uploadMember = document.getElementById("uploadMember");
  const uploadDate = document.getElementById("uploadDate");
  const uploadText = document.getElementById("uploadText");
  const uploadImage = document.getElementById("uploadImage");

  uploadBtn.addEventListener("click", () => {
    const member = uploadMember.value;
    const dateTime = uploadDate.value;
    const text = uploadText.value.trim();
   
