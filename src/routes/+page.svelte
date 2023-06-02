<script>
	// @ts-nocheck

	// import { FirebaseApp, User, Doc, Collection } from 'sveltefire';

	// // import firebase from 'firebase/app';
	// // import 'firebase/firestore';
	// // import 'firebase/auth';
	// // import 'firebase/performance';
	// // import 'firebase/analytics';

	// import { initializeApp } from 'firebase/app';
	// import { getFirestore } from 'firebase/firestore';
	// import { getAuth } from 'firebase/auth';

	// let firebaseConfig = {
	// 	// Insert Firebase Credentials here
	// 	apiKey: 'AIzaSyBKhsmYSTVL64oXto5Q8PLLO8KDvKMPg7Y',
	// 	authDomain: 'ruumii.firebaseapp.com',
	// 	projectId: 'ruumii',
	// 	storageBucket: 'ruumii.appspot.com',
	// 	messagingSenderId: '961633016174',
	// 	appId: '1:961633016174:web:efa6dc89aca35a1674897f',
	// 	measurementId: 'G-559GB9CGNV'
	// };

	// // Initialize Firebase
	// const app = initializeApp(firebaseConfig);
	// export const db = getFirestore(app);
	// export const auth = getAuth(app);

	// // firebase.initializeApp(firebaseConfig);

	// import { auth, db } from './firebase.js';

	import { FirebaseApp, User, Doc, Collection } from 'sveltefire';
	import { auth, firestore } from '$lib/firebase.js';

	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

	const provider = new GoogleAuthProvider();

	const s = () =>
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
</script>

<main>
	<!-- {#if !firebaseConfig.projectId}
		<strong>Step 0</strong>
		Create a
		<a href="https://firebase.google.com/">Firebase Project</a>
		and paste your web config into
		<code>App.svelte</code>
		.
	{/if} -->

	<!-- 1. 🔥 Firebase App -->
	<FirebaseApp {auth} {firestore}>
		<h1>💪🔥 Mode Activated</h1>

		<p>
			<strong>Tip:</strong>
			Open the browser console for development logging.
		</p>

		<button
			onclick={() =>
				signInWithPopup(auth, provider)
					.then((result) => {
						// This gives you a Google Access Token. You can use it to access the Google API.
						const credential = GoogleAuthProvider.credentialFromResult(result);
						const token = credential.accessToken;
						// The signed-in user info.
						const user = result.user;
						// IdP data available using getAdditionalUserInfo(result)
						// ...
					})
					.catch((error) => {
						// Handle Errors here.
						const errorCode = error.code;
						const errorMessage = error.message;
						// The email of the user's account used.
						const email = error.customData.email;
						// The AuthCredential type that was used.
						const credential = GoogleAuthProvider.credentialFromError(error);
						// ...
					})}>Sign in with Google</button
		>

		<!-- 2. 😀 Get the current user -->
		<User let:user>
			Howdy 😀! User
			<em>{user.uid}</em>

			<button on:click={() => auth.signOut()}>Sign Out</button>

			<div slot="signed-out">
				<button on:click={() => auth.signInAnonymously()}> Sign In Anonymously </button>
			</div>

			<hr />

			<!-- 3. 📜 Get a Firestore document owned by a user -->
			<Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>
				<h2>{post.title}</h2>

				<p>
					Document created at <em>{new Date(post.createdAt).toLocaleString()}</em>
				</p>

				<span slot="loading">Loading post...</span>
				<span slot="fallback">
					<button
						on:click={() =>
							postRef.set({
								title: '📜 I like Svelte',
								createdAt: Date.now()
							})}
					>
						Create Document
					</button>
				</span>

				<!-- 4. 💬 Get all the comments in its subcollection -->

				<h3>Comments</h3>
				<Collection
					path={postRef.collection('comments')}
					query={(ref) => ref.orderBy('createdAt')}
					let:data={comments}
					let:ref={commentsRef}
					log
				>
					{#if !comments.length}
						No comments yet...
					{/if}

					{#each comments as comment}
						<p>
							<!-- ID: <em>{comment.ref.id}</em> -->
						</p>
						<p>
							{comment.text}
							<button on:click={() => comment.ref.delete()}>Delete</button>
						</p>
					{/each}

					<button
						on:click={() =>
							commentsRef.add({
								text: '💬 Me too!',
								createdAt: Date.now()
							})}
					>
						Add Comment
					</button>

					<span slot="loading">Loading comments...</span>
				</Collection>
			</Doc>
		</User>
	</FirebaseApp>
</main>
