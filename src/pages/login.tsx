import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { NextPage } from "next";
import { ComponentProps, useState } from "react";
import { Header } from "src/component/Layout/Header";
import { auth, db, storage } from "src/firebase/firebaseConfig";

const Home = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setphotoURL] = useState<File | null>(null);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setphotoURL(e.target.files![0]);
      e.target.value = "";
    }
  };

  const SignupEmail = async (event: any) => {
    event.preventDefault();
    const authUser = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    let url = "";

    if (photoURL) {
      await uploadBytes(ref(storage, `avatars/${photoURL.name}`), photoURL);
      url = await getDownloadURL(ref(storage, `avatars/${photoURL.name}`));
    } else {
      console.log("no photo");
    }

    await updateProfile(auth.currentUser!, {
      displayName: username,
      photoURL: url,
    });

    const docData = {
      displayName: username,
      photoURL: url,
      uid: auth.currentUser!.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await setDoc(doc(db, `users/${auth.currentUser!.uid}`), docData);

    setUsername("");
    setEmail("");
    setPassword("");
    setphotoURL(null);
  };

  const getUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("no user");
      }
    });
  };

  const LoginEmail = async (event: any) => {
    event.preventDefault();
  };

  return (
    <Header title="Login/Signup">
      <header>新規登録</header>
      <main>
        <form className="flex flex-col" onSubmit={SignupEmail}>
          <label>
            <span>名前</span>
            <input
              className="text-black"
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </label>
          <label>
            <span>メールアドレス</span>
            <input
              className="text-black"
              type="text"
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </label>
          <label>
            <span>パスワード</span>
            <input
              className="text-black"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </label>
          <label>
            <span>アイコン</span>
            <input type="file" onChange={onChangeImageHandler} />
          </label>
          <button type="submit">登録</button>
        </form>

        <button onClick={getUser}>getUser</button>

        <form action="" onSubmit={LoginEmail}></form>
      </main>
    </Header>
  );
};

export default Home;
