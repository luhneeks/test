document.addEventListener('DOMContentLoaded', function() {
    const moon = document.querySelector('.moon');
    const earth = document.querySelector('.earth');
    
    // Constants
    const STAR_COUNT = 200;
    const STAR_SIZE = 1;

    // Speed multipliers
    const EARTH_ROTATION_MULTIPLIER = 10;
    const MOON_ORBIT_MULTIPLIER = 10;

    // Calculate the rotation and orbit speeds
    let earthRotationSpeed = (360 / (24 * 60 * 60)) * EARTH_ROTATION_MULTIPLIER;
    let moonOrbitSpeed = (360 / (27.3 * 24 * 60 * 60)) * MOON_ORBIT_MULTIPLIER;

    let moonDegree = 0;
    let earthRotation = 0;

    function createRandomStars() {
        const earthRect = earth.getBoundingClientRect();
        const fragment = document.createDocumentFragment();
        let createdStars = 0;

        while (createdStars < STAR_COUNT) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            if (x >= earthRect.left && x <= earthRect.right && y >= earthRect.top && y <= earthRect.bottom) continue;
            if (y <= 100 || (window.innerHeight - y) <= 100) continue;

            const starElement = document.createElement("div");
            starElement.className = "star";
            starElement.style.position = "absolute";
            starElement.style.top = y + "px";
            starElement.style.left = x + "px";
            starElement.style.width = STAR_SIZE + "px";
            starElement.style.height = STAR_SIZE + "px";
            starElement.style.backgroundColor = "white";
            starElement.style.borderRadius = "50%";
            fragment.appendChild(starElement);
            
            createdStars++;
        }

        document.body.appendChild(fragment);
    }

    function createShootingStar() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        const shootingStar = document.createElement("div");
        shootingStar.style.left = x + "px";
        shootingStar.style.top = y + "px";
        shootingStar.classList.add("shooting-star");

        document.body.appendChild(shootingStar);

        setTimeout(() => {
            document.body.removeChild(shootingStar);
        }, 1500);

        // Schedule next shooting star
        setTimeout(createShootingStar, Math.random() * 10000 + 5000);
    }

    function updateTime(timeZone, elementId) {
        const options = { timeZone: timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        let currentTime = new Date().toLocaleTimeString('en-US', options);
    
        // Additional logic can be added here to adjust for daylight saving if necessary
        // This might involve checking the current date and manually adjusting the time

        document.getElementById(elementId).textContent = currentTime;
    }

    function updateBothTimes() {
        updateTime('America/Los_Angeles', 'nicko-time');
        updateTime('Asia/Seoul', 'sunyoung-time');
    }

    function colorNames() {
        const names = document.querySelectorAll('.initial-name');
        names.forEach(el => {
            if (el.textContent.includes('Nicko')) {
                el.style.color = 'blue';
            } else if (el.textContent.includes('Sunyoung')) {
                el.style.color = 'pink';
            }
        });
    }

    function animateCelestialBodies() {
        moonDegree += moonOrbitSpeed;
        earthRotation += earthRotationSpeed;

        earth.style.transform = `translateY(-50%) rotate(${earthRotation}deg) translateX(250px) rotate(-${earthRotation}deg)`;
        moon.style.transform = `translateY(-50%) rotate(${moonDegree}deg) translateX(70px) rotate(-${moonDegree}deg)`;

        requestAnimationFrame(animateCelestialBodies);
    }

    // Initial and periodic updates
    updateBothTimes();
    setInterval(updateBothTimes, 1000);

    createRandomStars();
    createShootingStar();
    colorNames();
    requestAnimationFrame(animateCelestialBodies);

    // Recreate stars on window resize
    window.addEventListener('resize', function() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.remove());
        createRandomStars();
    });
});
