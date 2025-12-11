var selectedFiles = [];

// Check if user is logged in
var loggedInUser = sessionStorage.getItem('logged_in_user');
if (!loggedInUser || loggedInUser == '') {
    // Redirect to login page if not logged in
    alert('Please log in to create a post');
    window.location.href = 'login.html';
}

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

titleInput.addEventListener('input', function() {
    titleCount.textContent = titleInput.value.length;
});

briefInput.addEventListener('input', function() {
    briefCount.textContent = briefInput.value.length;
});

imageInput.addEventListener('change', function() {
    var files = Array.from(imageInput.files);
    selectedFiles = selectedFiles.concat(files);
    displayFilePreview();
});

function displayFilePreview() {
    filePreview.innerHTML = '';

    for (var i = 0; i < selectedFiles.length; i++) {
        var file = selectedFiles[i];
        var reader = new FileReader();
        
        (function(index) {
            reader.onload = function(e) {
                var div = document.createElement('div');
                div.className = 'file-preview-item';
                
                var img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Preview';
                
                var btn = document.createElement('button');
                btn.className = 'remove-file';
                btn.textContent = '×';
                btn.onclick = function() {
                    removeFile(index);
                };
                
                div.appendChild(img);
                div.appendChild(btn);
                filePreview.appendChild(div);
            };
        })(i);
        
        reader.readAsDataURL(file);
    }
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFilePreview();
}

submitBtn.addEventListener('click', function() {
    var postType = postTypeSelect.value;
    var title = titleInput.value;
    var briefDescription = briefInput.value;
    var fullDescription = fullInput.value;
    var fieldOfService = fieldOfServiceInput.value

    if (!title || !briefDescription || !fullDescription) {
        alert('Please fill in all required fields');
        return;
    }

    var postId = String(Date.now());

    var currentUser = sessionStorage.getItem('logged_in_user');

    let image = "./images/default.png"
    if (imageInput.files.length) {
        image = `./images/${imageInput.files[0].name}`
    }
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

    fetch('/add-post-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(function(response) {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Error creating post');
        }
    })
    .then(function(message) {
        successMsg.style.display = 'block';
        setTimeout(function() {
            resetForm();
            successMsg.style.display = 'none';
            if (postType === 'employee') {
                window.location.href = 'catalog_employees.html';
            } else {
                window.location.href = 'catalog_jobs.html';
            }
        }, 2000);
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form');
    });
});

cancelBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to cancel? All data will be lost.')) {
        resetForm();
        window.location.href = 'index.html';
    }
});

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