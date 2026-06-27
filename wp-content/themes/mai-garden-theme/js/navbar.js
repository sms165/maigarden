/**
 * ==========================================================================
 * DYNAMIC SCROLL-ACTIVATED HEADER NAVIGATION ENGINE (WITH SCROLL-SPY)
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", function () {
    const scrollHeader = document.getElementById("mainScrollNav");
    const navItems = document.querySelectorAll(".nav-links-anchors .nav-item");
    
    if (!scrollHeader) return;

    // 1. Navbar Visibility Toggle on Scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 150) {
            scrollHeader.classList.add("is-visible");
        } else {
            scrollHeader.classList.remove("is-visible");
        }
    });

    // 2. Manual Click Transition Controller
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            navItems.forEach(el => el.classList.remove("is-active-tab"));
            this.classList.add("is-active-tab");
        });
    });

    // 3. Dynamic Scroll-Spy Logic (Intersection Observer)
    // Grabs target sections based on your navigation links href values
    const sections = [];
    navItems.forEach(item => {
        const hash = item.getAttribute("href");
        if (hash && hash.startsWith("#")) {
            const section = document.querySelector(hash);
            if (section) sections.push(section);
        }
    });

    // Configuration for when a section is considered "active" on screen
    const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -60% 0px", // Trigger when section occupies the upper-middle section of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                // Clear and update the active menu item matching the current visible section ID
                navItems.forEach(item => {
                    if (item.getAttribute("href") === `#${id}`) {
                        item.classList.add("is-active-tab");
                    } else {
                        item.classList.remove("is-active-tab");
                    }
                });
            }
        });
    }, observerOptions);

    // Attach observer to tracked section nodes
    sections.forEach(section => observer.observe(section));
});