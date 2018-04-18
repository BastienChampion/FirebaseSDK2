// Initialize Firebase
var config = {
    apiKey: "AIzaSyD6m5m7OygVVfE5hsmXzZOF5IzXKkn13k0",
    authDomain: "walking-dead-8b192.firebaseapp.com",
    databaseURL: "https://walking-dead-8b192.firebaseio.com",
    projectId: "walking-dead-8b192",
    storageBucket: "walking-dead-8b192.appspot.com",
    messagingSenderId: "960435348122"
};

firebase.initializeApp(config);

// Initialize Database
let db = firebase.database();
let personnages = db.ref('perso');

let myId;

console.log(personnages);

personnages.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        if (myId == childData.uid || childData.uid == null) {
        document.getElementById('listPerso').innerHTML += '<li>' + childData.name +'</li>';
    } 
    });
});

function writeUserData(Name) {
    db.ref('perso/' + name).push({
        name: Name,
        uid: myId,
    });
}

function addOnFirebase() {
    let name = document.getElementById("namePerso").value;
    writeUserData(name);
    window.location.reload();
}



//Initiation de Firebase Authentification
const uiConfig = {
    signInSuccessUrl: 'page1.html',
    signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8080/cgu' // conditions générales d'utilisation
  };

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);


  function initApp() {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // All datas

        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const uid = user.uid;
        myId = user.uid;
        const phoneNumber = user.phoneNumber;
        const providerData = user.providerData;

        // retour de l'utilisateur après authentification
        user.getIdToken().then((accessToken) => {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('sign-in').textContent = 'Sign out';
          document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          }, null, '  ');
        });

      } else {

        // Gestion de la deconnexion
        document.getElementById('sign-in-status').textContent = 'Signed out';
        document.getElementById('sign-in').textContent = 'Sign in';
        document.getElementById('account-details').textContent = 'null';
      }
    }, (error) => { // gestion de erreur de connexion
      console.error(error);
    });
}
initApp();


function log_Out(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}