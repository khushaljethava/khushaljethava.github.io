        // Pagination state
        let blogPosts = [];
        let currentPage = 1;
        const postsPerPage = 6;
        let currentCategory = 'all';
    
        // Function to create blog card
        function createBlogCard(post) {
            return `
                <a href="${post.url}" class="blog-card">
                    <img src="${post.image}" alt="${post.title}" class="card-image">
                    <div class="card-content">
                        <div class="card-category">
                            <i class="fas fa-tag"></i> ${post.category.toUpperCase()}
                        </div>
                        <h2 class="card-title">${post.title}</h2>
                        <p class="card-excerpt">${post.excerpt}</p>
                        <div class="card-meta">
                            <span><i class="far fa-calendar"></i> ${post.date}</span>
                        </div>
                    </div>
                </a>
            `;
        }
    
        // Function to filter and paginate blog posts
        function filterAndPaginatePosts() {
            const filteredPosts = currentCategory === 'all' 
                ? blogPosts 
                : blogPosts.filter(post => post.category === currentCategory);
            
            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
            
            // Update pagination UI
            document.getElementById('currentPage').textContent = currentPage;
            document.getElementById('totalPages').textContent = totalPages;
            document.getElementById('prevPage').disabled = currentPage === 1;
            document.getElementById('nextPage').disabled = currentPage === totalPages;
    
            // Update blog grid
            const blogGrid = document.querySelector('.blog-grid');
            blogGrid.innerHTML = paginatedPosts.map(createBlogCard).join('');
        }
    
        // Fetch blog posts data
        async function fetchBlogPosts() {
            try {
                const response = await fetch('blogPosts.json');
                blogPosts = await response.json();
                filterAndPaginatePosts();
            } catch (error) {
                console.error('Error loading blog posts:', error);
            }
        }
    
        // Initialize page by fetching blog posts
        fetchBlogPosts();
    
        // Add event listeners
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Update category and reset page
                currentCategory = button.dataset.category;
                currentPage = 1;
                filterAndPaginatePosts();
            });
        });
    
        // Pagination event listeners
        document.getElementById('prevPage').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                filterAndPaginatePosts();
            }
        });
    
        document.getElementById('nextPage').addEventListener('click', () => {
            const filteredPosts = currentCategory === 'all' 
                ? blogPosts 
                : blogPosts.filter(post => post.category === currentCategory);
            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                filterAndPaginatePosts();
            }
        });