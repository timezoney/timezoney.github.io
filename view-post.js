// Get references to all DOM elements needed for the page
var loadingMessage = document.getElementById('loadingMessage');
var errorMessage = document.getElementById('errorMessage');
var postContainer = document.getElementById('postContainer');
var postTitle = document.getElementById('postTitle');
var postAuthor = document.getElementById('postAuthor');
var postField = document.getElementById('postField');
var postType = document.getElementById('postType');
var postShortDesc = document.getElementById('postShortDesc');
var postFullDesc = document.getElementById('postFullDesc');
var postImage = document.getElementById('postImage');
var contactBtn = document.getElementById('contactBtn');
var backToCatalog = document.getElementById('backToCatalog');
var backBtn = document.getElementById('backBtn');

// Check if user is logged in by looking in session storage
var loggedInUser = sessionStorage.getItem('logged_in_user');
if (!loggedInUser || loggedInUser == '') {
    // If not logged in, alert the user and redirect to login page
    alert('Please log in first');
    window.location.href = 'login.html';
}

// Wait for the page to fully load before running the loadPost function
document.addEventListener('DOMContentLoaded', function() {
    loadPost();
});

// Main function to load and display the post
function loadPost() {
    // Get the post ID from session storage
    var postId = sessionStorage.getItem('post_id');
    
    // If no post ID is found, show error
    if (!postId) {
        showError();
        return;
    }

    // Fetch all posts from the server
    fetch('/post-data')
        .then(function(response) {
            return response.json();
        })
        .then(function(posts) {
            // Search through all posts to find the one matching the ID
            var post = null;
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id == postId) {
                    post = posts[i];
                    break;
                }
            }

            // If post not found, show error
            if (!post) {
                showError();
                return;
            }

            // Fetch user data to get author information
            fetch('/user-data')
                .then(function(response) {
                    return response.json();
                })
                .then(function(users) {
                    // Display the post with user information
                    displayPost(post, users);
                })
                .catch(function(error) {
                    // If users can't be loaded, display post without user info
                    console.error('Error loading users:', error);
                    displayPost(post, []);
                });
        })
        .catch(function(error) {
            // If posts can't be loaded, show error
            console.error('Error loading post:', error);
            showError();
        });
}

// Function to populate the page with post data
function displayPost(post, users) {
    // Initialize author information
    var authorName = post.author;
    var authorEmail = '';

    // Search for the author in the users list to get full name and email
    for (var i = 0; i < users.length; i++) {
        if (users[i].name === post.author) {
            authorName = users[i].fName + ' ' + users[i].lName;
            authorEmail = users[i].email;
            break;
        }
    }

    // Fill in all the post information on the page
    postTitle.textContent = post.title;
    postAuthor.textContent = 'Posted by: ' + authorName;
    postField.textContent = post.field_of_service || 'General';
    postType.textContent = post.type;
    postShortDesc.textContent = post.short_description;
    postFullDesc.textContent = post.full_description;
    postImage.src = post.image;

    // Change button text based on post type (job or employee)
    if (post.type == 'job') {
        contactBtn.textContent = 'Contact Employer';
    } else {
        contactBtn.textContent = 'Contact Employee';
    }
    
    // Note: Email contact functionality is commented out
    // contactBtn.onclick = function() {
    //     if (authorEmail) {
    //         window.location.href = 'mailto:' + authorEmail;
    //     } else {
    //         alert('Contact information not available');
    //     }
    // };

    // Set up "Back to Catalog" button to return to previous page
    backToCatalog.onclick = function() {
        var lastPage = sessionStorage.getItem('last_page');
        if (lastPage) {
            window.location.href = lastPage;
        } else {
            // Default to jobs catalog if no previous page
            window.location.href = 'catalog_jobs.html';
        }
    };

    // Hide loading message and show the post content
    loadingMessage.style.display = 'none';
    postContainer.style.display = 'block';
}

// Function to display error message when post is not found
function showError() {
    // Hide loading message and show error message
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'block';
    
    // Set up "Back" button to return to previous page
    backBtn.onclick = function() {
        var lastPage = sessionStorage.getItem('last_page');
        if (lastPage) {
            window.location.href = lastPage;
        } else {
            // Default to jobs catalog if no previous page
            window.location.href = 'catalog_jobs.html';
        }
    };
}