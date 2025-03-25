const dropDowns = (function() {
    // Function to initialize all dropdowns on the page
    function initDropdowns() {
        // Get all dropdown elements
        const dropdowns = document.querySelectorAll('.dropdown');
        
        // Set up each dropdown with appropriate event listeners
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');
            const triggerType = dropdown.getAttribute('data-trigger') || 'click';
            
            // Set up event listeners based on trigger type
            if (triggerType === 'click') {
                trigger.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleMenu(menu);
                });
            } else if (triggerType === 'hover') {
                dropdown.addEventListener('mouseenter', function() {
                    showMenu(menu);
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    hideMenu(menu);
                });
            }
        });
        
        // Close click-triggered dropdowns when clicking outside
        document.addEventListener('click', closeAllClickDropdowns);
    }
    
    // Toggle a menu's visibility
    function toggleMenu(menu) {
        if (menu.classList.contains('visible')) {
            hideMenu(menu);
        } else {
            // Close all other click dropdowns first
            closeAllClickDropdowns();
            showMenu(menu);
        }
    }
    
    // Show a dropdown menu
    function showMenu(menu) {
        menu.classList.add('visible');
    }
    
    // Hide a dropdown menu
    function hideMenu(menu) {
        menu.classList.remove('visible');
    }
    
    // Close all click-triggered dropdown menus
    function closeAllClickDropdowns() {
        const clickDropdowns = document.querySelectorAll('.dropdown[data-trigger="click"] .dropdown-menu');
        clickDropdowns.forEach(menu => {
            hideMenu(menu);
        });
    }
    
    // Initialize when the DOM is ready
    document.addEventListener('DOMContentLoaded', initDropdowns);
})();

export {dropDowns}