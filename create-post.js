// Array to store selected image files
var selectedFiles = [];

// Check if user is logged in before allowing post creation
var loggedInUser = sessionStorage.getItem('logged_in_user');
if (!loggedInUser || loggedInUser == '') {
    // Redirect to login page if not authenticated
    alert('Please log in to create a post');
    window.location.href = 'login.html';
}

// Get references to all form elements
var postTypeSelect = document.getElementById('postType');
var titleInput = document.getElementById('title');
var briefInput = document.getElementById('briefDescription');
var fullInput = document.getElementById('fullDescription');
var imageInput = document.getElementById('images');
var filePreview = document.getElementById('filePreview');
var submitBtn = document.getElementById('submitBtn');
var cancelBtn = document.getElementById('cancelBtn');
var successMsg = document.getElementById('successMessage');
var titleCount = document.getElementById('titleCount');
var briefCount = document.getElementById('briefCount');
var fieldOfServiceInput = document.getElementById('fieldOfService');

// Update character count for title field as user types
titleInput.addEventListener('input', function() {
    titleCount.textContent = titleInput.value.length;
});

// Update character count for brief description as user types
briefInput.addEventListener('input', function() {
    briefCount.textContent = briefInput.value.length;
});

// Handle image file selection
imageInput.addEventListener('change', function() {
    // Convert FileList to array and add to selectedFiles
    var files = Array.from(imageInput.files);
    selectedFiles = selectedFiles.concat(files);
    displayFilePreview();
});

// Display preview thumbnails of selected images
function displayFilePreview() {
    // Clear existing previews
    filePreview.innerHTML = '';

    // Loop through each selected file
    for (var i = 0; i < selectedFiles.length; i++) {
        var file = selectedFiles[i];
        var reader = new FileReader();
        
        // Use closure to preserve the index for each file
        (function(index) {
            reader.onload = function(e) {
                // Create preview container
                var div = document.createElement('div');
                div.className = 'file-preview-item';
                
                // Create image element with preview
                var img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Preview';
                
                // Create remove button for each image
                var btn = document.createElement('button');
                btn.className = 'remove-file';
                btn.textContent = '×';
                btn.onclick = function() {
                    removeFile(index);
                };
                
                // Add elements to preview container
                div.appendChild(img);
                div.appendChild(btn);
                filePreview.appendChild(div);
            };
        })(i);
        
        // Read file as data URL for preview
        reader.readAsDataURL(file);
    }
}

// Remove a file from the selected files array
function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFilePreview();
}

// Handle form submission when user clicks submit
submitBtn.addEventListener('click', function() {
    // Get all form values
    var postType = postTypeSelect.value;
    var title = titleInput.value;
    var briefDescription = briefInput.value;
    var fullDescription = fullInput.value;
    var fieldOfService = fieldOfServiceInput.value

    // Validate that required fields are filled
    if (!title || !briefDescription || !fullDescription) {
        alert('Please fill in all required fields');
        return;
    }

    // Generate unique post ID using current timestamp
    var postId = String(Date.now());

    // Get current user from session storage
    var currentUser = sessionStorage.getItem('logged_in_user');

    // Set image path (use default if no image uploaded)
    let image = "./images/default.png"
    // if (imageInput.files.length) {
    //     image = `./images/${imageInput.files[0].name}`
    // }
    
    // Create post data object with all form information
    var postData = {
        id: postId,
        author: currentUser,
        title: title,
        short_description: briefDescription,
        full_description: fullDescription,
        field_of_service: fieldOfService,
        type: postType,
        image: image
    };

    // Send post data to server
    fetch('/add-post-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(function(response) {
        // Check if request was successful
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Error creating post');
        }
    })
    .then(function(message) {
        // Show success message
        successMsg.style.display = 'block';
        // After 2 seconds, reset form and redirect to appropriate catalog
        setTimeout(function() {
            resetForm();
            successMsg.style.display = 'none';
            // Redirect based on post type
            if (postType === 'employee') {
                window.location.href = 'catalog_employees.html';
            } else {
                window.location.href = 'catalog_jobs.html';
            }
        }, 2000);
    })
    .catch(function(error) {
        // Handle any errors during submission
        console.error('Error:', error);
        alert('An error occurred while submitting the form');
    });
});

// Handle cancel button - confirm before discarding changes
cancelBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to cancel? All data will be lost.')) {
        resetForm();
        window.location.href = 'index.html';
    }
});

// Clear all form fields and reset to initial state
function resetForm() {
    titleInput.value = '';
    briefInput.value = '';
    fullInput.value = '';
    imageInput.value = '';
    selectedFiles = [];
    filePreview.innerHTML = '';
    titleCount.textContent = '0';
    briefCount.textContent = '0';
}