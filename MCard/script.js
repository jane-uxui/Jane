  const firebaseConfig = {
  apiKey: "AIzaSyAS8ehPOt7nrVgTPZmPp0tlZqirXnhmwOk",
  authDomain: "m-card-2f3d7.firebaseapp.com",
  projectId: "m-card-2f3d7",
  storageBucket: "m-card-2f3d7.firebasestorage.app",
  messagingSenderId: "291865229583",
  appId: "1:291865229583:web:0a326b61e95b113321667a",
  measurementId: "G-Q79S6QB4KY"
  };
  
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();


  // 익명 로그인 처리
  firebase.auth().signInAnonymously().catch(console.error);

  // 댓글 남기기
  function saveMsg() {
  const name = document.getElementById('name').value.trim();
  const pw = document.getElementById('pw').value;
  const msg = document.getElementById('msg').value.trim();
  if (!name || !pw || !msg) { 
    alert("모두 입력!"); 
    return; 
  }

  const today = new Date();
  const dateStr = today.getFullYear() + '.' + 
                  String(today.getMonth() + 1).padStart(2, '0') + '.' + 
                  String(today.getDate()).padStart(2, '0');

  db.collection('messages').add({
    name, 
    pw, 
    msg, 
    time: Date.now(), 
    date: dateStr   // ← 저장할 때 같이 넣음
  }).then(loadMsg);

  document.getElementById('msg').value = '';
}



  // 댓글 목록 불러오기
  function loadMsg() {
  db.collection('messages').orderBy('time', 'desc').get()
    .then(snapshot => {
      const list = document.getElementById('list');
      list.innerHTML = ''; // 기존 내용 초기화
      snapshot.forEach(doc => {
        const data = doc.data();
        list.innerHTML += `
          <div class="card">
            <div class="title_wrap">
              <div class="name">${data.name}</div>
              <div class="right_wrap">
                <div class="date">${data.date || 'YYYY.MM.DD'}</div>
                <button class="del" onclick="delMsg('${doc.id}')">&times;</button>
              </div>
            </div>
            <div class="msg">${data.msg}</div>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error('메시지 로드 중 에러:', error);
    });
}


  // 삭제 시 비밀번호 검사
  function delMsg(id) {
    const inputPw = prompt('비밀번호 입력:');
    db.collection('messages').doc(id).get().then(doc => {
      if (doc.exists && doc.data().pw === inputPw) {
        db.collection('messages').doc(id).delete().then(loadMsg);
      } else { alert('비밀번호 불일치!'); }
    });
  }
  
  db.collection('messages')
  .orderBy('time', 'desc')
  .onSnapshot(snapshot => {
    const list = document.getElementById('list');
    list.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      list.innerHTML += `
        <div class="card">
            <div class="title_wrap">
              <div class="name">${data.name}</div>
              <div class="right_wrap">
                <div class="date">${data.date || 'yyyy.mm.dd'}</div>
                <button class="del" onclick="delMsg('${doc.id}')">&times;</button>
              </div>
            </div>
            <div class="msg">${data.msg}</div>
          </div>
      `;
    });

  });


//   window.onload = function() {
//   var container = document.getElementById('map');
//   var options = {
//     center: new kakao.maps.LatLng(37.3815349667371, 126.6597361315122),
//     level: 2
//   };
//   var map = new kakao.maps.Map(container, options);

//   var marker = new kakao.maps.Marker({
//     position: new kakao.maps.LatLng(37.3815349667371, 126.6597361315122)
//   });
//   marker.setMap(map);
// };

function updateCountdown() {
  const targetDate = new Date("2026-01-17T00:00:00"); 
  const now = new Date();

  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("ddayText").innerHTML = "오늘은 결혼식 날입니다 💍";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

  document.getElementById("ddayText").innerHTML =
    `하람 ❤️ 주의 결혼식이 <span>${days + 1}</span>일 남았습니다.`;
}

// 1초마다 실행
setInterval(updateCountdown, 1000);

// 처음 로딩 시 한 번 실행
updateCountdown();


document.addEventListener("DOMContentLoaded", () => {
 const bgm = document.getElementById("bgm");
  const toggleBtn = document.getElementById("soundToggle");

  // 자동재생 시도 (모바일: muted로만 됨)
  bgm.play().catch(() => {});

  toggleBtn.addEventListener("click", () => {
    if (bgm.muted) {
      bgm.muted = false;
      toggleBtn.textContent = "🔈"; // 소리 켜짐
    } else {
      bgm.muted = true;
      toggleBtn.textContent = "🔇"; // 소리 꺼짐
    }
  });
  
  const openGallery = document.getElementById("more");
  const openCall = document.getElementById("call")
  const popup = document.getElementById("gallery_popup");
  const telpopup = document.getElementById("tel_popup")
  const dimmed = document.getElementById("dimmed");
  const closeBtn = popup.querySelector(".close");
  const telCloseBtn = telpopup.querySelector(".close");
  const thumbs = document.querySelectorAll(".gal_img_wrap");

  // 팝업 열기
  openGallery.addEventListener("click", () => {
    popup.style.display = "grid";
    dimmed.style.display = "block";
    goToSlide(0);
  });
  // 썸네일 클릭 → 해당 슬라이드로 팝업 열기
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      popup.style.display = "grid";
      dimmed.style.display = "block";
      swiper.slideTo(index, 0);
    });
  });
  openCall.addEventListener("click",() => {
    telpopup.style.display = "block"
    dimmed.style.display = "block";
  })


  // 팝업 닫기
  function closePopup() {
    popup.style.display = "none";
    dimmed.style.display = "none";
    telpopup.style.display = "none";
  }

  closeBtn.addEventListener("click", closePopup);
  dimmed.addEventListener("click", closePopup);
  telCloseBtn.addEventListener("click", closePopup);
  
  // 키보드 네비게이션 지원 (← →, ESC)
  document.addEventListener("keydown", (e) => {
    if (popup.style.display === "grid") {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") closePopup();
    }
  });
  

  // 카카오페이 폰에서만 되게
  const mobileLinks = document.querySelectorAll(".mobile-link");

  mobileLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        userAgent.includes("iphone") ||
        userAgent.includes("ipod") ||
        userAgent.includes("ipad") ||
        userAgent.includes("android") ||
        userAgent.includes("windows phone");

      if (!isMobile) {
        e.preventDefault(); // 링크 열림 방지
        alert("PC에서는 실행할 수 없습니다.\n모바일 기기에서 다시 시도해주세요.");
      }
      // 모바일이면 그대로 이동됨 (링크 정상 작동)
    });
  });
});
