document.addEventListener('DOMContentLoaded', () => {
    // عناصر القائمة الجانبية
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeMenu = document.getElementById('close-menu');

    // فتح وإغلاق القائمة
    menuToggle.addEventListener('click', () => sidebar.classList.add('active'));
    closeMenu.addEventListener('click', () => sidebar.classList.remove('active'));

    // عناصر نافذة المسارات
    const pathwayBtn = document.getElementById('pathway-btn');
    const pathwayModal = document.getElementById('pathway-modal');
    const closeModal = document.getElementById('close-modal');
    const subjectsSection = document.getElementById('subjects-selection');

    // فتح نافذة المسارات
    pathwayBtn.addEventListener('click', () => {
        pathwayModal.classList.remove('hidden');
    });

    // إغلاق النافذة
    closeModal.addEventListener('click', () => {
        pathwayModal.classList.add('hidden');
        subjectsSection.classList.add('hidden'); // إعادة إخفاء قسم المواد عند الإغلاق
    });

    // إغلاق النافذة عند الضغط خارجها
    window.addEventListener('click', (e) => {
        if (e.target === pathwayModal) {
            pathwayModal.classList.add('hidden');
            subjectsSection.classList.add('hidden');
        }
    });

    // تفاعل أزرار اختيار الجنس
    const genderBtns = document.querySelectorAll('.gender-btn');
    genderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // إضافة تأثير بصري عند الاختيار وإظهار الخطوة التالية
            subjectsSection.classList.remove('hidden');
            subjectsSection.innerHTML = `<p style="margin-top:20px; font-weight:bold; color:#114a31;">
                تم اختيار مسار ${e.target.innerText} بنجاح!<br> سيتم عرض أداة فرز المواد قريباً...
            </p>`;
        });
    });
});