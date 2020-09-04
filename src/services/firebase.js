const firebase = window.firebase;
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

// Use emulator when in localhost
if (window.location.hostname === 'localhost') {
  console.log('localhost detected!');
  db.settings({
    host: 'localhost:8080',
    ssl: false
  });
}

export default firebase;
export { db, provider };
