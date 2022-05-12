import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "src/firebase/firebaseConfig";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const Header: FC<Props> = ({ children, title }) => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <h1>
            <Link href="/">
              <a>home</a>
            </Link>
          </h1>

          <Link href="/login">
            <a>Login/Signup</a>
          </Link>
          {user ? (
            <p className="text-black">ログイン中</p>
          ) : (
            <p className="text-black">未ログイン</p>
          )}
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
};
