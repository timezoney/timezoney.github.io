// user data

export async function load_user_data() {
    const response = await fetch('/user-data');
    const data = await response.json();
    
    return data   // returns all users
}
 
export async function add_user_data(new_name, new_password, new_email, new_phone, new_description, new_fName, new_lName, new_DoB) {
    const name = new_name
    const password = new_password
    const email = new_email
    const phone = new_phone
    const description = new_description
    const fName = new_fName
    const lName = new_lName
    const DoB = new_DoB
    let posts_id = []
    const newData = { name, password, email, phone, description, fName, lName, DoB, posts_id };
 
    const response = await fetch('/add-user-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });
 
    if (response.ok) {
        
    } else {
        console.error('Error updating data');
    }
}

// have to pass the full user object (with changes)
export async function update_user_data(name, updated_user) {;

    const response = await fetch(`/update-user-data/${name}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated_user),
    });
 
    if (!response.ok) {
        console.error('Error updating data');
    }
}


// post data

export async function load_post_data() {
    const response = await fetch('/post-data');
    const data = await response.json();
    
    return data   // returns all posts
}

export async function add_post_data(new_id, new_author, new_title, new_short_descr, new_full_descr, new_field_of_service) {
    const id = new_id
    const author = new_author
    const title = new_title
    const short_descr = new_short_descr
    const full_descr = new_full_descr
    const field_of_service = new_field_of_service
    const newData = { id, author, title, short_descr, full_descr, field_of_service };
 
    const response = await fetch('/add-post-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });
 
    if (response.ok) {
        
    } else {
        console.error('Error updating data');
    }
}

// have to pass the full post object (with changes) (not sure if we'll need to use it)
export async function update_post_data(id, updated_post) {;

    const response = await fetch(`/update-post-data/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated_post),
    });
 
    if (!response.ok) {
        console.error('Error updating data');
    }
}