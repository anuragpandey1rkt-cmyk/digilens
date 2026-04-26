document.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
    fetchUsers_Tests();

    // Home button logic
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            gsap.from("main", { opacity: 0.8, y: 10, duration: 0.5 });
        };
    }
});
