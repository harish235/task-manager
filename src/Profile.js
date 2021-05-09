import React, { useState, useEffect } from 'react'
import fbase from './firebase';

export default function Profile() {
    const [imgUrl, setImageUrl] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();

    const user = fbase.auth().currentUser;


    useEffect(() => {
        fbase.storage().ref().child('/unknown_user.jpg').getDownloadURL().then((url) => {
            setImageUrl(url);
        });
        const docRef = fbase.firestore().collection('users').doc(user.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                console.log(doc.data());
                console.log(data.age);
                setName(data.name);
                setEmail(data.email);
                setAge(data.age);
            }
        });

    }, [user.uid]);





    return (
        <div className='profile'>
            <h1>Profile Page</h1>
            <img src={imgUrl} alt="couldn't load" height='300px' width='300px' />
            {name ? <h2>Name: {name}</h2> : <h3>Name wasn't provided</h3>}
            {email ? <h2>Email: {email}</h2> : <h3>Email wasn't provided</h3>}
            {age ? <h2>Age: {age}</h2> : <h3>Age wasn't provided</h3>}
        </div>
    )
}



//const [image, setImage] = useState();
// const handleChange = (img) => {
//     setImage(img);
// }

// const handleSave = () => {
//     var metadata = {
//         contentType: 'image/jpeg'
//     };
//     var uploadTask = fbase.storage().ref().child('/' + user.uid).put(image, metadata);

//     uploadTask.on('state_changed',
//         (snapshot) => {
//             // Observe state change events such as progress, pause, and resume
//             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//                 case fbase.storage.TaskState.PAUSED: // or 'paused'
//                     console.log('Upload is paused');
//                     break;
//                 case fbase.storage.TaskState.RUNNING: // or 'running'
//                     console.log('Upload is running');
//                     break;
//             }
//         },
//         (error) => {
//             // Handle unsuccessful uploads
//         },
//         () => {
//             // Handle successful uploads on complete
//             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                 console.log('File available at', downloadURL);
//             });
//         }
//     );
// }