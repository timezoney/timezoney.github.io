var loadingMessage = document.getElementById('loadingMessage');
var errorMessage = document.getElementById('errorMessage');
var postContainer = document.getElementById('postContainer');
var postTitle = document.getElementById('postTitle');
var postAuthor = document.getElementById('postAuthor');
var postField = document.getElementById('postField');
var postShortDesc = document.getElementById('postShortDesc');
var postFullDesc = document.getElementById('postFullDesc');
var postImage = document.getElementById('postImage');
var contactBtn = document.getElementById('contactBtn');
var backToCatalog = document.getElementById('backToCatalog');
var backBtn = document.getElementById('backBtn');

// Check if user is logged in
var loggedInUser = sessionStorage.getItem('logged_in_user');
if (!loggedInUser || loggedInUser == '') {
    // Redirect to login page if not logged in
    alert('Please log in first');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    loadPost();
});

function loadPost() {
    var postId = sessionStorage.getItem('post_id');
    
    if (!postId) {
        showError();
        return;
    }

    fetch('/post-data')
        .then(function(response) {
            return response.json();
        })
        .then(function(posts) {
            var post = null;
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id == postId) {
                    post = posts[i];
                    break;
                }
            }

            if (!post) {
                showError();
                return;
            }

            fetch('/user-data')
                .then(function(response) {
                    return response.json();
                })
                .then(function(users) {
                    displayPost(post, users);
                })
                .catch(function(error) {
                    console.error('Error loading users:', error);
                    displayPost(post, []);
                });
        })
        .catch(function(error) {
            console.error('Error loading post:', error);
            showError();
        });
}

function displayPost(post, users) {
    var authorName = post.author;
    var authorEmail = '';

    for (var i = 0; i < users.length; i++) {
        if (users[i].name === post.author) {
            authorName = users[i].fName + ' ' + users[i].lName;
            authorEmail = users[i].email;
            break;
        }
    }

    postTitle.textContent = post.title;
    postAuthor.textContent = 'Posted by: ' + authorName;
    postField.textContent = post.field_of_service || 'General';
    postShortDesc.textContent = post.short_description;
    postFullDesc.textContent = post.full_description;
    postImage.src = post.image;

    if (post.type == 'job') {
        contactBtn.textContent = 'Contact Employer';
    } else {
        contactBtn.textContent = 'Contact Employee';
    }
    // contactBtn.onclick = function() {
    //     if (authorEmail) {
    //         window.location.href = 'mailto:' + authorEmail;
    //     } else {
    //         alert('Contact information not available');
    //     }
    // };

    backToCatalog.onclick = function() {
        var lastPage = sessionStorage.getItem('last_page');
        if (lastPage) {
            window.location.href = lastPage;
        } else {
            window.location.href = 'catalog_jobs.html';
        }
    };

    loadingMessage.style.display = 'none';
    postContainer.style.display = 'block';
}

function showError() {
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'block';
    
    backBtn.onclick = function() {
        var lastPage = sessionStorage.getItem('last_page');
        if (lastPage) {
            window.location.href = lastPage;
        } else {
            window.location.href = 'catalog_jobs.html';
        }
    };
}