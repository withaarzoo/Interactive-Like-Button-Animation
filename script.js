console.clear();

// Like Button + increasing count
const likeButtons = document.querySelectorAll('.action--like');

likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the counter element associated with the button
        const countNum = button.closest('.card').querySelector('.action__label');
        // Increase the value of the counter
        increaseValue(countNum);
        // Trigger shape animation
        animateItem(button);
        // Apply rotation animation to the card
        applyRotationAnimation(button.closest('.card'));
        // Reset button and card to initial state after animation
        resetButtonAfterAnimation(button);
    });
});

// Function to increase the value of a counter
const increaseValue = target => {
    let value = parseInt(target.innerHTML, 10) || 0;
    value++;
    target.innerHTML = value;
};

// Create Shape Animation
const colorClasses = ['blue', 'purple', 'orange', 'pink', 'green', 'yellow'];

// Function to get a random number within a specified range
const getRandomNumber = x => Math.floor(Math.random() * x);

// Function to trigger the shape animation
const animateItem = trigger => {
    // Create a container for the animation
    const newContainer = createAnimationContainer();
    // Set a random rotation for the container
    const randomRotate = getRandomNumber(360);
    newContainer.style.transform = `translate(-50%, -50%) scale(1.5) rotate(${randomRotate}deg)`;

    // Generate a random number of shapes and append them to the container
    for (let i = 0; i < getRandomNumber(11) + 10; i++) {
        const newItem = createAnimationItem();
        setRandomPosition(newItem);
        setItemSVGContent(newItem);
        newContainer.appendChild(newItem);
    }

    // Append the container to the document body and remove it after a delay
    document.body.appendChild(newContainer);
    setTimeout(() => {
        newContainer.remove();
    }, 1100);
};

// Functions to create animation elements
const createAnimationContainer = () => {
    const newContainer = document.createElement('div');
    newContainer.classList.add('animation');
    return newContainer;
};

const createAnimationItem = () => {
    const newItem = document.createElement('div');
    newItem.classList.add('animation__item');
    return newItem;
};

// Function to set a random position for an element
const setRandomPosition = element => {
    element.style.top = `${getRandomNumber(100)}%`;
    element.style.right = `${getRandomNumber(100)}%`;
    element.style.left = `${getRandomNumber(100)}%`;
    element.style.bottom = `${getRandomNumber(100)}%`;
};

// Function to set the content of a shape item
const setItemSVGContent = item => {
    const randomShapeNumber = getRandomNumber(5);
    const randomClassNumber = getRandomNumber(6);
    item.innerHTML = getShapeSVG(randomShapeNumber, randomClassNumber);
};

// Function to generate SVG content for a shape
const getShapeSVG = (shapeNumber, classNumber) => {
    const shapes = [
        `<circle cx="12" cy="12" r="10"></circle>`,
        `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>`,
        `<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>`,
        `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>`,
        `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>`
    ];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--${colorClasses[classNumber]})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[shapeNumber]}</svg>`;
};

// Function to apply rotation animation to an element
const applyRotationAnimation = element => {
    const rotateDeg = getRandomNumber(10);
    element.style.transform = `rotate(${rotateDeg}deg)`;
};

// Function to reset button and card to initial state after animation
const resetButtonAfterAnimation = button => {
    setTimeout(() => {
        button.style.transform = '';
        button.closest('.card').style.transform = '';
        button.blur();
    }, 300);
};

// Toggle theme
const themeToggle = document.querySelector('.toggle');
const themeToggleContainer = document.querySelector('.toggle__container');
const root = document.documentElement;

themeToggle.addEventListener('click', function () {
    // Toggle the 'active' class for theme switching
    themeToggleContainer.classList.toggle('active');
    // Update theme-related CSS properties
    updateThemeProperties();
});

// Function to update theme-related CSS properties
const updateThemeProperties = () => {
    const isThemeActive = themeToggleContainer.classList.contains('active');
    // Set CSS variables based on the theme state
    root.style.setProperty('--bg', isThemeActive ? 'var(--gray-darker)' : 'var(--gray-lighter)');
    root.style.setProperty('--text-color', isThemeActive ? 'var(--gray-lightest)' : 'var(--gray-darkest)');
    root.style.setProperty('--component-bg', isThemeActive ? 'var(--gray-darkest)' : 'var(--white)');
    root.style.setProperty('--component-border', isThemeActive ? 'var(--gray-darkest)' : 'var(--gray-lighter)');
};
